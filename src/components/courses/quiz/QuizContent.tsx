"use client";

import { IQuizQuestion } from "@/interfaces/quiz.interface";
import { useQuizStore } from "@/stores/quiz.store";
import { ArrowLeft, ArrowRight, BadgeQuestionMark, Check } from "lucide-react";

export default function QuizContent({
  questions,
}: {
  questions: IQuizQuestion[];
}) {
  const { currentIndex, next, prev, answers, selectAnswer } = useQuizStore();
  const question = questions[currentIndex];
  const selected = answers[question._id];

  const answeredCount = Object.keys(answers).length;

  const percentComplete = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      {/* Progress */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border">
        <div className="flex justify-between mb-2">
          <p className="font-semibold flex items-center gap-2">
            <BadgeQuestionMark size={18} className="text-primary" />
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="text-sm text-text-muted">
            {percentComplete}% Completed
          </p>
        </div>

        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 flex flex-col gap-8 border">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">{question.question}</h2>

          {/* <p className="text-text-muted text-lg">
            For by grace you have been saved through faith...
          </p> */}
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-700" />

        {/* Options */}
        <div className="flex flex-col gap-2">
          {question?.options?.map((opt, idx) => {
            const active = selected === idx;

            return (
              <label
                key={idx}
                onClick={() => selectAnswer(question._id, idx)}
                className={`flex gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all
                  ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-stone-100 dark:hover:bg-slate-900/40"
                  }`}
              >
                <div
                  className={`size-6 rounded-full border-2 flex items-center justify-center
                    ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-stone-300"
                    }`}
                >
                  {active && <Check size={14} />}
                </div>

                <div>
                  <p className="font-semibold">{opt}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          {currentIndex > 0 && (
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-text-muted hover:bg-stone-100 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft />
              Previous
            </button>
          )}

          <button
            onClick={next}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center ml-auto gap-2 px-8 py-3 rounded-xl bg-primary text-white font-bold hover:shadow-lg cursor-pointer"
          >
            Next Question
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
