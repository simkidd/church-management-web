"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  Send,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  IQuiz,
  IQuizQuestion,
  SubmitAnswersResponse,
} from "@/interfaces/quiz.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";
import { quizApi } from "@/lib/api/quiz.api";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog"; 
import { cn } from "@/lib/utils";
import QuizHeader from "./QuizHeader";
import QuizLeaveDialog from "./QuizLeaveDialog";
import QuizQuestionCard from "./QuizQuestionCard";
import QuizQuestionNavigator from "./QuizQuestionNavigator";
import QuizSubmitDialog from "./QuizSubmitDialog";

type QuizPageContentProps = {
  courseId: string;
  quizId: string;
};

type AnswersState = Record<string, string[]>;

const QuizPageContent = ({ courseId, quizId }: QuizPageContentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [answers, setAnswers] = useState<AnswersState>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] = useState(false); // New loading dialog

  const { data, isPending, isError, error } = useQuery<ApiResponse<IQuiz>>({
    queryKey: ["quiz", quizId],
    queryFn: () => quizApi.getQuizById(quizId),
    enabled: !!quizId,
    staleTime: 30_000,
  });

  const quiz = data?.data;

  const totalQuestions = quiz?.questions?.length ?? 0;
  const currentQuestion = quiz?.questions?.[currentIndex] as
    | IQuizQuestion
    | undefined;

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(
      (selectedOptions) =>
        Array.isArray(selectedOptions) && selectedOptions.length > 0,
    ).length;
  }, [answers]);

  const progressValue =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const remainingQuestions = totalQuestions - answeredCount;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  const submitMutation = useMutation<
    ApiResponse<SubmitAnswersResponse>,
    AxiosError<ApiErrorResponse>
  >({
    mutationFn: () =>
      quizApi.attemptQuiz({
        quizId,
        answers: Object.entries(answers).map(
          ([questionId, selectedOptions]) => ({
            questionId,
            selectedOptions,
          }),
        ),
      }),
    onMutate: () => {
      // Show loading dialog immediately when submission starts
      setIsSubmittingDialogOpen(true);
    },
    onSuccess: async (response) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["quiz", quizId] }),
        queryClient.invalidateQueries({
          queryKey: ["course-learning", courseId],
        }),
      ]);

      const attemptId = response.data.attemptId;

      // Small delay to ensure dialog is seen before navigation
      setTimeout(() => {
        if (attemptId) {
          router.replace(
            `/courses/${courseId}/quiz/${quizId}/attempt/${attemptId}`,
          );
          return;
        }
        router.replace(`/courses/${courseId}/learn`);
      }, 500);
    },
    onError: (err) => {
      // Close loading dialog on error so user can retry
      setIsSubmittingDialogOpen(false);
      toast.error(err.response?.data?.message ?? "Failed to submit quiz");
    },
  });

  const handleSingleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [optionId],
    }));
  };

  const handleMultipleToggle = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      const exists = current.includes(optionId);

      return {
        ...prev,
        [questionId]: exists
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const handleOptionSelect = (question: IQuizQuestion, optionId: string) => {
    const isSingleType =
      question.type === "single-choice" || question.type === "true-false";

    if (isSingleType) {
      handleSingleSelect(question._id, optionId);
      return;
    }

    handleMultipleToggle(question._id, optionId);
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNextQuestion = () => {
    if (!quiz) return;
    setCurrentIndex((prev) => Math.min(prev + 1, quiz.questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleManualSubmit = () => {
    if (!quiz) return;

    submitMutation.mutate();
  };

  const handleConfirmLeave = () => {
    setLeaveDialogOpen(false);
    router.back();
  };

  if (isPending) {
    return <QuizPageSkeleton />;
  }

  if (isError || !quiz) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center text-center">
          <ShieldAlert className="h-10 w-10 text-amber-500" />
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Unable to load quiz
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            {(error as AxiosError<ApiErrorResponse>)?.response?.data?.message ??
              "This quiz could not be loaded right now."}
          </p>

          <div className="mt-6">
            <Button asChild variant="outline">
              <Link href={`/courses/${courseId}/learn`}>Back to learning</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main quiz content - blurred when submitting */}
      <div
        className={cn(
          "transition-all duration-300",
          isSubmittingDialogOpen && "blur-sm pointer-events-none",
        )}
      >
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Left Sidebar - Unchanged */}
          <aside className="order-2 lg:order-1">
            <div className="sticky top-20 space-y-4">
              <QuizHeader
                title={quiz.title}
                currentQuestion={currentIndex + 1}
                totalQuestions={totalQuestions}
                answeredCount={answeredCount}
                progressValue={progressValue}
              />

              <QuizQuestionNavigator
                totalQuestions={totalQuestions}
                currentIndex={currentIndex}
                answers={answers}
                questions={quiz.questions}
                onGoToQuestion={handleGoToQuestion}
              />
            </div>
          </aside>

          {/* Right Content - Actions moved to top */}
          <section className="order-1 lg:order-2 min-w-0 space-y-4">
            {/* Top Action Bar */}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Exit */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setLeaveDialogOpen(true)}
                  className="cursor-pointer rounded-xl"
                >
                  <LogOut className="h-4 w-4 " />
                  Quit
                </Button>

                {/* Center: Progress Info */}
                <div className="hidden sm:flex items-center gap-4 text-sm">
                  <span className="text-slate-500">
                    Question{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currentIndex + 1}
                    </span>{" "}
                    of {totalQuestions}
                  </span>
                </div>

                {/* Right: Navigation */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousQuestion}
                    disabled={isFirst}
                    className="h-9 w-9 p-0 rounded-xl cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {isLast ? (
                    <Button
                      onClick={() => setSubmitDialogOpen(true)}
                      disabled={submitMutation.isPending}
                      size="sm"
                      className={cn(
                        "rounded-xl px-4 text-white cursor-pointer bg-green-600 hover:bg-green-700",
                      )}
                    >
                      {submitMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4 " />
                          Submit
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      size="sm"
                      className="rounded-xl px-4 text-white cursor-pointer"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Mobile-only progress info */}
              <div className="mt-3 flex sm:hidden items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
                <span>
                  {currentIndex + 1} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Question Card */}
            {currentQuestion ? (
              <QuizQuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                selectedOptions={answers[currentQuestion._id] ?? []}
                onSelectOption={(optionId) =>
                  handleOptionSelect(currentQuestion, optionId)
                }
              />
            ) : null}
          </section>
        </div>
      </div>

      {/* Loading Dialog - Shows during submission */}
      <Dialog open={isSubmittingDialogOpen} modal>
        <DialogContent
          className="sm:max-w-md "
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing with ESC
          showCloseButton={false} // Hide close button
        >
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Submitting Quiz...
              </h3>
              <p className="text-sm text-slate-500">
                Please wait while we grade your answers
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Dialogs */}
      <QuizSubmitDialog
        open={submitDialogOpen}
        onOpenChange={setSubmitDialogOpen}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        isSubmitting={submitMutation.isPending}
        onConfirm={handleManualSubmit}
      />

      <QuizLeaveDialog
        open={leaveDialogOpen}
        onOpenChange={setLeaveDialogOpen}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
};

const QuizPageSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-5 h-8 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPageContent;
