"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileQuestion,
  Headphones,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ICourse } from "@/interfaces/course.interface";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";
import { IProgressStats } from "@/interfaces/progress.interface";
import { IQuizSummary } from "@/interfaces/quiz.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";

import courseApi from "@/lib/api/course.api";
import progressApi from "@/lib/api/progress.api";
import { quizApi } from "@/lib/api/quiz.api";
import { useCourseLearningStore } from "@/stores/course-learning.store";
import {
  countCompletedLessons,
  getLessonContentCompleted,
  getLessonHasQuiz,
  getLessonQuizPassed,
} from "@/utils/helpers/course-learning";
import { calculateReadTime, formatDuration } from "@/utils/helpers/time";

import { Button } from "@/components/ui/button";
import VideoPlayer from "../../sermons/VideoPlayer";
import TextContentRenderer from "../../shared/TextContentRenderer";
import QuizIntroCard from "../quiz/QuizIntroCard";
import { CourseLearningSidebar } from "./CourseLearningSidebar";
import CourseLearningSkeleton from "./CourseLearningSkeleton";

const CourseLearning = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const lessonId = searchParams.get("lessonId");
  const quizId = searchParams.get("quizId");

  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [watchProgress, setWatchProgress] = useState(0);

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
    course,
    getNextModuleFirstLesson,
  } = useCourseLearningStore();

  const { data, isPending } = useQuery<
    ApiResponse<{
      course: ICourse;
      enrolled: { isEnrolled: boolean; status?: string | null };
      progress: IProgressStats;
      modules: IModuleWithState[];
      quiz: IQuizSummary | null;
    }>
  >({
    queryKey: ["course-learning", courseId],
    queryFn: () => courseApi.getCourseModules(courseId),
    enabled: !!courseId,
  });

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
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["course-learning", courseId],
    //   });
    // },
    // onError: (error: AxiosError<ApiErrorResponse>) => {
    //   toast.error("Failed to update playback progress", {
    //     description: error.response?.data?.message,
    //   });
    // },
  });

  const saveProgress = (
    lessonIdValue: string,
    watchTime: number,
    position: number,
  ) => {
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }

    progressTimeoutRef.current = setTimeout(() => {
      updatePlaybackMutation.mutate({
        lessonId: lessonIdValue,
        watchTimeSeconds: Math.floor(watchTime),
        lastPositionSeconds: Math.floor(position),
      });
    }, 1000);
  };

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
  const courseCompleted = !!progress?.courseCompleted;

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
      return;
    }

    if (nextItem.type === "certificate") {
      router.push(`/courses/${courseId}/certificate`);
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
    if (activeLesson) {
      router.replace(`/courses/${courseId}/learn?lessonId=${activeLesson._id}`);
    } else {
      router.replace(`/courses/${courseId}/learn`);
    }
  };

  const quizState = quizId
    ? useCourseLearningStore.getState().quizStates[quizId]
    : null;
  const hasPassedActiveQuiz = quizState?.lastAttempt?.passed ?? false;

  let nextQuizAction: { type: string; label: string; href: string } | null =
    null;

  if (quizId && hasPassedActiveQuiz) {
    const isLessonQuiz = activeLesson?.quiz?._id === quizId;
    const isModuleQuiz = currentModuleData?.quiz?._id === quizId;
    const isCourseQuiz = courseQuiz?._id === quizId;

    if (isLessonQuiz && activeLesson) {
      const nextLesson = nextAfterLesson(activeLesson._id);

      if (nextLesson?.type === "lesson") {
        nextQuizAction = {
          type: "lesson",
          label: "Next Lesson",
          href: `/courses/${courseId}/learn?lessonId=${nextLesson.id}`,
        };
      } else if (nextLesson?.type === "module-quiz") {
        nextQuizAction = {
          type: "module-quiz",
          label: "Module Assessment",
          href: `/courses/${courseId}/learn?quizId=${nextLesson.id}`,
        };
      } else if (nextLesson?.type === "course-quiz") {
        nextQuizAction = {
          type: "course-quiz",
          label: "Final Assessment",
          href: `/courses/${courseId}/learn?quizId=${nextLesson.id}`,
        };
      } else if (nextLesson?.type === "certificate" && courseCompleted) {
        nextQuizAction = {
          type: "certificate",
          label: "View Certificate",
          href: `/courses/${courseId}/certificate`,
        };
      }
    } else if (isModuleQuiz && currentModuleData) {
      const nextModuleLesson = getNextModuleFirstLesson(currentModuleData._id);

      if (nextModuleLesson) {
        nextQuizAction = {
          type: "lesson",
          label: "Next Module",
          href: `/courses/${courseId}/learn?lessonId=${nextModuleLesson._id}`,
        };
      } else if (courseQuiz && !courseQuiz.isPassed) {
        nextQuizAction = {
          type: "course-quiz",
          label: "Final Assessment",
          href: `/courses/${courseId}/learn?quizId=${courseQuiz._id}`,
        };
      } else if (courseCompleted) {
        nextQuizAction = {
          type: "certificate",
          label: "View Certificate",
          href: `/courses/${courseId}/certificate`,
        };
      }
    } else if (isCourseQuiz && courseCompleted) {
      nextQuizAction = {
        type: "certificate",
        label: "View Certificate",
        href: `/courses/${courseId}/certificate`,
      };
    }
  }

  const showMarkCompleteButton =
    !!activeLesson &&
    !isLocked &&
    !contentCompleted &&
    (!isVideo || hasWatchedEnough);

  const showTakeQuizButton =
    !!activeLesson && !isLocked && hasQuiz && contentCompleted && !quizPassed;

  const showCompletedButton =
    !!activeLesson &&
    (hasQuiz ? contentCompleted && quizPassed : contentCompleted);

  const formatLessonMetaDuration = (lesson?: ILessonWithState | null) => {
    if (!lesson?.durationSeconds) return null;

    if (lesson.type === "article") {
      return calculateReadTime(lesson.content?.textContent);
    }

    return formatDuration(lesson.durationSeconds);
  };

  return (
    <div className="flex h-full min-h-0 bg-[#f6f1e8] dark:bg-slate-950">
      <aside className="hidden h-full w-[360px] shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
        <CourseLearningSidebar
          course={currentCourse}
          courseId={courseId}
          modules={modules}
          openModules={openModules}
          toggleModule={toggleModule}
          activeLessonId={activeLesson?._id}
          activeQuizId={quizId}
          isEnrolled={isEnrolled}
          progressPercentage={progressPercentage}
          completedLessons={completedLessons}
          totalLessonCount={totalLessonCount}
          courseQuiz={courseQuiz}
          courseCompleted={courseCompleted}
          onSelectLesson={handleSelectLesson}
        />
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {quizId ? (
          <>
            <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseQuizIntro}
                  className="text-slate-500"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
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
                  hasNextLesson={!!nextQuizAction}
                  nextLessonTitle={nextQuizAction?.label}
                  onNextLesson={() => {
                    if (nextQuizAction) {
                      router.push(nextQuizAction.href);
                    }
                  }}
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
          </>
        ) : (
          <>
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
                    {formatLessonMetaDuration(activeLesson) ? (
                      <>
                        <span>•</span>
                        <span>{formatLessonMetaDuration(activeLesson)}</span>
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

                  {showMarkCompleteButton && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        markContentCompleteMutation.mutate(activeLesson._id)
                      }
                      disabled={markContentCompleteMutation.isPending}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {markContentCompleteMutation.isPending
                        ? "Saving..."
                        : hasQuiz
                          ? "Mark lesson complete"
                          : "Mark complete"}
                    </Button>
                  )}

                  {showTakeQuizButton && (
                    <Button onClick={handleOpenLessonQuiz} disabled={isLocked}>
                      <FileQuestion className="h-4 w-4" />
                      Take Quiz
                    </Button>
                  )}

                  {showCompletedButton && (
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
                  >
                    {nextItem?.type === "certificate" ? (
                      <>
                        <Award className="mr-1 h-4 w-4" />
                        Certificate
                      </>
                    ) : nextItem?.type === "module-quiz" ? (
                      <>
                        Module Quiz
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : nextItem?.type === "course-quiz" ? (
                      <>
                        Final Quiz
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto ">
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
                        Complete the previous lesson and its assessment to
                        unlock.
                      </p>
                    </div>
                  </div>
                ) : isVideo ? (
                  <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                    <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
                      {mediaItem ? (
                        <VideoPlayer
                          media={mediaItem}
                          type={
                            activeLesson.type === "audio" ? "audio" : "video"
                          }
                          showTitle={false}
                          autoplay={false}
                          onProgress={(videoProgress) => {
                            saveProgress(
                              activeLesson._id,
                              videoProgress.watchTimeSeconds,
                              videoProgress.lastPositionSeconds,
                            );

                            if (mediaItem.duration) {
                              const percent =
                                (videoProgress.lastPositionSeconds /
                                  mediaItem.duration) *
                                100;
                              setWatchProgress(percent);
                            }
                          }}
                          onComplete={() => {
                            updatePlaybackMutation.mutate({
                              lessonId: activeLesson._id,
                              watchTimeSeconds: Math.floor(
                                mediaItem.duration || 0,
                              ),
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
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
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
          </>
        )}
      </main>
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
