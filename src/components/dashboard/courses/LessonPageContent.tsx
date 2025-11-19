"use client";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useProgress from "@/hooks/use-progress";
import { ICourse } from "@/interfaces/course.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import courseApi from "@/lib/api/course.api";
import { formatDuration } from "@/utils/helpers/time";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  FileText,
  Award,
  BarChart3,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import LessonSkeleton from "./lesson/LessonSkeleton";
import { CourseProgress } from "./CourseProgress";
import CompletionCard from "./lesson/CompletionCard";
import ExamCard from "./lesson/ExamCard";
import LessonContent from "./lesson/LessonContent";
import LessonHeader from "./lesson/LessonHeader";
import LessonNavigation from "./lesson/LessonNavigation";
import QuickNavigation from "./lesson/QuickNavigation";
import VideoPlayer from "./lesson/VideoPlayer";

const LessonPageContent = ({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) => {
  const router = useRouter();
  const [videoProgress, setVideoProgress] = useState(0);

  const {
    data: courseData,
    isPending,
    error,
  } = useQuery<ApiResponse<ICourse>>({
    queryKey: ["course", courseId],
    queryFn: () => courseApi.getCourseById(courseId),
  });

  const { progress, markLessonComplete, isMarkingComplete } =
    useProgress(courseId);

  const course = courseData?.data;
  const currentLesson = course?.lessons?.find(
    (lesson) => lesson._id === lessonId
  );
  const currentLessonIndex =
    course?.lessons?.findIndex((lesson) => lesson._id === lessonId) || 0;

  // Check if lesson is completed by verifying both existence and isCompleted flag
  const isCompleted = progress?.lessonsProgress?.some(
    (lp) => lp.lessonId.toString() === lessonId.toString() && lp.isCompleted
  );

  // Check if all lessons are completed
  const allLessonsCompleted = course?.lessons?.every((lesson) =>
    progress?.lessonsProgress?.some(
      (lp) => lp.lessonId.toString() === lesson._id.toString() && lp.isCompleted
    )
  );

  // Check if this is the last lesson
  const isLastLesson =
    currentLessonIndex === (course?.lessons?.length || 0) - 1;

  const handleMarkComplete = useCallback(() => {
    if (!isCompleted) {
      markLessonComplete(lessonId);
      toast.success("Lesson marked as complete!", {
        duration: 2000,
      });

      // Auto-advance to next lesson if not the last lesson
      const nextLesson = course?.lessons?.[currentLessonIndex + 1];
      if (nextLesson) {
        setTimeout(() => {
          router.push(
            `/dashboard/courses/${courseId}/lessons/${nextLesson._id}`
          );
        }, 1500);
      }
    }
  }, [
    isCompleted,
    lessonId,
    markLessonComplete,
    course?.lessons,
    currentLessonIndex,
    courseId,
    router,
  ]);

  const goToNextLesson = useCallback(() => {
    const nextLesson = course?.lessons?.[currentLessonIndex + 1];
    if (nextLesson) {
      router.push(`/dashboard/courses/${courseId}/lessons/${nextLesson._id}`);
    } else {
      // If it's the last lesson, go to course overview
      router.push(`/dashboard/courses/${courseId}`);
    }
  }, [course?.lessons, currentLessonIndex, courseId, router]);

  const goToPreviousLesson = useCallback(() => {
    const prevLesson = course?.lessons?.[currentLessonIndex - 1];
    if (prevLesson) {
      router.push(`/dashboard/courses/${courseId}/lessons/${prevLesson._id}`);
    } else {
      router.push(`/dashboard/courses/${courseId}`);
    }
  }, [course?.lessons, currentLessonIndex, courseId, router]);

  const handleTakeExam = useCallback(() => {
    router.push(`/dashboard/courses/${courseId}/exam`);
  }, [courseId, router]);

  const handleVideoProgress = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;
    if (video.duration > 0) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
    }
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
        case "k":
          // Space or K to toggle play/pause on video
          e.preventDefault();
          const video = document.querySelector("video");
          if (video) {
            if (video.paused) video.play();
            else video.pause();
          }
          break;

        case "c":
          if (e.ctrlKey || e.metaKey) {
            // Ctrl+C or Cmd+C to mark complete
            e.preventDefault();
            if (!isCompleted) {
              handleMarkComplete();
            }
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          goToNextLesson();
          break;

        case "ArrowLeft":
          e.preventDefault();
          goToPreviousLesson();
          break;

        case "m":
          // M to toggle mute
          e.preventDefault();
          const videoElement = document.querySelector("video");
          if (videoElement) {
            videoElement.muted = !videoElement.muted;
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isCompleted, handleMarkComplete, goToNextLesson, goToPreviousLesson]);

  // Progress milestone celebrations
  useEffect(() => {
    if (isCompleted && progress) {
      const completedCount = progress.lessonsProgress.filter(
        (lp) => lp.isCompleted
      ).length;
      const totalLessons = course?.lessons?.length || 0;

      // Celebrate milestones
      if (completedCount === totalLessons) {
        toast.success("🎉 All Lessons Completed!", {
          description: "You're now ready to take the course exam!",
          duration: 5000,
        });
      } else if (completedCount === Math.floor(totalLessons / 2)) {
        toast.success("🌟 Halfway There!", {
          description: `You've completed ${completedCount} of ${totalLessons} lessons`,
          duration: 3000,
        });
      } else if (completedCount === 1) {
        toast.success("🚀 Great Start!", {
          description: "You've completed your first lesson!",
          duration: 2000,
        });
      }
    }
  }, [isCompleted, progress, course?.lessons?.length]);

  if (isPending) {
    return <LessonSkeleton />;
  }

  if (!currentLesson || error) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Lesson Not Found"
        description="The lesson you're looking for doesn't exist or you don't have access to it."
        action={
          <Button asChild>
            <Link href={`/dashboard/courses/${courseId}`}>Back to Course</Link>
          </Button>
        }
      />
    );
  }

  const totalLessons = course?.lessons?.length || 0;
  const completedLessons =
    progress?.lessonsProgress?.filter((lp) => lp.isCompleted).length || 0;
  const nextLesson = course?.lessons?.[currentLessonIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousLesson}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold truncate max-w-md">
                  {course?.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Lesson {currentLessonIndex + 1} of {totalLessons}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium">Course Progress</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BarChart3 className="h-3 w-3" />
                  {completedLessons} of {totalLessons} lessons
                </div>
              </div>
              <Progress
                value={progress?.overallProgress || 0}
                className="w-24 hidden sm:block"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <LessonHeader
              course={course}
              currentLesson={currentLesson}
              currentLessonIndex={currentLessonIndex}
              totalLessons={totalLessons}
              progress={progress}
              completedLessons={completedLessons}
            />

            <VideoPlayer
              currentLesson={currentLesson}
              videoProgress={videoProgress}
              onVideoProgress={handleVideoProgress}
            />

            <LessonContent currentLesson={currentLesson} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CompletionCard
              isCompleted={isCompleted!}
              isMarkingComplete={isMarkingComplete}
              videoProgress={videoProgress}
              currentLesson={currentLesson}
              onMarkComplete={handleMarkComplete}
            />

            {allLessonsCompleted && <ExamCard onTakeExam={handleTakeExam} />}

            <LessonNavigation
              currentLessonIndex={currentLessonIndex}
              isLastLesson={isLastLesson}
              allLessonsCompleted={allLessonsCompleted!}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
              nextLesson={nextLesson!}
              courseId={courseId}
              onPreviousLesson={goToPreviousLesson}
              onNextLesson={goToNextLesson}
            />

            <CourseProgress
              completedLessons={completedLessons}
              totalLessons={totalLessons}
            />

            <QuickNavigation
              course={course}
              courseId={courseId}
              currentLessonId={lessonId}
              progress={progress}
              markLessonComplete={markLessonComplete}
              isMarkingComplete={isMarkingComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPageContent;
