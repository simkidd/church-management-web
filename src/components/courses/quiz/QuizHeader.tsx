"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const QuizHeader = ({
  title,
  currentQuestion,
  totalQuestions,
  answeredCount,
  progressValue,
  durationMinutes,
  onTimeUp,
}: {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  progressValue: number;
  durationMinutes: number;
  onTimeUp: () => void;
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes > 0 ? durationMinutes * 60 : 0,
  );

  useEffect(() => {
    if (!durationMinutes || durationMinutes <= 0) return;
    if (remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMinutes, remainingSeconds, onTimeUp]);

  const formattedTime = useMemo(() => {
    if (!durationMinutes || durationMinutes <= 0) return "No timer";

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [durationMinutes, remainingSeconds]);

  const isDanger = durationMinutes > 0 && remainingSeconds <= 60;

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

      <div
        className={`mt-4 rounded-2xl border px-4 py-3 ${
          isDanger
            ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock3
            className={`h-4 w-4 ${isDanger ? "text-red-500" : "text-slate-500"}`}
          />
          <span className="text-sm text-slate-500">Time left</span>
        </div>

        <p
          className={`mt-2 text-xl font-bold ${
            isDanger ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"
          }`}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default QuizHeader;