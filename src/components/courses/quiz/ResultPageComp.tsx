"use client";
import { IQuizAttempt } from "@/interfaces/quiz.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import { quizApi } from "@/lib/api/quiz.api";
import { cn } from "@/lib/utils";
import { useQuizStore } from "@/stores/quiz.store";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ResultPageComp = ({ attemptId }: { attemptId: string }) => {
  const router = useRouter();
  const { resetAll } = useQuizStore();

  const { data, isLoading } = useQuery<
    ApiResponse<{
      attempt: IQuizAttempt;
      attemptsLeft: number;
    }>
  >({
    queryKey: ["quiz-result", attemptId],
    queryFn: () => quizApi.getQuizAttemptById(attemptId),
  });

  if (isLoading) return <div>Loading result...</div>;

  const { attempt, attemptsLeft} = data!.data;

  const getScoreColor = (score: number) => {
    if (score < 40) return "#ef4444"; // red-500
    if (score < 60) return "#f97316"; // orange-500
    if (score < 75) return "#eab308"; // yellow-500
    return "#22c55e"; // green-500
  };

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = (attempt.score / 100) * circumference;
  const strokeColor = getScoreColor(attempt.score);

  return (
    <div>
      <main className="w-full max-w-150 animate-fade-in-up space-y-8">
        <div className="glass-panel rounded-xl p-8 sm:p-12 flex flex-col items-center gap-10 relative overflow-hidden z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-primary/10 to-transparent pointer-events-none"></div>

          <div className="flex flex-col items-center text-center gap-3 z-10">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full  text-xs font-bold uppercase tracking-wider",
                attempt.passed
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-red-100 text-red-700"
              )}
            >
              <CheckCircle2 size={14} />
              {attempt.passed ? "Passed" : "Failed"}
            </span>
            <h1 className="text-text-main-light dark:text-text-main-dark text-3xl sm:text-4xl font-bold tracking-tight">
              Well Done, {attempt.user.firstName}!
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base max-w-md">
              You have demonstrated excellent understanding of the &apos;
              {attempt.quiz.module.title}&apos; module.
            </p>
          </div>

          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center py-2">
            <div className="absolute inset-0 rounded-full border-12 border-border-light dark:border-border-dark opacity-30"></div>
            <svg
              className="absolute inset-0 transform -rotate-90 w-full h-full"
              viewBox="0 0 100 100"
            >
              {/* background ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                className="text-border-light dark:text-border-dark"
                strokeWidth="8"
                opacity="0.3"
              />

              {/* progress ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={strokeColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="flex flex-col items-center justify-center z-10">
              <span className="text-5xl sm:text-6xl font-bold text-primary tracking-tighter">
                {attempt.score}%
              </span>
              <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest mt-1">
                Total Score
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
            <button
              className={cn(
                "flex-1 px-6 py-3.5 rounded-lg border font-semibold transition-colors flex items-center justify-center gap-2 text-nowrap",
                attemptsLeft <= 0
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : "border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-background-light dark:hover:bg-background-dark cursor-pointer group"
              )}
              title={attemptsLeft <= 0 ? "No attempts left" : "Retake Quiz"}
              disabled={attemptsLeft <= 0}
              onClick={() => {
                resetAll();
                router.replace(
                  `/courses/${attempt.quiz.module.course}/quiz/${attempt.quiz._id}`
                );
              }}
            >
              <RotateCw
                size={20}
                className={cn(
                  "transition-transform duration-500",
                  attemptsLeft > 0 && "group-hover:rotate-180"
                )}
              />
              Retake Quiz
            </button>
            <button
              className="flex-1 sm:flex-2 px-6 py-3.5 rounded-lg bg-primary dark:bg-primary-light text-white font-semibold shadow-lg shadow-primary/30 hover:bg-blue-600 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              onClick={() =>
                router.replace(
                  `/courses/${attempt.quiz.module.course}`
                )
              }
            >
              Continue to Next Module
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </main>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default ResultPageComp;
