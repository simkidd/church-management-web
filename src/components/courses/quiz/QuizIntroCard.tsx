"use client";

import { Button } from "@/components/ui/button";
import { IQuiz, IQuizAttempt } from "@/interfaces/quiz.interface";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileQuestion,
  RotateCcw,
  Trophy,
} from "lucide-react";
import Link from "next/link";

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

  hasNextAction?: boolean;
  nextActionLabel?: string;
  onNextAction?: () => void;
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
  hasNextAction = false,
  nextActionLabel,
  onNextAction,
}: QuizIntroCardProps) => {
  const hasPassed = lastAttempt?.passed ?? false;
  const hasPreviousAttempt = attemptsUsed > 0;

  if (hasPassed) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
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

          <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-10">
            <InfoCard
              icon={<FileQuestion className="h-5 w-5" />}
              label="Questions"
              value={String(quiz.questions.length)}
            />
            <InfoCard
              icon={<RotateCcw className="h-5 w-5" />}
              label="Attempts Used"
              value={String(attemptsUsed)}
            />
            <InfoCard
              icon={<Trophy className="h-5 w-5" />}
              label="Your Score"
              value={`${lastAttempt?.percentage ?? 0}%`}
              highlight="success"
            />
          </div>

          <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
            <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-200">
                    Quiz Passed
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    You scored {lastAttempt?.percentage ?? 0}% (required:{" "}
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

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href={backHref}>
                  <ArrowLeft className="h-4 w-4" />
                  Back to lesson
                </Link>
              </Button>

              {hasNextLesson && onNextLesson && (
                <Button
                  onClick={onNextLesson}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <BookOpen className="h-4 w-4" />
                  {nextLessonTitle ? `Next: ${nextLessonTitle}` : "Next Lesson"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}

              {hasNextAction && onNextAction && (
                <Button
                  onClick={onNextAction}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <Award className="h-4 w-4" />
                  {nextActionLabel || "Continue"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}

              <Button onClick={onStart} variant="outline">
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-gradient-to-r from-primary/10 via-white to-white px-6 py-10 dark:border-slate-800 dark:from-primary/10 dark:via-slate-900 dark:to-slate-900 sm:px-10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {quiz.scopeType} quiz
            </p>

            {hasPreviousAttempt && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                Attempt {attemptsUsed + 1}
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

        <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-10">
          <InfoCard
            icon={<FileQuestion className="h-5 w-5" />}
            label="Questions"
            value={String(quiz.questions.length)}
          />

          <InfoCard
            icon={<Trophy className="h-5 w-5" />}
            label="Passing Score"
            value={`${quiz.passingScore}%`}
          />
        </div>

        <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
          {lastAttempt && !lastAttempt.passed && (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
              <div className="flex items-start gap-3">
                <RotateCcw className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                      Previous Attempt
                    </p>
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                      {lastAttempt.percentage}%
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
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

            <ul className="mt-3 list-none space-y-2 text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>Make sure you are ready before starting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>Answer every question before submitting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>Review your answers carefully before submitting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>You can retake this quiz if needed.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={backHref}>
                <ArrowLeft className="h-4 w-4" />
                Back to lesson
              </Link>
            </Button>

            <Button onClick={onStart} className="text-white">
              {hasPreviousAttempt ? "Retake Quiz" : "Start Quiz"}
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