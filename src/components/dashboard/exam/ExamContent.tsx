"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/interfaces/course.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";
import courseApi from "@/lib/api/course.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  Home,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/EmptyState";
import { Progress } from "@/components/ui/progress";
import {
  IExamByCourseResponse,
  IExamResult,
} from "@/interfaces/exam.interface";
import examsApi from "@/lib/api/exam.api";
import { AxiosError } from "axios";
import ExamInstructions from "./ExamInstructions";
import ExamResults from "./ExamResults";
import ExamSkeleton from "./ExamSkeleton";
import ExamTimer from "./ExamTimer";
import QuestionCard from "./QuestionCard";
import QuestionOverview from "./QuestionOverview";

interface ExamState {
  currentQuestion: number;
  answers: { [key: string]: string };
  timeRemaining: number;
  isSubmitted: boolean;
  score?: number;
  percentage?: number;
  passed?: boolean;
  isRetaking?: boolean; // Add this flag to track retake state
}

const ExamContent = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["exam-eligibility", courseId] });
    queryClient.invalidateQueries({ queryKey: ["exam", courseId] });
    queryClient.invalidateQueries({ queryKey: ["exam-results", courseId] });
  }, [courseId, queryClient]);

  const {
    data: courseData,
    isPending: courseLoading,
    error: courseError,
  } = useQuery<ApiResponse<ICourse>>({
    queryKey: ["course", courseId],
    queryFn: () => courseApi.getCourseById(courseId),
  });

  const {
    data: eligibilityData,
    isPending: eligibilityLoading,
    error: eligibilityError,
  } = useQuery({
    queryKey: ["exam-eligibility", courseId],
    queryFn: () => courseApi.checkExamEligibility(courseId),
    enabled: !!courseId,
  });

  const {
    data: examData,
    isPending: examLoading,
    error: examError,
    refetch: refetchExam,
  } = useQuery<ApiResponse<IExamByCourseResponse>>({
    queryKey: ["exam", courseId],
    queryFn: () => courseApi.getExamByCourseId(courseId),
    enabled: !!eligibilityData?.data?.canTakeExam,
  });

  const {
    data: resultsData,
    refetch: refetchResults,
    isFetching: resultsFetching,
  } = useQuery<ApiResponse<IExamResult>>({
    queryKey: ["exam-results", courseId],
    queryFn: () => examsApi.getExamResults(examData?.data?.exam?._id || ""),
    enabled:
      !!eligibilityData?.data?.hasExistingSubmission &&
      !!examData?.data?.exam?._id,
  });

  const course = courseData?.data;
  const exam = examData?.data?.exam;
  const eligibility = eligibilityData?.data;
  const results = resultsData?.data;
  const questions = exam?.questions || [];
  const userStatus = examData?.data?.userStatus;

  const [examState, setExamState] = useState<ExamState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: 0, // Start with 0
    isSubmitted: userStatus?.hasSubmitted || false,
    isRetaking: false,
  });

  const hasInitializedTimer = useRef(false);

  // Submit exam mutation
  const submitExamMutation = useMutation({
    mutationFn: (answers: { [key: string]: string }) => {
      if (!examData?.data?.exam?._id) {
        throw new Error("Exam not loaded");
      }

      const submissionData = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      return examsApi.submitExam(examData.data.exam._id, submissionData);
    },
    onSuccess: (response) => {
      const submission = response.data.submission;

      setExamState((prev) => ({
        ...prev,
        isSubmitted: true,
        score: submission.score,
        percentage: submission.percentage,
        passed: submission.isPassed,
        isRetaking: false, // Reset retake flag
      }));

      // Invalidate and refetch relevant queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["exam", courseId] });
      queryClient.invalidateQueries({
        queryKey: ["exam-eligibility", courseId],
      });
      queryClient.invalidateQueries({ queryKey: ["exam-results", courseId] });

      if (submission.isPassed) {
        toast.success("🎉 Congratulations! You passed the exam!", {
          description: `You scored ${submission.percentage}% and completed the course!`,
          duration: 5000,
        });
      } else {
        toast.error("Exam not passed", {
          description: `You scored ${submission.percentage}%. Please review the course and try again.`,
          duration: 5000,
        });
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error("Failed to submit exam", {
        description: error.response?.data?.message || "Please try again later.",
      });
    },
  });

  const handleAutoSubmit = () => {
    if (!exam?._id) {
      toast.error("Cannot submit: Exam not loaded");
      return;
    }
    toast.info("Time's up! Submitting your exam...");
    submitExamMutation.mutate(examState.answers);
  };

  useEffect(() => {
    if (
      exam?.duration &&
      !userStatus?.hasSubmitted &&
      !examState.isSubmitted &&
      examState.timeRemaining === 0 &&
      !hasInitializedTimer.current
    ) {
      hasInitializedTimer.current = true;
      const initialTime = exam.duration * 60;

      setTimeout(() => {
        setExamState((prev) => ({
          ...prev,
          timeRemaining: initialTime,
        }));
      }, 0);
    }
  }, [
    exam?.duration,
    userStatus?.hasSubmitted,
    examState.isSubmitted,
    examState.timeRemaining,
  ]);

  // Handle timer countdown
  useEffect(() => {
    // Don't start timer if conditions aren't met
    if (
      examState.timeRemaining <= 0 ||
      examState.isSubmitted ||
      userStatus?.hasSubmitted
    ) {
      return;
    }

    const timer = setInterval(() => {
      setExamState((prev) => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          setTimeout(handleAutoSubmit, 0);
          return { ...prev, timeRemaining: 0 };
        }
        const newTime = prev.timeRemaining - 1;

        return { ...prev, timeRemaining: newTime };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    examState.timeRemaining,
    examState.isSubmitted,
    userStatus?.hasSubmitted,
  ]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setExamState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const handleQuestionNavigate = (index: number) => {
    setExamState((prev) => ({
      ...prev,
      currentQuestion: index,
    }));
  };

  const handleSubmitExam = () => {
    if (!exam?._id) {
      toast.error("Cannot submit: Exam not loaded");
      return;
    }

    const unanswered = questions.length - Object.keys(examState.answers).length;
    if (unanswered > 0) {
      if (
        !confirm(
          `You have ${unanswered} unanswered question${
            unanswered > 1 ? "s" : ""
          }. Are you sure you want to submit?`
        )
      ) {
        return;
      }
    }

    submitExamMutation.mutate(examState.answers);
  };

  const handleRetakeExam = async () => {
    try {
      // Set retaking flag to true
      setExamState((prev) => ({
        ...prev,
        isRetaking: true,
      }));

      // Reset local state for new attempt
      setExamState({
        currentQuestion: 0,
        answers: {},
        timeRemaining: exam?.duration ? exam.duration * 60 : 0,
        isSubmitted: false,
        score: undefined,
        percentage: undefined,
        passed: undefined,
        isRetaking: true,
      });

      // Invalidate and refetch all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["exam", courseId] }),
        queryClient.invalidateQueries({
          queryKey: ["exam-eligibility", courseId],
        }),
        queryClient.invalidateQueries({ queryKey: ["exam-results", courseId] }),
      ]);

      // Force refetch the exam data to get updated userStatus
      await refetchExam();

      toast.success("Starting new exam attempt...");
    } catch (error) {
      toast.error("Failed to start retake", {
        description: "Please try again later.",
      });
      // Reset retaking flag on error
      setExamState((prev) => ({
        ...prev,
        isRetaking: false,
      }));
    }
  };

  // Check if user can retake based on backend data
  const canRetake =
    results?.attemptInfo?.canRetake ??
    (userStatus?.canRetake && !examState.isSubmitted);

  // Don't show results if we're in the middle of retaking
  const shouldShowResults =
    userStatus?.hasSubmitted &&
    resultsData &&
    !examState.isSubmitted &&
    !examState.isRetaking;

  // Loading state
  if (courseLoading || examLoading || eligibilityLoading || resultsFetching) {
    return <ExamSkeleton />;
  }

  // Course not found
  if (courseError || !course) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Course Not Found"
        description="The course you're looking for doesn't exist or you don't have access to it."
        action={
          <Button asChild>
            <Link href="/dashboard/courses">
              <Home className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        }
      />
    );
  }

  // Eligibility check failed
  if (eligibilityError || !eligibility?.canTakeExam) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Complete Lessons First</h2>
              <p className="text-muted-foreground mb-4">
                {eligibilityError
                  ? "Unable to check exam eligibility. Please try again."
                  : "You need to complete all lessons before taking the exam."}
              </p>
              {!eligibilityError && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span>
                      {eligibility?.completedLessons} /{" "}
                      {eligibility?.totalLessons} lessons
                    </span>
                  </div>
                  <Progress value={eligibility?.progress} className="h-2" />
                </div>
              )}
              <div className="flex gap-2 flex-col sm:flex-row">
                <Button asChild variant="outline">
                  <Link href="/dashboard/courses">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Courses
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/dashboard/courses/${courseId}/lessons`}>
                    Continue Learning
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Exam not found or no exam ID
  if (examError || !exam || !exam._id) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Exam Not Available</h2>
              <p className="text-muted-foreground mb-4">
                {examError
                  ? "Failed to load exam. Please try again."
                  : "The exam for this course is not available at the moment."}
              </p>
              <Button asChild>
                <Link href={`/dashboard/courses/${courseId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show results if already submitted AND we're not retaking
  if (shouldShowResults) {
    return (
      <ExamResults
        course={course}
        results={resultsData.data}
        userStatus={{
          ...userStatus,
          canRetake: canRetake,
        }}
        onRetakeExam={handleRetakeExam}
        courseId={courseId}
      />
    );
  }

  // Show exam results after submission (for current session)
  if (
    examState.isSubmitted &&
    examState.score !== undefined &&
    examState.passed !== undefined
  ) {
    return (
      <ExamResults
        course={course}
        results={{
          score: examState.score,
          percentage: examState.percentage || 0,
          isPassed: examState.passed,
          isGraded: true,
          answers: [],
          submittedAt: new Date().toISOString(),
          attemptInfo: {
            attemptNumber: (results?.attemptInfo?.totalAttempts || 0) + 1,
            totalAttempts: (results?.attemptInfo?.totalAttempts || 0) + 1,
            maxAttempts: exam.maxAttempts || 1,
            canRetake: canRetake,
            nextRetakeAvailable: null,
          },
        }}
        userStatus={{
          ...userStatus,
          canRetake: canRetake,
        }}
        onRetakeExam={handleRetakeExam}
        courseId={courseId}
      />
    );
  }

  const currentQuestion = questions[examState.currentQuestion];

  return (
    <div className="min-h-screen relative">
      {/* Exam Header */}
      <div className="bg-muted/50 border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section - Course Info and Back Button */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="shrink-0 hover:bg-slate-100"
              >
                <Link href={`/dashboard/courses/${courseId}`}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:ml-2">
                    Back to Course
                  </span>
                </Link>
              </Button>

              <Separator
                orientation="vertical"
                className="h-6 hidden sm:block"
              />

              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg font-semibold truncate">
                  {course?.title}
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Final Exam - {exam.title}
                  </p>
                  {results?.attemptInfo && (
                    <span className="hidden xs:inline-flex text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded shrink-0">
                      Attempt {results.attemptInfo.attemptNumber} of{" "}
                      {results.attemptInfo.maxAttempts || "∞"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Timer */}
            <div className="shrink-0">
              <ExamTimer
                timeRemaining={examState.timeRemaining}
                totalTime={exam.duration * 60}
                compact={false}
              />
            </div>
          </div>

          {/* Mobile-only attempt info */}
          {results?.attemptInfo && (
            <div className="mt-2 sm:hidden">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Attempt {results.attemptInfo.attemptNumber} of{" "}
                {results.attemptInfo.maxAttempts || "∞"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Main Exam Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            {currentQuestion && (
              <QuestionCard
                currentQuestion={currentQuestion}
                currentQuestionIndex={examState.currentQuestion}
                answers={examState.answers}
                questions={questions}
                onAnswerSelect={handleAnswerSelect}
                onQuestionNavigate={handleQuestionNavigate}
              />
            )}

            {/* Submit Section */}
            <Card className="">
              <CardContent className="">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>
                        {Object.keys(examState.answers).length} Answered
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      <span>
                        {questions.length -
                          Object.keys(examState.answers).length}{" "}
                        Remaining
                      </span>
                    </div>
                    {results?.attemptInfo && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>
                          Attempt {results.attemptInfo.attemptNumber} of{" "}
                          {results.attemptInfo.maxAttempts || "∞"}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmitExam}
                    disabled={submitExamMutation.isPending}
                    size="lg"
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {submitExamMutation.isPending ? (
                      <>
                        <RotateCcw className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4" />
                        Submit Exam
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuestionOverview
              answers={examState.answers}
              questions={questions}
            />
            <ExamInstructions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamContent;
