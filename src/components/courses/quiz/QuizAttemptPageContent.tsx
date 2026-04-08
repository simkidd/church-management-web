"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  RotateCcw,
  ShieldAlert,
  Trophy,
  XCircle,
} from "lucide-react";

import { quizApi } from "@/lib/api/quiz.api";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const QuizAttemptPageContent = ({
  courseId,
  quizId,
  attemptId,
}: {
  courseId: string;
  quizId: string;
  attemptId: string;
}) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["quiz-attempt", attemptId],
    queryFn: () => quizApi.getQuizAttemptById(attemptId),
    enabled: !!attemptId,
    staleTime: 30_000,
  });

  if (isPending) {
    return <QuizAttemptSkeleton />;
  }

  if (isError || !data?.data?.attempt) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center text-center">
          <ShieldAlert className="h-10 w-10 text-amber-500" />
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Unable to load result
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            This quiz attempt could not be loaded right now.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={`/courses/${courseId}/learn`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to learning
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { attempt } = data.data;
  const isPassed = attempt.passed;
  const isPendingReview = attempt.status === "pending-review";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div
          className={`border-b px-6 py-10 sm:px-10 ${
            isPendingReview
              ? "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30"
              : isPassed
                ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
          }`}
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Quiz result
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                {isPendingReview
                  ? "Awaiting review"
                  : isPassed
                    ? "You passed"
                    : "You did not pass"}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {isPendingReview
                  ? "Your submission has been received and is awaiting review."
                  : isPassed
                    ? "Great job. Your quiz attempt met the required score."
                    : "You can review your result and try again"}
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                isPendingReview
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  : isPassed
                    ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
              }`}
            >
              {isPendingReview ? (
                <Clock3 className="h-4 w-4" />
              ) : isPassed ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <span className="capitalize">
                {isPendingReview ? "Pending review" : attempt.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-3 sm:px-10">
          <StatCard
            icon={<Trophy className="h-5 w-5" />}
            label="Score"
            value={`${attempt.score}`}
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Percentage"
            value={`${attempt.percentage}%`}
          />
         
          <StatCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Attempt"
            value={`${attempt.attemptNumber}`}
          />
        </div>

        {!isPendingReview && (
          <div className="px-6 pb-6 sm:px-10">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/50">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Performance
                </p>
                <p className="text-sm text-slate-500">
                  {attempt.percentage}%
                </p>
              </div>
              <Progress value={attempt.percentage} className="h-3" />
            </div>
          </div>
        )}

        <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={`/courses/${courseId}/learn`}>
                <ArrowLeft className="h-4 w-4" />
                Back to learning
              </Link>
            </Button>

            {!isPendingReview && !isPassed && (
              <Button asChild className="text-white">
                <Link href={`/courses/${courseId}/quiz/${quizId}`}>
                  <RotateCcw className=" h-4 w-4" />
                  Retake quiz
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

const QuizAttemptSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizAttemptPageContent;