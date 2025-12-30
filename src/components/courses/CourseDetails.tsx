/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ICourse } from "@/interfaces/course.interface";
import { ILesson, ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithLessons } from "@/interfaces/module.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";
import courseApi from "@/lib/api/course.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCheck,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Lightbulb,
  List,
  Lock,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import VideoPlayer2 from "../sermons/VideoPlayer";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/helpers/time";
import { IProgressStats } from "@/interfaces/progress.interface";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import CourseDetailSkeleton from "./CourseDetailSkeleton";

const CourseDetails = ({ course }: { course: ICourse }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const lessonId = searchParams.get("lesson") as string | undefined;
  /** UI state: expanded modules */
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  /** Fetch modules + lessons */
  const { data, isPending } = useQuery<
    ApiResponse<{
      course: ICourse;
      progress: IProgressStats;
      modules: IModuleWithLessons[];
    }>
  >({
    queryKey: ["course-modules", course._id],
    queryFn: () => courseApi.getCourseModules(course._id),
    enabled: !!course._id,
  });

  const modules = useMemo<IModuleWithLessons[]>(() => {
    return data?.data?.modules ?? [];
  }, [data]);

  const progress = data?.data?.progress;

  /** Flatten lessons (ordered) */
  const flatLessons = useMemo(() => {
    return modules.flatMap((m) => m.lessons ?? []);
  }, [modules]);

  /** Find selected lesson */
  const activeLesson = useMemo<ILessonWithState | null>(() => {
    if (!lessonId) return null;

    return flatLessons.find((lesson) => lesson._id === lessonId) || null;
  }, [flatLessons, lessonId]);

  /** Auto-select first unlocked lesson */
  useEffect(() => {
    if (!lessonId && flatLessons.length) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firstUnlocked = flatLessons.find((l: any) => !l.isLockedForUser);

      if (firstUnlocked) {
        router.replace(`/courses/${course._id}?lesson=${firstUnlocked._id}`);
      }
    }
  }, [lessonId, flatLessons, router, course._id]);

  const markCompleteMutation = useMutation({
    mutationFn: () => courseApi.markLessonComplete(activeLesson?._id as string),

    onSuccess: (res) => {
      toast.success("Lesson completed");

      queryClient.invalidateQueries({
        queryKey: ["course-modules", course._id],
      });

      if (res.data.nextLessonId) {
        router.push(`/courses/${course._id}?lesson=${res.data.nextLessonId}`, {
          scroll: false,
        });
      }
    },

    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(
        err?.response?.data?.message ?? "Failed to mark lesson complete"
      );
    },
  });

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  /** Next lesson / quiz helper */
  const nextPlayable = (() => {
    if (!activeLesson) return null;

    const currentIndex = flatLessons.findIndex(
      (l) => l._id === activeLesson._id
    );

    // Next unlocked lesson
    for (let i = currentIndex + 1; i < flatLessons.length; i++) {
      if (!(flatLessons[i] as any).isLockedForUser) {
        return { type: "lesson", id: flatLessons[i]._id };
      }
    }

    // Check module quiz
    const currentModule = modules.find((m) =>
      m.lessons?.some((l) => l._id === activeLesson._id)
    );

    if (currentModule?.quiz && !(currentModule.quiz as any).isLockedForUser) {
      return { type: "quiz", id: currentModule.quiz._id };
    }

    return null;
  })();

  const currentModule = modules.find((m) =>
    m.lessons?.some((l) => l._id === activeLesson?._id)
  );

  const lessonIndex =
    currentModule?.lessons?.findIndex((l) => l._id === activeLesson?._id) ?? 0;

  if (isPending || !activeLesson) return <CourseDetailSkeleton />;

  const mediaItem = {
    id: activeLesson._id,
    title: activeLesson.title,
    description: activeLesson.content,
    video: {
      url: activeLesson.video?.url,
      type: activeLesson.video?.type,
    },
    thumbnail: {
      url: course.thumbnail?.url,
      alt: activeLesson.title,
    },
    duration: activeLesson.duration,
    createdAt: activeLesson.createdAt,
  };

  return (
    <div className="container px-4 mx-auto py-5">
      <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        <Link
          className="text-[#637288] hover:text-primary transition-colors"
          href="/"
        >
          Home
        </Link>
        <span className="text-[#637288]">/</span>
        <Link
          className="text-[#637288] hover:text-primary transition-colors"
          href={`/courses`}
        >
          Courses
        </Link>
        <span className="text-[#637288]">/</span>
        <span className="text-primary dark:text-primary-light font-medium truncate max-w-50 sm:max-w-none capitalize">
          {course.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <VideoPlayer2
            media={mediaItem as any}
            type="lesson"
            showTitle={true}
            autoPlay={false}
            onPlay={() => console.log("Lesson started playing")}
            onEnded={() => console.log("Lesson ended")}
          />
          {/* title and nav buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {activeLesson.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
                  Module {currentModule?.order}
                </span>
                <span>•</span>
                <span>
                  Lesson {lessonIndex + 1} of {currentModule?.lessons?.length}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => markCompleteMutation.mutate()}
                disabled={
                  activeLesson.isLockedForUser ||
                  activeLesson.isCompleted ||
                  markCompleteMutation.isPending
                }
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer",
                  activeLesson.isCompleted
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : activeLesson.isLockedForUser
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90 shadow"
                )}
              >
                <CheckCircle2 size={18} />
                {activeLesson.isCompleted
                  ? "Completed"
                  : markCompleteMutation.isPending
                  ? "Saving..."
                  : "Mark as Complete"}
              </button>

              <button
                className={cn(
                  "px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 text-sm font-semibold transition-all transform flex items-center gap-2 cursor-pointer",
                  nextPlayable
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
                disabled={!nextPlayable}
                onClick={() => {
                  if (!nextPlayable) return;
                  router.push(
                    `/courses/${course._id}?${
                      nextPlayable.type === "lesson"
                        ? `lesson=${nextPlayable.id}`
                        : `quiz=${nextPlayable.id}`
                    }`,
                    { scroll: false }
                  );
                }}
              >
                {nextPlayable?.type === "quiz" ? "Take Quiz" : "Next Lesson"}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-card-light dark:bg-card-dark rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              <button className="px-6 py-4 text-sm font-semibold text-primary dark:text-primary-light border-b-2 border-primary bg-primary/5">
                Overview
              </button>
              {/* <button className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Resources
              </button>
              <button className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Discussion
                <span className="ml-1 text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
                  12
                </span>
              </button>
              <button className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Notes
              </button> */}
            </div>
            <div className="p-6 sm:p-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {/* <p className="lead text-lg text-slate-600 dark:text-slate-300">
                  In this lesson, we dive deep into Galatians 5:22-23 to
                  understand what it truly means to bear fruit in our walk with
                  God.
                </p> */}
                <div
                  dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                />

                <h4 className="text-slate-900 dark:text-white font-bold mt-6 mb-3">
                  Key Takeaways
                </h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1" />
                    <span>
                      Differentiation between Gifts and Fruits of the Spirit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1" />
                    <span>
                      Practical steps to cultivating patience in a fast-paced
                      world.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1" />
                    <span>Self-reflection exercise on Gentleness.</span>
                  </li>
                </ul>
                <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-4 mt-6 rounded-r-xl">
                  <p className="text-sm text-accent-warm-2 dark:text-amber-200 font-medium m-0 flex gap-2">
                    <Lightbulb />
                    <strong>Reflection:</strong> Which aspect of the Fruit of
                    the Spirit do you find most challenging to demonstrate in
                    your workplace?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 relative">
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Instructor
            </h4>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-linear-to-br from-primary to-blue-800 text-white flex items-center justify-center text-xs font-bold shadow-md">
                SO
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  {course.instructor?.firstName +
                    " " +
                    course.instructor?.lastName}
                </h5>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-8rem)] sticky top-24">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <List className="text-primary dark:text-primary-light" />
                Course Content
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {progress?.percentage}% Complete
              </span>
            </div>
            <div className="overflow-y-auto custom-scrollbar grow p-3 space-y-3">
              {modules.map((module) => {
                const isOpen = openModules[module._id] ?? false;

                return (
                  <div
                    key={module._id}
                    className={cn(
                      "rounded-xl bg-slate-50 border dark:bg-slate-900/30 overflow-hidden",
                      isOpen
                        ? "border-primary/20 dark:border-primary-light shadow-sm"
                        : "border-slate-100 dark:border-slate-800"
                    )}
                  >
                    <button
                      className={cn(
                        "w-full flex items-center justify-between p-3 text-left bg-white dark:bg-slate-800  transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50",
                        isOpen
                          ? "border-b border-slate-100 dark:border-slate-700"
                          : ""
                      )}
                      onClick={() => toggleModule(module._id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                          <CheckCheck size={14} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Module {module.order}: {module.title}
                        </span>
                      </div>

                      {isOpen ? (
                        <ChevronUp size={18} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-2 space-y-1">
                        {module.lessons?.map((lesson) => {
                          const isActive = lesson._id === activeLesson?._id;

                          const isLocked = (lesson as any).isLockedForUser;

                          return (
                            <button
                              key={lesson._id}
                              onClick={() =>
                                router.push(
                                  `/courses/${course._id}?lesson=${lesson._id}`,
                                  { scroll: true }
                                )
                              }
                              disabled={isLocked}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer w-full text-left",
                                isActive
                                  ? "bg-white dark:bg-slate-700 border-l-4 border-primary shadow-sm"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-700/50",
                                isLocked &&
                                  "opacity-70 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group cursor-not-allowed"
                              )}
                            >
                              <div className="relative flex items-center justify-center size-5 shrink-0">
                                {isLocked ? (
                                  <Lock size={18} className="text-slate-300" />
                                ) : isActive ? (
                                  <PlayCircle
                                    size={18}
                                    className="text-primary dark:text-primary-light animate-pulse"
                                  />
                                ) : (
                                  <CheckCircle2
                                    size={18}
                                    className="text-green-500"
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    "text-xs font-bold text-slate-900 dark:text-white truncate",
                                    isLocked
                                      ? "text-slate-600 dark:text-slate-400"
                                      : ""
                                  )}
                                >
                                  {module.order}.{lesson.order} {lesson.title}
                                </p>

                                {isActive ? (
                                  <p className="text-[10px] text-primary dark:text-primary-light font-medium">
                                    Playing Now
                                  </p>
                                ) : (
                                  lesson.duration && (
                                    <p className="text-[10px] text-slate-400">
                                      {formatDuration(lesson.duration)}
                                    </p>
                                  )
                                )}
                              </div>
                            </button>
                          );
                        })}

                        {/* Quiz */}
                        {module.quiz && (
                          <button
                            disabled={(module.quiz as any).isLockedForUser}
                            onClick={() =>
                              router.push(
                                `/courses/${course._id}?quiz=${module.quiz}`,
                                { scroll: false }
                              )
                            }
                            className={cn(
                              "w-full flex items-center gap-3 p-2 rounded-lg text-left mt-1 cursor-pointer",
                              (module.quiz as any).isLockedForUser
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-slate-100 dark:hover:bg-slate-700/50"
                            )}
                          >
                            <div className="relative flex items-center justify-center size-5 shrink-0">
                              {(module.quiz as any).isLockedForUser ? (
                                <Lock size={18} className="text-slate-300" />
                              ) : (
                                <CheckCheck size={18} />
                              )}
                            </div>
                            <span
                              className={cn(
                                "text-xs font-bold",
                                (module.quiz as any).isLockedForUser
                                  ? "text-slate-600 dark:text-slate-400"
                                  : "text-slate-900 dark:text-white"
                              )}
                            >
                              Module Quiz
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
