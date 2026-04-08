"use client"
import { IQuizSummary } from "@/interfaces/quiz.interface";
import { cn } from "@/lib/utils";
import { Award, CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export const CourseQuizSidebarItem = ({
  courseQuiz,
  isEnrolled,
  courseId,
  isActive,
}: {
  courseQuiz: IQuizSummary;
  isEnrolled: boolean;
  courseId: string;
  isActive: boolean;
}) => {
  const router = useRouter();
  const isLocked = !isEnrolled || courseQuiz.isLockedForUser;

  return (
    <button
      onClick={() => {
        if (isLocked) return;
        router.push(`/courses/${courseId}/learn?quizId=${courseQuiz._id}`);
      }}
      disabled={isLocked}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left",
        "hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer",
        isActive
          ? "border-primary/30 bg-primary/10"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
        isLocked && "cursor-not-allowed opacity-60",
      )}
    >
      {isLocked ? (
        <Lock className="h-4 w-4 text-slate-400" />
      ) : (
        <Award className="h-4 w-4 text-primary" />
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Final Course Assessment
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          Passing score: {courseQuiz.passingScore}%
        </p>
      </div>

      {courseQuiz.isPassed ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : null}
    </button>
  );
};