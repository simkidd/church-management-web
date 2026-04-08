"use client"
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";
import { cn } from "@/lib/utils";
import { countCompletedLessons } from "@/utils/helpers/course-learning";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, FileQuestion, CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarLessonItem } from "./SidebarLessonItem";

export const LearningSidebarModule = ({
  module,
  isOpen,
  onToggle,
  activeLessonId,
  isEnrolled,
  onSelectLesson,
  courseId,
  activeQuizId,
}: {
  module: IModuleWithState;
  isOpen: boolean;
  onToggle: () => void;
  activeLessonId?: string;
  isEnrolled: boolean;
  onSelectLesson: (lesson: ILessonWithState) => void;
  courseId: string;
  activeQuizId?: string | null;
}) => {
  const router = useRouter();
  const completedLessons = countCompletedLessons(module.lessons ?? []);
  const totalLessons = module.lessons?.length || 0;
  const moduleQuizPassed = module.quiz?.isPassed || false;
  const allLessonsCompleted =
    completedLessons === totalLessons && totalLessons > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/30">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            Module {module.order}
          </p>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
            {module.title}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {completedLessons}/{totalLessons} completed
            {module.quiz && (
              <span className="ml-2">
                • Quiz {moduleQuizPassed ? "✓" : "pending"}
              </span>
            )}
          </p>
        </div>

        {isOpen ? (
          <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 border-t border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
              {module.lessons?.map((lesson, idx) => (
                <SidebarLessonItem
                  key={lesson._id}
                  lesson={lesson as ILessonWithState}
                  index={idx + 1}
                  moduleOrder={module.order}
                  isActive={lesson._id === activeLessonId && !activeQuizId}
                  isLocked={!isEnrolled || !!lesson.isLockedForUser}
                  onClick={() => onSelectLesson(lesson as ILessonWithState)}
                  courseId={courseId}
                />
              ))}

              {module.quiz && (
                <button
                  onClick={() => {
                    if (!isEnrolled || module.quiz?.isLockedForUser) return;
                    router.push(
                      `/courses/${courseId}/learn?quizId=${module.quiz?._id}`,
                    );
                  }}
                  disabled={!isEnrolled || module.quiz?.isLockedForUser}
                  className={cn(
                    "mt-2 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm",
                    !isEnrolled || module.quiz.isLockedForUser
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800",
                    activeQuizId === module.quiz?._id &&
                      "bg-primary/10 text-primary",
                  )}
                >
                  {!isEnrolled || module.quiz.isLockedForUser ? (
                    <Lock className="h-4 w-4 text-slate-400" />
                  ) : (
                    <FileQuestion className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Module Assessment
                  </span>
                  {module.quiz.isPassed ? (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />
                  ) : !module.quiz?.isLockedForUser ? (
                    <span className="ml-auto text-xs text-amber-500">
                      Ready
                    </span>
                  ) : null}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};