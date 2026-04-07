"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  FileQuestion,
  FileText,
  Headphones,
  Lock,
  PlayCircle,
} from "lucide-react";

import { ICourse } from "@/interfaces/course.interface";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";
import { IProgressStats } from "@/interfaces/progress.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";

import courseApi from "@/lib/api/course.api";
import progressApi from "@/lib/api/progress.api";
import { useCourseLearningStore } from "@/stores/course-learning.store";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/helpers/time";
import {
  countCompletedLessons,
  getLessonCompleted,
  getLessonContentCompleted,
  getLessonHasQuiz,
  getLessonQuizPassed,
  getLessonStatus,
} from "@/utils/helpers/course-learning";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import VideoPlayer from "../../sermons/VideoPlayer";
import TextContentRenderer from "../../shared/TextContentRenderer";
import CourseLearningSkeleton from "./CourseLearningSkeleton";
import { quizApi } from "@/lib/api/quiz.api";
import QuizIntroCard from "../quiz/QuizIntroCard";
import { IQuizSummary } from "@/interfaces/quiz.interface";

const CourseLearning = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const lessonId = searchParams.get("lessonId");
  const quizId = searchParams.get("quizId");

  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [watchProgress, setWatchProgress] = useState(0); // Track watch percentage

  const {
    setCourseData,
    setActiveLesson,
    activeLesson,
    modules,
    progress,
    isEnrolled,
    openModules,
    toggleModule,
    currentModule,
    nextPlayable,
    previousPlayableLesson,
    currentLessonPosition,
    totalLessons,
    setQuizState,
    setActiveQuiz,
    nextAfterLesson,
    getLessonById,
    course,
  } = useCourseLearningStore();

  const { data, isPending } = useQuery<
    ApiResponse<{
      course: ICourse;
      enrolled: { isEnrolled: boolean };
      progress: IProgressStats;
      modules: IModuleWithState[];
      quiz: IQuizSummary | null;
    }>
  >({
    queryKey: ["course-learning", courseId],
    queryFn: () => courseApi.getCourseModules(courseId),
    enabled: !!courseId,
  });

  // Query for quiz data when showing intro
  const { data: quizData, isPending: isQuizPending } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => quizApi.getQuizById(quizId!),
    enabled: !!quizId,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!data?.data) return;

    setCourseData({
      course: data.data.course,
      modules: data.data.modules,
      progress: data.data.progress,
      enrolled: data.data.enrolled,
      quiz: data.data.quiz,
      preferredLessonId: lessonId ?? undefined,
    });
  }, [data, lessonId, setCourseData]);

  // Sync quiz data to store when fetched
  useEffect(() => {
    if (quizData?.data && quizId) {
      setQuizState(quizId, {
        attemptsUsed: quizData.data.attemptsUsed ?? 0,
        attemptsLeft: quizData.data.attemptsLeft ?? 0,
        lastAttempt: quizData.data.lastAttempt,
        isLoading: false,
      });
      setActiveQuiz(quizId);
    }
  }, [quizData, quizId, setQuizState, setActiveQuiz]);

  const markContentCompleteMutation = useMutation({
    mutationFn: (selectedLessonId: string) =>
      progressApi.markLessonComplete(selectedLessonId),
    onSuccess: () => {
      toast.success("Lesson completed!");
      queryClient.invalidateQueries({
        queryKey: ["course-learning", courseId],
      });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(
        err?.response?.data?.message ??
          "Failed to mark lesson content complete",
      );
    },
  });

  const updatePlaybackMutation = useMutation({
    mutationFn: ({
      lessonId,
      watchTimeSeconds,
      lastPositionSeconds,
    }: {
      lessonId: string;
      watchTimeSeconds: number;
      lastPositionSeconds: number;
    }) =>
      progressApi.updatePlaybackProgress(lessonId, {
        watchTimeSeconds,
        lastPositionSeconds,
      }),
    onSuccess: () => {
      // Invalidate to refresh progress data
      queryClient.invalidateQueries({
        queryKey: ["course-learning", courseId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error("Failed to update playback progress", {
        description: error.response?.data?.message,
      });
    },
  });

  // Debounce helper

  const saveProgress = (
    lessonId: string,
    watchTime: number,
    position: number,
  ) => {
    // Clear pending save
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }

    // Debounce by 1 second
    progressTimeoutRef.current = setTimeout(() => {
      updatePlaybackMutation.mutate({
        lessonId,
        watchTimeSeconds: Math.floor(watchTime),
        lastPositionSeconds: Math.floor(position),
      });
    }, 1000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
    };
  }, []);

  if (isPending) {
    return <CourseLearningSkeleton />;
  }

  if (!data?.data?.course) {
    return <div className="p-8 text-sm text-slate-500">Course not found.</div>;
  }

  const currentCourse = data.data.course;
  const currentModuleData = currentModule();
  const nextItem = nextPlayable();
  const previousLesson = previousPlayableLesson();
  const currentPosition = currentLessonPosition();
  const totalLessonCount = totalLessons();
  const courseQuiz = course?.quiz ?? data.data.quiz ?? null;

  const completedLessons = modules.reduce(
    (acc, module) => acc + countCompletedLessons(module.lessons ?? []),
    0,
  );
  const progressPercentage = progress?.percentage ?? 0;

  // Calculate if user has watched enough to manually complete (e.g., 80%)
  const hasWatchedEnough = watchProgress >= 80;

  const isLocked = !!activeLesson?.isLockedForUser || !isEnrolled;
  const isVideo =
    activeLesson?.type === "video" || activeLesson?.type === "audio";
  const isArticle = activeLesson?.type === "article";

  const hasQuiz = activeLesson ? getLessonHasQuiz(activeLesson) : false;
  const contentCompleted = activeLesson
    ? getLessonContentCompleted(activeLesson)
    : false;
  const quizPassed = activeLesson ? getLessonQuizPassed(activeLesson) : false;
  const lessonCompleted = activeLesson
    ? getLessonCompleted(activeLesson)
    : false;
  const lessonStatus = activeLesson ? getLessonStatus(activeLesson) : null;

  const mediaItem = activeLesson
    ? {
        id: activeLesson._id,
        title: activeLesson.title,
        description: activeLesson.content?.textContent,
        video: activeLesson.content?.videoUrl
          ? {
              url: activeLesson.content.videoUrl,
              type: "video/mp4",
            }
          : undefined,
        thumbnail: {
          url: currentCourse.thumbnail?.url,
          alt: activeLesson.title,
        },
        duration:
          typeof activeLesson.durationSeconds === "number"
            ? activeLesson.durationSeconds
            : undefined,
        createdAt: activeLesson.createdAt,
      }
    : null;

  const handleSelectLesson = (lesson: ILessonWithState) => {
    if (!isEnrolled || lesson.isLockedForUser) return;
    setActiveLesson(lesson);
    router.push(`/courses/${courseId}/learn?lessonId=${lesson._id}`);
  };

  const handleNext = () => {
    if (!nextItem) return;

    if (nextItem.type === "lesson") {
      router.replace(`/courses/${courseId}/learn?lessonId=${nextItem.id}`);
      return;
    }

    if (
      nextItem.type === "lesson-quiz" ||
      nextItem.type === "module-quiz" ||
      nextItem.type === "course-quiz"
    ) {
      router.push(`/courses/${courseId}/learn?quizId=${nextItem.id}`);
    }
  };

  const handlePrevious = () => {
    if (!previousLesson) return;
    router.replace(`/courses/${courseId}/learn?lessonId=${previousLesson._id}`);
  };

  const handleOpenLessonQuiz = () => {
    if (!activeLesson?.quiz?._id) return;
    router.push(`/courses/${courseId}/learn?quizId=${activeLesson.quiz._id}`);
  };

  const handleStartQuiz = (targetQuizId: string) => {
    router.push(`/courses/${courseId}/quiz/${targetQuizId}`);
  };

  const handleCloseQuizIntro = () => {
    // Go back to the lesson or course learn page without quiz param
    if (activeLesson) {
      router.replace(`/courses/${courseId}/learn?lessonId=${activeLesson._id}`);
    } else {
      router.replace(`/courses/${courseId}/learn`);
    }
  };

  if (quizId) {
    // Get quiz state from store (synced from API)
    const quizState = useCourseLearningStore.getState().quizStates[quizId];
    const hasPassedQuiz = quizState?.lastAttempt?.passed ?? false;

    // Use store's nextAfterLesson to find next lesson when quiz is passed
    let hasNextLesson = false;
    let nextLessonId: string | null = null;
    let nextLessonTitle: string | undefined;

    if (hasPassedQuiz && activeLesson) {
      const nextItemAfterLesson = nextAfterLesson(activeLesson._id);
      if (nextItemAfterLesson?.type === "lesson") {
        hasNextLesson = true;
        nextLessonId = nextItemAfterLesson.id;
        const nextLesson = getLessonById(nextItemAfterLesson.id);
        nextLessonTitle = nextLesson?.title;
      }
    }

    const handleNextLessonFromQuiz = () => {
      if (nextLessonId) {
        router.push(`/courses/${courseId}/learn?lessonId=${nextLessonId}`);
        return;
      }

      const computedNext = nextPlayable();

      if (
        computedNext &&
        (computedNext.type === "module-quiz" ||
          computedNext.type === "course-quiz")
      ) {
        router.push(`/courses/${courseId}/learn?quizId=${computedNext.id}`);
      }
    };

    return (
      <div className="flex h-full min-h-0 bg-slate-50 dark:bg-slate-950">
        <aside className="hidden h-full w-[360px] shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <Link
              href={`/courses/${courseId}`}
              className="text-xs font-medium text-slate-500 hover:text-primary flex items-center gap-1 py-2 w-fit"
            >
              <ArrowLeft size={16} />
              Back to course
            </Link>

            <h2 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
              {currentCourse.title}
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
                  activeLessonId={activeLesson?._id}
                  isEnrolled={isEnrolled}
                  onSelectLesson={handleSelectLesson}
                  courseId={courseId}
                  activeQuizId={quizId}
                />
              ))}

              {courseQuiz && (
                <CourseQuizSidebarItem
                  courseQuiz={courseQuiz}
                  isEnrolled={isEnrolled}
                  courseId={courseId}
                  isActive={quizId === courseQuiz._id}
                />
              )}
            </div>
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseQuizIntro}
                className="text-slate-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                Quiz Preview
              </h1>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {isQuizPending ? (
              <QuizIntroSkeleton />
            ) : quizData?.data ? (
              <QuizIntroCard
                quiz={quizData.data}
                attemptsUsed={quizData.data.attemptsUsed ?? 0}
                lastAttempt={quizData.data.lastAttempt}
                backHref={`/courses/${courseId}/learn${
                  activeLesson?._id ? `?lessonId=${activeLesson._id}` : ""
                }`}
                startHref={`/courses/${courseId}/quiz/${quizId}`}
                onStart={() => handleStartQuiz(quizId)}
                hasNextLesson={hasNextLesson}
                onNextLesson={handleNextLessonFromQuiz}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <FileQuestion className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    Quiz not found or unavailable.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleCloseQuizIntro}
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 bg-slate-50 dark:bg-slate-950">
      <aside className="hidden h-full w-[360px] shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Link
            href={`/courses/${courseId}`}
            className="text-xs font-medium text-slate-500 hover:text-primary flex items-center gap-1 py-2 w-fit"
          >
            <ArrowLeft size={16} />
            Back to course
          </Link>

          <h2 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
            {currentCourse.title}
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
                activeLessonId={activeLesson?._id}
                isEnrolled={isEnrolled}
                onSelectLesson={handleSelectLesson}
                courseId={courseId}
              />
            ))}

            {courseQuiz && (
              <CourseQuizSidebarItem
                courseQuiz={courseQuiz}
                isEnrolled={isEnrolled}
                courseId={courseId}
                isActive={quizId === courseQuiz._id}
              />
            )}
          </div>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                {currentModuleData && (
                  <span>Module {currentModuleData.order}</span>
                )}
                {currentModuleData && <span>•</span>}
                <span>
                  Lesson {currentPosition} of {totalLessonCount}
                </span>
                {activeLesson?.durationSeconds ? (
                  <>
                    <span>•</span>
                    <span>{formatDuration(activeLesson.durationSeconds)}</span>
                  </>
                ) : null}
              </div>

              <h1 className="mt-1 truncate text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                {activeLesson?.title || "Select a lesson"}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!previousLesson}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {activeLesson &&
                !lessonCompleted &&
                (!hasQuiz || !contentCompleted) &&
                (!isVideo ||
                  (isVideo && hasWatchedEnough && !contentCompleted)) && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      markContentCompleteMutation.mutate(activeLesson._id)
                    }
                    disabled={
                      isLocked ||
                      contentCompleted ||
                      markContentCompleteMutation.isPending
                    }
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {contentCompleted
                      ? "Content completed"
                      : markContentCompleteMutation.isPending
                        ? "Saving..."
                        : hasQuiz
                          ? "Mark lesson complete"
                          : "Mark complete"}
                  </Button>
                )}

              {activeLesson && hasQuiz && contentCompleted && !quizPassed && (
                <Button
                  onClick={handleOpenLessonQuiz}
                  disabled={isLocked}
                  className="text-white"
                >
                  <FileQuestion className="h-4 w-4" />
                  Take Quiz
                </Button>
              )}

              {activeLesson && lessonCompleted && (
                <Button variant="outline" disabled>
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={
                  !nextItem || (hasQuiz && contentCompleted && !quizPassed)
                }
                className="text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="container mx-auto">
            {!activeLesson ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="text-center">
                  <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    Select a lesson to begin learning.
                  </p>
                </div>
              </div>
            ) : isLocked ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
                    <Lock className="h-7 w-7 text-slate-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                    Lesson locked
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Complete the required lessons before accessing this content.
                  </p>
                </div>
              </div>
            ) : isVideo ? (
              <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
                  {mediaItem ? (
                    <VideoPlayer
                      media={mediaItem}
                      type={activeLesson.type === "audio" ? "audio" : "video"}
                      showTitle={false}
                      autoplay={false}
                      onProgress={(progress) => {
                        // Debounced save every 10 seconds from VideoPlayer
                        saveProgress(
                          activeLesson._id,
                          progress.watchTimeSeconds,
                          progress.lastPositionSeconds,
                        );

                        // Calculate watch percentage for manual completion threshold
                        if (mediaItem.duration) {
                          const percent =
                            (progress.lastPositionSeconds /
                              mediaItem.duration) *
                            100;
                          setWatchProgress(percent);
                        }
                      }}
                      onComplete={() => {
                        // Immediate final save
                        updatePlaybackMutation.mutate({
                          lessonId: activeLesson._id,
                          watchTimeSeconds: Math.floor(mediaItem.duration || 0),
                          lastPositionSeconds: Math.floor(
                            mediaItem.duration || 0,
                          ),
                        });
                      }}
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center text-slate-400">
                      No media available
                    </div>
                  )}
                </div>

                <div className="mx-auto w-full max-w-4xl space-y-4">
                  <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      {activeLesson.type === "audio" ? (
                        <Headphones className="h-4 w-4 text-purple-500" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="capitalize">
                        {activeLesson.type} lesson
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isArticle ? (
              <div className="bg-[#f6f1e8] px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl space-y-4">
                  <article className="min-h-[calc(100vh-10rem)] bg-white px-6 py-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:bg-slate-900 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
                    {activeLesson.content?.textContent ? (
                      <TextContentRenderer
                        content={activeLesson.content.textContent}
                      />
                    ) : (
                      <p className="text-sm text-slate-500">
                        No article content available.
                      </p>
                    )}
                  </article>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-sm text-slate-500">
                Unsupported lesson type.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const LearningSidebarModule = ({
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
                    "mt-2 w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm cursor-pointer",
                    !isEnrolled || module.quiz.isLockedForUser
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800",
                  )}
                >
                  {!isEnrolled || module.quiz.isLockedForUser ? (
                    <Lock className="h-4 w-4 text-slate-400" />
                  ) : (
                    <BookOpen className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Module Quiz
                  </span>
                  {module.quiz.isPassed ? (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />
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

const CourseQuizSidebarItem = ({
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
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left cursor-pointer",
        isActive
          ? "border-primary/30 bg-primary/10"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
        isLocked && "cursor-not-allowed opacity-60",
      )}
    >
      {isLocked ? (
        <Lock className="h-4 w-4 text-slate-400" />
      ) : (
        <BookOpen className="h-4 w-4 text-primary" />
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Final Course Quiz
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

const SidebarLessonItem = ({
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
  const completed = getLessonCompleted(lesson);
  const hasQuiz = getLessonHasQuiz(lesson);
  const status = getLessonStatus(lesson);

  const icon = isLocked ? (
    <Lock className="h-4 w-4 text-slate-400" />
  ) : lesson.type === "article" ? (
    <FileText className="h-4 w-4 text-green-500" />
  ) : lesson.type === "audio" ? (
    <Headphones className="h-4 w-4 text-purple-500" />
  ) : (
    <PlayCircle className="h-4 w-4 text-blue-500" />
  );

  return (
    <div className="rounded-xl">
      <button
        onClick={onClick}
        disabled={isLocked}
        className={cn(
          "flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transitionv cursor-pointer",
          isActive
            ? "bg-primary/10"
            : "hover:bg-slate-50 dark:hover:bg-slate-800",
          isLocked && "cursor-not-allowed opacity-60 hover:bg-transparent",
        )}
      >
        <div className="mt-0.5 shrink-0">{icon}</div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "line-clamp-2 text-sm font-medium",
              isActive ? "text-primary-light" : "text-slate-700 dark:text-slate-300",
            )}
          >
            {moduleOrder}.{index} {lesson.title}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="capitalize">{lesson.type}</span>
            {lesson.durationSeconds ? (
              <>
                <span>•</span>
                <span>{formatDuration(lesson.durationSeconds)}</span>
              </>
            ) : null}
            {hasQuiz ? (
              <>
                <span>•</span>
                <span>
                  {status === "content-pending"
                    ? "Complete lesson first"
                    : status === "quiz-pending"
                      ? "Quiz pending"
                      : "Quiz passed"}
                </span>
              </>
            ) : null}
          </div>
        </div>

        {completed && !isActive ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
        ) : !completed && hasQuiz ? (
          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
        ) : null}
      </button>

      {hasQuiz && !isLocked && (
        <div className="pl-10 mt-1">
          <button
            onClick={() =>
              router.push(
                `/courses/${courseId}/learn?quizId=${lesson.quiz!._id}`,
              )
            }
            className={cn(
              "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs cursor-pointer",
              lesson.quiz?.isLockedForUser
                ? "pointer-events-none opacity-50 text-slate-400"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800",
            )}
          >
            <FileQuestion className="h-3.5 w-3.5" />
            <span>
              {status === "content-pending"
                ? "Quiz locked until lesson is completed"
                : status === "quiz-pending"
                  ? "Take lesson quiz"
                  : "Review lesson quiz"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const QuizIntroSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl animate-pulse">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-100 via-white to-white px-6 py-10 dark:border-slate-800 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 sm:px-10">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-10 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50"
            >
              <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-6 w-12 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-10">
          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/50">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800"
                />
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <div className="h-10 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-10 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
