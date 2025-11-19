"use client";

import { IProgress } from "@/interfaces/progress.interface";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";
import courseApi from "@/lib/api/course.api";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useProgress = (courseId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuthStore();

  // Get progress data
  const {
    data,
    isPending: progressPending,
    error: progressError,
  } = useQuery<ApiResponse<IProgress>>({
    queryKey: ["progress", "current-user", courseId],
    queryFn: () => courseApi.getCourseProgress(courseId),
    enabled: !!courseId && !!user,
  });

  // Enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: () => courseApi.enrollInCourse(courseId),
    onSuccess: (response: ApiResponse<IProgress>) => {
      // Invalidate and refetch progress
      queryClient.invalidateQueries({
        queryKey: ["progress", "current-user", courseId],
      });
      // Invalidate course to update enrolled students count
      queryClient.invalidateQueries({
        queryKey: ["course", courseId],
      });
      // Invalidate user's courses list
      queryClient.invalidateQueries({
        queryKey: ["my-courses"],
      });

      // Optional: Redirect to first lesson or show success message
      console.log("Enrolled successfully:", response.data);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error("Enrollment failed:", error);
      // You can add toast notification here
    },
  });

  // Mark lesson complete mutation
  const markCompleteMutation = useMutation({
    mutationFn: (lessonId: string) =>
      courseApi.markLessonComplete(courseId, lessonId),
    onSuccess: (response: ApiResponse<IProgress>) => {
      // Invalidate and refetch progress
      queryClient.invalidateQueries({
        queryKey: ["progress", "current-user", courseId],
      });
      console.log("Lesson marked complete:", response.data);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error("Failed to mark lesson complete:", error);
      // You can add toast notification here
    },
  });

  const progress = data?.data;

  // Helper properties for easier consumption
  const isEnrolled = !!progress;
  const overallProgress = progress?.overallProgress || 0;
  const completedLessons =
    progress?.lessonsProgress?.filter((lp) => lp.isCompleted).length || 0;
  const totalLessons = progress?.lessonsProgress?.length || 0;

  return {
    // Progress data
    progress,
    isEnrolled,
    overallProgress,
    completedLessons,
    totalLessons,

    // Loading states
    isPending: progressPending,
    progressError,

    // Mutations
    enrollInCourse: enrollMutation.mutate,
    enrollInCourseAsync: enrollMutation.mutateAsync,
    isEnrolling: enrollMutation.isPending,

    markLessonComplete: markCompleteMutation.mutate,
    markLessonCompleteAsync: markCompleteMutation.mutateAsync,
    isMarkingComplete: markCompleteMutation.isPending,
  };
};

export default useProgress;
