// components/quiz/QuizIntroCard.tsx
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  FileQuestion,
  Trophy,
  Lock,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { IQuiz, IQuizAttempt } from "@/interfaces/quiz.interface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizIntroCardProps {
  quiz: IQuiz;
  attemptsUsed: number;
  lastAttempt?: IQuizAttempt | null;
  backHref: string;
  startHref: string;
  onStart: () => void;
  hasNextLesson?: boolean;
  nextLessonTitle?: string;
  onNextLesson?: () => void;
}

const QuizIntroCard = ({
  quiz,
  attemptsUsed,
  lastAttempt,
  backHref,
  onStart,
  hasNextLesson = false,
  nextLessonTitle,
  onNextLesson,
}: QuizIntroCardProps) => {
  const attemptsLeft = Math.max(quiz.attemptsAllowed - attemptsUsed, 0);
  const isExhausted = attemptsLeft === 0;
  const hasPassed = lastAttempt?.passed ?? false;
  const canRetake = !isExhausted && hasPassed === false && attemptsUsed > 0;

  // DEBUG: Log to see what values we're getting
  console.log("QuizIntroCard render:", {
    hasPassed,
    isExhausted,
    attemptsUsed,
    attemptsLeft,
    hasNextLesson,
    hasOnNextLesson: !!onNextLesson,
    lastAttempt: lastAttempt
      ? {
          passed: lastAttempt.passed,
          percentage: lastAttempt.percentage,
        }
      : null,
  });

  // CASE 1: User has passed the quiz (show success + next lesson button)
  if (hasPassed) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Header - Success State */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-green-50 via-white to-white px-6 py-10 dark:border-slate-800 dark:from-green-950/20 dark:via-slate-900 dark:to-slate-900 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
                  {quiz.scopeType} quiz • Completed
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                  {quiz.title}
                </h1>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              Congratulations! You have successfully passed this quiz.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-10">
            <InfoCard
              icon={<FileQuestion className="h-5 w-5" />}
              label="Questions"
              value={String(quiz.questions.length)}
            />
            <InfoCard
              icon={<Clock3 className="h-5 w-5" />}
              label="Duration"
              value={
                quiz.durationMinutes > 0
                  ? `${quiz.durationMinutes} minutes`
                  : "No timer"
              }
            />
            <InfoCard
              icon={<Trophy className="h-5 w-5" />}
              label="Your Score"
              value={`${lastAttempt?.percentage ?? 0}%`}
              highlight="success"
            />
          </div>

          {/* Results & Actions */}
          <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
            <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-200">
                    Quiz Passed
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    You scored {lastAttempt?.percentage}% (required:{" "}
                    {quiz.passingScore}%)
                  </p>
                  {lastAttempt?.submittedAt && (
                    <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                      Completed on{" "}
                      {new Date(lastAttempt.submittedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS - INCLUDING NEXT LESSON */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href={backHref}>
                  <ArrowLeft className="h-4 w-4 " />
                  Back to lesson
                </Link>
              </Button>

              {/* NEXT LESSON BUTTON - Always show if passed and has next lesson */}
              {hasNextLesson && onNextLesson && (
                <Button
                  onClick={onNextLesson}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <BookOpen className="h-4 w-4 " />
                  Next Lesson
                  <ChevronRight className="h-4 w-4 " />
                </Button>
              )}

              {/* Allow retake if attempts remain (optional) */}
              {!isExhausted && (
                <Button onClick={onStart} variant="outline">
                  <RotateCcw className="h-4 w-4 " />
                  Retake Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASE 2: Attempts exhausted but failed (locked)
  if (isExhausted && !hasPassed) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-gradient-to-r from-red-50 via-white to-white px-6 py-10 dark:border-slate-800 dark:from-red-950/20 dark:via-slate-900 dark:to-slate-900 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  Quiz Locked
                </h1>
                <p className="text-sm text-slate-500">{quiz.scopeType} quiz</p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              You have used all {quiz.attemptsAllowed} attempt
              {quiz.attemptsAllowed !== 1 ? "s" : ""} and did not achieve a
              passing score.
            </p>
          </div>

          <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-10">
            <InfoCard
              icon={<FileQuestion className="h-5 w-5" />}
              label="Questions"
              value={String(quiz.questions.length)}
            />
            <InfoCard
              icon={<Clock3 className="h-5 w-5" />}
              label="Attempts Used"
              value={`${attemptsUsed}/${quiz.attemptsAllowed}`}
            />
            <InfoCard
              icon={<Trophy className="h-5 w-5" />}
              label="Your Score"
              value={`${lastAttempt?.percentage ?? 0}%`}
              highlight="error"
            />
          </div>

          <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
            <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-950/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 dark:text-red-200">
                    Attempts Exhausted
                  </p>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                    Last score: {lastAttempt?.percentage ?? 0}%. Required:{" "}
                    {quiz.passingScore}%
                  </p>
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    Please contact your instructor for assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href={backHref}>
                  <ArrowLeft className="h-4 w-4 " />
                  Back to lesson
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASE 3: Can take quiz (first attempt or retake after failure)
  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-gradient-to-r from-primary/10 via-white to-white px-6 py-10 dark:border-slate-800 dark:from-primary/10 dark:via-slate-900 dark:to-slate-900 sm:px-10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {quiz.scopeType} quiz
            </p>
            {attemptsUsed > 0 && (
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  attemptsLeft === 1
                    ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
                )}
              >
                Attempt {attemptsUsed + 1} of {quiz.attemptsAllowed}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {quiz.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            {quiz.description ||
              "Read the instructions carefully before you begin."}
          </p>
        </div>

        <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-10">
          <InfoCard
            icon={<FileQuestion className="h-5 w-5" />}
            label="Questions"
            value={String(quiz.questions.length)}
          />
          <InfoCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Duration"
            value={
              quiz.durationMinutes > 0
                ? `${quiz.durationMinutes} minutes`
                : "No timer"
            }
          />
          <InfoCard
            icon={<Trophy className="h-5 w-5" />}
            label="Passing Score"
            value={`${quiz.passingScore}%`}
          />
        </div>

        <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
          {/* Show previous failed attempt if exists */}
          {lastAttempt && !lastAttempt.passed && (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                      Previous Attempt
                    </p>
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                      {lastAttempt.percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    You scored {lastAttempt.percentage}%. Required:{" "}
                    {quiz.passingScore}%
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/50">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Before you start
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500 list-none">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Make sure you are ready before starting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Answer every question before submitting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  If a timer is set, the quiz will auto-submit when time runs
                  out.
                </span>
              </li>
              {attemptsLeft === 1 && (
                <li className="flex items-start gap-2 text-amber-600 dark:text-amber-400 font-medium">
                  <span className="mt-1">⚠</span>
                  <span>This is your final attempt.</span>
                </li>
              )}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={backHref}>
                <ArrowLeft className="h-4 w-4 " />
                Back to lesson
              </Link>
            </Button>

            <Button onClick={onStart} className="text-white">
              {attemptsUsed > 0 ? "Retake Quiz" : "Start Quiz"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: "success" | "error" | null;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-4",
        highlight === "success"
          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50"
          : highlight === "error"
            ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50"
            : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50",
      )}
    >
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p
        className={cn(
          "mt-2 text-lg font-semibold",
          highlight === "success"
            ? "text-green-700 dark:text-green-300"
            : highlight === "error"
              ? "text-red-700 dark:text-red-300"
              : "text-slate-900 dark:text-white",
        )}
      >
        {value}
      </p>
    </div>
  );
};

export default QuizIntroCard;
