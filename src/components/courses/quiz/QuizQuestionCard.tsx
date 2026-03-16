"use client";

import { CheckCircle2, Dot } from "lucide-react";
import { IQuizQuestion } from "@/interfaces/quiz.interface";
import { cn } from "@/lib/utils";

const QuizQuestionCard = ({
  question,
  questionNumber,
  selectedOptions,
  onSelectOption,
}: {
  question: IQuizQuestion;
  questionNumber: number;
  selectedOptions: string[];
  onSelectOption: (optionId: string) => void;
}) => {
  const isMultiple = question.type === "multiple-choice";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Question {questionNumber}
          </span>
        </div>

        <h2 className="mt-4 text-lg font-semibold leading-8 text-slate-900 dark:text-white">
          {question.question}
        </h2>

        {question.explanation ? (
          <p className="mt-2 text-sm text-slate-500">{question.explanation}</p>
        ) : null}
      </div>

      <div className="space-y-3 px-5 py-5 sm:px-6">
        {question.options.map((option) => {
          const checked = selectedOptions.includes(option._id);

          return (
            <button
              key={option._id}
              type="button"
              onClick={() => onSelectOption(option._id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition",
                checked
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border",
                  isMultiple ? "rounded-md" : "rounded-full",
                  checked
                    ? "border-primary bg-primary text-white"
                    : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900",
                )}
              >
                {checked ? <Dot size={28} /> : null}
              </div>

              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
};

export default QuizQuestionCard;
