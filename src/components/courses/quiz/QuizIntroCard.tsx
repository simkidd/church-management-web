"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, FileQuestion, Trophy } from "lucide-react";
import { IQuiz } from "@/interfaces/quiz.interface";
import { Button } from "@/components/ui/button";

const QuizIntroCard = ({
  quiz,
  onStart,
  backHref,
}: {
  quiz: IQuiz;
  onStart: () => void;
  backHref: string;
}) => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-gradient-to-r from-primary/10 via-white to-white px-6 py-10 dark:border-slate-800 dark:from-primary/10 dark:via-slate-900 dark:to-slate-900 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {quiz.scopeType} quiz
          </p>
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
            label="Passing score"
            value={`${quiz.passingScore}%`}
          />
        </div>

        <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/50">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Before you start
            </p>

            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <p>• Make sure you are ready before starting.</p>
              <p>• Answer every question before submitting.</p>
              <p>
                • If a timer is set, the quiz will submit when time runs out.
              </p>
              <p>• Some questions may allow multiple answers.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={backHref}>
                <ArrowLeft className="h-4 w-4" />
                Back to lesson
              </Link>
            </Button>

            <Button onClick={onStart} className="text-white">
              Start quiz
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

export default QuizIntroCard;
