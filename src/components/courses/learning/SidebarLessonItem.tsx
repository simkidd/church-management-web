"use client";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { cn } from "@/lib/utils";
import { getLessonStatus } from "@/utils/helpers/course-learning";
import { calculateReadTime, formatDuration } from "@/utils/helpers/time";
import {
  PlayCircle,
  Headphones,
  FileText,
  CheckCircle2,
  Circle,
  FileQuestion,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const SidebarLessonItem = ({
  lesson,
  index,
  moduleOrder,
  isActive,
  isLocked,
  onClick,
  courseId,
}: {
  lesson: ILessonWithState;
  index: number;
  moduleOrder: number;
  isActive: boolean;
  isLocked: boolean;
  onClick: () => void;
  courseId: string;
}) => {
  const router = useRouter();
  const status = getLessonStatus(lesson);

  const quizPassed = !!lesson.progress.quizPassed || !!lesson.quiz?.isPassed;
  const quizLocked = !!lesson.quiz?.isLockedForUser;
  return (
    <>
      <button
        onClick={onClick}
        disabled={isLocked}
        className={cn(
          "flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition cursor-pointer",
          isActive
            ? "bg-primary/10"
            : "hover:bg-slate-50 dark:hover:bg-slate-800",
          isLocked && "cursor-not-allowed opacity-60",
        )}
      >
        <div className="mt-0.5 shrink-0">
          {isLocked ? (
            <Lock className="h-4 w-4 text-slate-400" />
          ) : lesson.type === "video" ? (
            <PlayCircle className="h-4 w-4 text-blue-500" />
          ) : lesson.type === "audio" ? (
            <Headphones className="h-4 w-4 text-purple-500" />
          ) : (
            <FileText className="h-4 w-4 text-amber-500" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "line-clamp-2 text-sm font-medium",
              isActive ? "text-primary" : "text-slate-800 dark:text-slate-200",
            )}
          >
            {index}. {lesson.title}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>M{moduleOrder}</span>

            {lesson.durationSeconds ? (
              <>
                <span>•</span>
                <span>
                  {lesson.type === "article"
                    ? calculateReadTime(lesson.content?.textContent)
                    : formatDuration(lesson.durationSeconds)}
                </span>
              </>
            ) : null}
          </div>
        </div>

        {status === "completed" ? (
          <CheckCircle2 className="mt-1 h-4 w-4 text-green-500" />
        ) : (
          <Circle className="mt-1 h-4 w-4 text-slate-300" />
        )}
      </button>

      {lesson.quiz && (
        <div className="mt-1 ml-8">
          <button
            type="button"
            onClick={() => {
              if (quizLocked) return;
              router.push(
                `/courses/${courseId}/learn?quizId=${lesson.quiz?._id}`,
              );
            }}
            disabled={quizLocked}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-2 py-1 text-[11px] cursor-pointer",
              quizLocked
                ? "cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
            )}
          >
            <FileQuestion className="h-3 w-3" />
            <span>
              {quizLocked
                ? "Quiz locked until lesson is completed"
                : !quizPassed
                  ? "Take lesson quiz"
                  : "Review lesson quiz"}
            </span>
          </button>
        </div>
      )}
    </>
  );
};
