import progressApi from "@/lib/api/progress.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useMyCourseProgress = (courseId: string) => {
  return useQuery({
    queryKey: ["my-course-progress", courseId],
    queryFn: () => progressApi.getMyCourseProgress(courseId),
    enabled: !!courseId,
  });
};

export const useMarkLessonComplete = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: progressApi.markLessonComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-modules", courseId] });
      queryClient.invalidateQueries({
        queryKey: ["my-course-progress", courseId],
      });
    },
  });
};

export const useUpdatePlaybackProgress = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      payload,
    }: {
      lessonId: string;
      payload: Parameters<typeof progressApi.updatePlaybackProgress>[1];
    }) => progressApi.updatePlaybackProgress(lessonId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-modules", courseId] });
    },
  });
};
