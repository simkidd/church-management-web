"use client";
import { IQuizQuestion } from "@/interfaces/quiz.interface";
import { cn } from "@/lib/utils";
import { useQuizStore } from "@/stores/quiz.store";
import { Check, Grid } from "lucide-react";

export default function QuizSidebar({
  questions,
}: {
  questions: IQuizQuestion[];
}) {
  const { currentIndex, goTo, answers } = useQuizStore();

  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      {/* Navigator */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border">
        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
          <Grid size={18} className="text-primary" />
          Navigator
        </h3>

        <div className="grid grid-cols-6 gap-2">
          {questions.map((q, idx) => {
            const isActive = idx === currentIndex;
            const isAnswered = answers[q._id] !== undefined;

            let bgClass =
              "bg-stone-100 dark:bg-slate-900/40 text-stone-700 dark:text-gray-500";
            if (isAnswered)
              bgClass =
                "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            if (isActive)
              bgClass =
                "bg-primary text-white shadow-md ring-2 ring-primary/20 ring-offset-2 ring-offset-white dark:ring-offset-[#2a2518] font-bold";

            return (
              <button
                key={q._id}
                onClick={() => goTo(idx)}
                className={cn(
                  "aspect-square rounded-lg font-medium text-sm flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity",
                  bgClass
                )}
              >
                {isAnswered && !isActive ? <Check /> : idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
