"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { quizApi } from "@/lib/api/quiz.api";
import {
  IQuiz,
  IQuizQuestion,
  SubmitAnswersResponse,
} from "@/interfaces/quiz.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";

import { Button } from "@/components/ui/button";
import QuizIntroCard from "./QuizIntroCard";
import QuizHeader from "./QuizHeader";
import QuizQuestionNavigator from "./QuizQuestionNavigator";
import QuizQuestionCard from "./QuizQuestionCard";
import QuizFooterActions from "./QuizFooterActions";
import QuizSubmitDialog from "./QuizSubmitDialog";
import QuizLeaveDialog from "./QuizLeaveDialog";
import QuizTimeUpDialog from "./QuizTimeUpDialog";

type QuizPageContentProps = {
  courseId: string;
  quizId: string;
};

type AnswersState = Record<string, string[]>;

const QuizPageContent = ({ courseId, quizId }: QuizPageContentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [answers, setAnswers] = useState<AnswersState>({});
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [timeUpDialogOpen, setTimeUpDialogOpen] = useState(false);

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

  const submitMutation = useMutation<
    ApiResponse<SubmitAnswersResponse>,
    AxiosError<ApiErrorResponse>
  >({
    mutationFn: () =>
      quizApi.attemptQuiz({
        quizId,
        answers: Object.entries(answers).map(([questionId, selectedOptions]) => ({
          questionId,
          selectedOptions,
        })),
      }),
    onSuccess: async (response) => {
      toast.success("Quiz submitted successfully");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["quiz", quizId] }),
        queryClient.invalidateQueries({
          queryKey: ["course-learning", courseId],
        }),
      ]);

      const attemptId = response.data.attemptId;

      if (attemptId) {
        router.push(`/courses/${courseId}/quiz/${quizId}/attempt/${attemptId}`);
        return;
      }

      router.push(`/courses/${courseId}/learn`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message ?? "Failed to submit quiz");
    },
  });

  useEffect(() => {
    if (!quiz || !hasStarted) return;
    if (!quiz.durationMinutes || quiz.durationMinutes <= 0) return;
  }, [quiz, hasStarted]);

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

  const handleOptionSelect = (
    question: IQuizQuestion,
    optionId: string,
  ) => {
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

    if (answeredCount !== totalQuestions) {
      toast.error("Answer all questions before submitting");
      return;
    }

    submitMutation.mutate();
  };

  const handleTimeUpSubmit = () => {
    setTimeUpDialogOpen(false);
    submitMutation.mutate();
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

  if (!hasStarted) {
    return (
      <QuizIntroCard
        quiz={quiz}
        onStart={() => setHasStarted(true)}
        backHref={`/courses/${courseId}/learn`}
      />
    );
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="order-2 lg:order-1">
          <div className="sticky top-20 space-y-4">
            <QuizHeader
              title={quiz.title}
              currentQuestion={currentIndex + 1}
              totalQuestions={totalQuestions}
              answeredCount={answeredCount}
              progressValue={progressValue}
              durationMinutes={quiz.durationMinutes}
              onTimeUp={() => setTimeUpDialogOpen(true)}
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

        <section className="order-1 lg:order-2 min-w-0 space-y-4">
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

          <QuizFooterActions
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            remainingQuestions={remainingQuestions}
            isSubmitting={submitMutation.isPending}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onOpenSubmitDialog={() => setSubmitDialogOpen(true)}
            onOpenLeaveDialog={() => setLeaveDialogOpen(true)}
          />
        </section>
      </div>

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
        leaveHref={`/courses/${courseId}/learn`}
      />

      <QuizTimeUpDialog
        open={timeUpDialogOpen}
        onOpenChange={setTimeUpDialogOpen}
        isSubmitting={submitMutation.isPending}
        onConfirm={handleTimeUpSubmit}
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