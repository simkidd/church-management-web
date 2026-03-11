"use client";

import { IQuizQuestion } from "@/interfaces/quiz.interface";
import { cn } from "@/lib/utils";

const QuizQuestionNavigator = ({
  totalQuestions,
  currentIndex,
  answers,
  questions,
  onGoToQuestion,
}: {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<string, string[]>;
  questions: IQuizQuestion[];
  onGoToQuestion: (index: number) => void;
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Question navigation
        </p>
        <p className="text-xs text-slate-500">{totalQuestions} questions</p>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isActive = index === currentIndex;
          const isAnswered = (answers[question._id] ?? []).length > 0;

          return (
            <button
              key={question._id}
              type="button"
              onClick={() => onGoToQuestion(index)}
              className={cn(
                "flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition",
                isActive
                  ? "border-primary bg-primary text-white"
                  : isAnswered
                    ? "border-primary/20 bg-primary/10 text-primary"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" />
          Current
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary/30" />
          Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
          Unanswered
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionNavigator;