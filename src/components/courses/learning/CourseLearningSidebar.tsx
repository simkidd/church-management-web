"use client"
import { IModuleWithState } from "@/interfaces/module.interface";
import { LearningSidebarModule } from "./LearningSidebarModule";
import { ICourse } from "@/interfaces/course.interface";
import { IQuizSummary } from "@/interfaces/quiz.interface";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CertificateSidebarItem } from "./CertificateSidebarItem";
import { CourseQuizSidebarItem } from "./CourseQuizSidebarItem";

type SidebarProps = {
  course: ICourse;
  courseId: string;
  modules: IModuleWithState[];
  openModules: Record<string, boolean>;
  toggleModule: (moduleId: string) => void;
  activeLessonId?: string;
  activeQuizId?: string | null;
  isEnrolled: boolean;
  progressPercentage: number;
  completedLessons: number;
  totalLessonCount: number;
  courseQuiz: IQuizSummary | null;
  courseCompleted: boolean;
  onSelectLesson: (lesson: ILessonWithState) => void;
};

export const CourseLearningSidebar = ({
  course,
  courseId,
  modules,
  openModules,
  toggleModule,
  activeLessonId,
  activeQuizId,
  isEnrolled,
  progressPercentage,
  completedLessons,
  totalLessonCount,
  courseQuiz,
  courseCompleted,
  onSelectLesson,
}: SidebarProps) => {
  return (
    <>
      <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <Link
          href={`/courses/${courseId}`}
          className="flex w-fit items-center gap-1 py-2 text-sm font-medium text-slate-500 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to course
        </Link>

        <h2 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
          {course.title}
        </h2>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Progress</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {progressPercentage}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs text-slate-500">
            {completedLessons} of {totalLessonCount} lessons completed
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {modules.map((module) => (
            <LearningSidebarModule
              key={module._id}
              module={module}
              isOpen={!!openModules[module._id]}
              onToggle={() => toggleModule(module._id)}
              activeLessonId={activeLessonId}
              isEnrolled={isEnrolled}
              onSelectLesson={onSelectLesson}
              courseId={courseId}
              activeQuizId={activeQuizId}
            />
          ))}

          {courseQuiz && (
            <CourseQuizSidebarItem
              courseQuiz={courseQuiz}
              isEnrolled={isEnrolled}
              courseId={courseId}
              isActive={activeQuizId === courseQuiz._id}
            />
          )}

          {courseCompleted && (
            <CertificateSidebarItem
              courseId={courseId}
              isEnrolled={isEnrolled}
            />
          )}
        </div>
      </div>
    </>
  );
};