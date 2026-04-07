"use client";

import { Progress } from "@/components/ui/progress";
import { Clock3 } from "lucide-react";

const QuizHeader = ({
  title,
  currentQuestion,
  totalQuestions,
  answeredCount,
  progressValue,
}: {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  progressValue: number;
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-white">
        {title}
      </p>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Current question</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-500">Answered</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {answeredCount}/{totalQuestions}
          </span>
        </div>

        <div className="mt-4">
          <Progress value={progressValue} className="h-2.5" />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Completion</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {progressValue}%
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Answer all questions before submitting your quiz.
        </p>
      </div>
    </div>
  );
};

export default QuizHeader;
