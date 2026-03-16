"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Lock,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

import { ICourse } from "@/interfaces/course.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";
import { IProgressStats } from "@/interfaces/progress.interface";

import courseApi from "@/lib/api/course.api";
import { useCourse } from "@/hooks/use-courses";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/helpers/time";

import VideoPlayer2 from "../sermons/VideoPlayer";
import CourseDetailSkeleton from "./CourseDetailSkeleton";
import EnrollmentCTA from "./EnrollmentCTA";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type DetailTab = "overview" | "materials";

const CourseDetails = ({ courseId }: { courseId: string }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const { data: courseData, isPending: isCourseLoading } = useCourse(courseId);
  const course = courseData?.data as ICourse;

  const { data, isPending: isCourseModulesLoading } = useQuery<
    ApiResponse<{
      course: ICourse;
      enrolled: { isEnrolled: boolean };
      progress: IProgressStats;
      modules: IModuleWithState[];
    }>
  >({
    queryKey: ["course-modules", courseId],
    queryFn: () => courseApi.getCourseModules(courseId),
    enabled: !!courseId,
  });

  const modules = data?.data?.modules ?? [];
  const isEnrolled = data?.data?.enrolled?.isEnrolled ?? false;
  const progress = data?.data?.progress;

  const progressPercentage = progress?.percentage ?? 0;
  const completedLessons = progress?.completedLessons ?? 0;

  const totalLessons = useMemo(
    () =>
      modules.reduce((acc, module) => acc + (module.lessons?.length || 0), 0),
    [modules],
  );

  const totalDuration = useMemo(() => {
    const totalSeconds = modules.reduce((acc, module) => {
      const moduleDuration =
        module.lessons?.reduce((sum, lesson) => {
          if (typeof lesson.durationSeconds === "number") {
            return sum + lesson.durationSeconds;
          }

          if (typeof lesson.durationSeconds === "string") {
            return sum + (parseInt(lesson.durationSeconds, 10) || 0);
          }

          return sum;
        }, 0) || 0;

      return acc + moduleDuration;
    }, 0);

    return totalSeconds;
  }, [modules]);

  const totalQuizzes = useMemo(() => {
    let count = 0;

    modules.forEach((module) => {
      if (module.quiz) count += 1;

      module.lessons?.forEach((lesson) => {
        if ((lesson as ILessonWithState).quiz) count += 1;
      });
    });

    return count;
  }, [modules]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  if (isCourseLoading || isCourseModulesLoading) {
    return <CourseDetailSkeleton />;
  }

  const introMedia = course?.introVideo?.url
    ? {
        id: course._id,
        title: course.title,
        description: course.description,
        video: {
          url: course.introVideo.url,
          type: "video/mp4",
        },
        thumbnail: {
          url: course?.thumbnail?.url,
          alt: course.title,
        },
        createdAt: course.createdAt,
      }
    : null;

  return (
    <div className="container mx-auto px-4 py-5">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-slate-500 transition-colors hover:text-primary"
        >
          Home
        </Link>
        <span className="text-slate-500">/</span>
        <Link
          href="/courses"
          className="text-slate-500 transition-colors hover:text-primary"
        >
          Courses
        </Link>
        <span className="text-slate-500">/</span>
        <span className="max-w-xs truncate font-medium text-primary">
          {course?.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-3 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              {course?.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            {introMedia ? (
              <VideoPlayer2
                media={introMedia}
                type="video"
                showTitle={false}
                autoplay={false}
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-slate-950 text-slate-400">
                No intro video available
              </div>
            )}
          </motion.div>

          {!isEnrolled && <EnrollmentCTA courseId={course?._id} />}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="border-b border-slate-200 px-4 dark:border-slate-800 sm:px-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={cn(
                    "border-b-2 px-4 py-4 text-sm font-semibold transition-colors",
                    activeTab === "overview"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white",
                  )}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab("materials")}
                  className={cn(
                    "border-b-2 px-4 py-4 text-sm font-semibold transition-colors",
                    activeTab === "materials"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white",
                  )}
                >
                  Learning Materials
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                      About this course
                    </h3>
                    <div
                      className="prose max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{
                        __html: course?.description || "",
                      }}
                    />
                  </div>

                  <div>
                    <dl className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-3 text-sm">
                      <dt className="text-slate-500">Modules</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">
                        {modules.length}
                      </dd>

                      <dt className="text-slate-500">Lessons</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">
                        {totalLessons}
                      </dd>

                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">
                        {totalDuration > 0
                          ? formatDuration(totalDuration)
                          : course?.duration}
                      </dd>

                      <dt className="text-slate-500">Quizzes</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">
                        {totalQuizzes}
                      </dd>

                      <dt className="text-slate-500">Learning mode</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">
                        {course?.progressionMode === "sequential"
                          ? "Sequential learning"
                          : "Free learning"}
                      </dd>
                    </dl>
                  </div>

                  {!!course?.learningObjectives?.length && (
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                        <BookOpen size={20} className="text-primary" />
                        What You&apos;ll Learn
                      </h3>

                      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {course.learningObjectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-0.5 shrink-0 text-green-500"
                              size={18}
                            />
                            <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                              {objective}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "materials" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
                      <p className="text-sm text-slate-500">Modules</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {modules.length}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
                      <p className="text-sm text-slate-500">Lessons</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {totalLessons}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
                      <p className="text-sm text-slate-500">Quizzes</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {totalQuizzes}
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-slate-300 p-5 dark:border-slate-700">
                    <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                      About the learning materials
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      This course contains videos, articles, and quizzes
                      organized by module. Click any lesson in the curriculum to
                      start learning.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          {isEnrolled && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Your Progress
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {progressPercentage}%
                </span>
              </div>

              <Progress value={progressPercentage} className="h-2" />

              <p className="mt-2 text-xs text-slate-500">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Instructor
            </h4>

            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {course?.instructor?.firstName?.[0]}
                {course?.instructor?.lastName?.[0]}
              </div>

              <div>
                <h5 className="font-bold text-slate-900 dark:text-white">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </h5>
                <p className="text-sm text-slate-500">
                  {course?.instructor?.email}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-24 flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="border-b border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <List className="text-primary" size={20} />
                Course Curriculum
              </h3>
            </div>

            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
              {modules.length > 0 ? (
                modules.map((module) => (
                  <CurriculumModuleAccordion
                    key={module._id}
                    courseId={courseId}
                    module={module}
                    isOpen={!!openModules[module._id]}
                    onToggle={() => toggleModule(module._id)}
                    isEnrolled={isEnrolled}
                  />
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center dark:border-slate-700 dark:bg-slate-800/50">
                  <p className="text-slate-500 text-sm">
                    No modules available.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CurriculumModuleAccordion = ({
  courseId,
  module,
  isOpen,
  onToggle,
  isEnrolled,
}: {
  courseId: string;
  module: IModuleWithState;
  isOpen: boolean;
  onToggle: () => void;
  isEnrolled: boolean;
}) => {
  const totalLessons = module.lessons?.length || 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-all duration-200",
        isOpen
          ? "border-primary/20 bg-white shadow-sm dark:border-primary/30 dark:bg-slate-900"
          : "border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
            Module {module.order}: {module.title}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {totalLessons} lesson{totalLessons === 1 ? "" : "s"}
            {module.quiz ? " • Includes quiz" : ""}
          </p>
        </div>

        {isOpen ? (
          <ChevronUp size={18} className="shrink-0 text-slate-400" />
        ) : (
          <ChevronDown size={18} className="shrink-0 text-slate-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-1 bg-white p-2 dark:bg-slate-900">
              {module.lessons?.map((lesson, idx) => (
                <CurriculumLessonItem
                  key={lesson._id}
                  courseId={courseId}
                  lesson={lesson as ILessonWithState}
                  lessonOrder={idx + 1}
                  moduleOrder={module.order}
                  isEnrolled={isEnrolled}
                />
              ))}

              {module.quiz && (
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                  <div className="shrink-0">
                    {!isEnrolled || module.quiz.isLockedForUser ? (
                      <Lock size={16} className="text-slate-400" />
                    ) : (
                      <HelpCircle size={16} className="text-amber-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Module Quiz
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CurriculumLessonItem = ({
  courseId,
  lesson,
  moduleOrder,
  lessonOrder,
  isEnrolled,
}: {
  courseId: string;
  lesson: ILessonWithState;
  moduleOrder: number;
  lessonOrder: number;
  isEnrolled: boolean;
}) => {
  const isLocked = !isEnrolled || lesson.isLockedForUser;

  const getIcon = () => {
    if (isLocked) return <Lock size={16} className="text-slate-400" />;

    switch (lesson.type) {
      case "video":
        return <PlayCircle size={16} className="text-blue-500" />;
      case "article":
        return <FileText size={16} className="text-green-500" />;
      case "audio":
        return <PlayCircle size={16} className="text-purple-500" />;
      default:
        return <PlayCircle size={16} className="text-slate-400" />;
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg p-3 transition-colors",
        !isLocked && "hover:bg-slate-50 dark:hover:bg-slate-800",
      )}
    >
      <div className="shrink-0">{getIcon()}</div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
          {moduleOrder}.{lessonOrder} {lesson.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="capitalize">{lesson.type}</span>

          {lesson.durationSeconds ? (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {formatDuration(lesson.durationSeconds)}
              </span>
            </>
          ) : null}

          {lesson.quiz ? (
            <>
              <span>•</span>
              <span className="text-amber-500">Quiz</span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return <div className="opacity-70">{content}</div>;
  }

  return (
    <Link href={`/courses/${courseId}/learn?lessonId=${lesson._id}`}>
      {content}
    </Link>
  );
};

export default CourseDetails;
