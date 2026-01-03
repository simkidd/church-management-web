"use client";
import Logo from "@/components/shared/Logo";
import { ThemeToggler } from "@/components/shared/ThemeToggler";
import { useQuiz } from "@/hooks/use-quiz";
import { IQuiz } from "@/interfaces/quiz.interface";
import { useQuizStore } from "@/stores/quiz.store";
import { Timer } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function QuizHeader({ quiz }: { quiz: IQuiz }) {
  const {
    duration,
    startedAt,
    startQuiz,
    markTimeExpired,
    markSubmitted,
    setAttempt,
    timeExpired,
    submitted,
  } = useQuizStore();
  const { submitQuiz, isSubmitting } = useQuiz(quiz._id);
  const [timeLeft, setTimeLeft] = useState(0);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (!startedAt && !submitted && !timeExpired) {
      startQuiz(15); // default to 15 minutes
    }
  }, [startedAt, startQuiz, timeExpired, submitted]);

  const handleSubmit = (expired = false) => {
    if (submitted || timeExpired || isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    const currentAnswers = useQuizStore.getState().answers;

    submitQuiz(
      { quizId: quiz._id, answers: currentAnswers },
      {
        onSuccess: (res) => {
          const attemptId = res.data.attempt;
          setAttempt(attemptId);

          setTimeout(() => {
            if (expired) {
              markTimeExpired();
            } else {
              markSubmitted();
            }
            isSubmittingRef.current = false;
          }, 100);
        },
        onError: () => {
          isSubmittingRef.current = false;
        },
      }
    );
  };

  // Timer effect
  useEffect(() => {
    if (!startedAt || submitted || timeExpired) return;

    const updateTimeLeft = () => {
      const secondsLeft = Math.max(
        0,
        duration - Math.floor((Date.now() - startedAt) / 1000)
      );
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0 && !isSubmittingRef.current) {
        handleSubmit(true);
      }
    };

    // Update immediately without causing double render
    updateTimeLeft();

    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [startedAt, duration, submitted, timeExpired]);

  return (
    <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-soft px-4 sm:px-6 py-3 md:py-4 transition-colors">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        {/* Left: Logo + Course info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
          <Link href="/">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary shrink-0">
              <Logo className="h-7" />
            </div>
          </Link>

          <div className="flex flex-col">
            <h2 className="text-base sm:text-lg font-bold leading-tight tracking-tight">
              {quiz.module.course.title}
            </h2>
            <span className="text-xs text-text-muted dark:text-gray-400 font-medium">
              Module {quiz.module.order}: {quiz.module.title}
            </span>
          </div>
        </div>

        {/* Right: Timer + Theme + Submit */}
        <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto flex-wrap justify-start md:justify-end">
          <ThemeToggler />

          {/* Timer: always visible, responsive sizing */}
          {startedAt && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full border text-sm sm:text-base font-medium">
              <Timer size={16} className="text-accent-warm-2" />
              <span className="tabular-nums">
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
          )}

          <button
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting || submitted}
            className="flex items-center gap-2 h-8 sm:h-10 px-3 sm:px-5 rounded-xl border bg-primary dark:bg-primary-white text-white transition-colors text-sm sm:text-base font-bold cursor-pointer"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </header>
  );
}
