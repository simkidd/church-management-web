import { ApiResponse } from "@/interfaces/response.interface";
import { IProgress, IProgressStats } from "@/interfaces/progress.interface";
import api from "@/lib/axios";

const progressApi = {
  // GET /api/progress/courses/:courseId/me
  getMyCourseProgress: async (
    courseId: string,
  ): Promise<
    ApiResponse<{
      progress: {
        overallPercentage: number;
        courseCompleted: boolean;
        completedAt: string | null;
        lastAccessedLesson: string | null;
      };
      lessons: Array<{
        lesson: string;
        module: string;
        title: string;
        order: number;
        contentCompleted: boolean;
        quizPassed: boolean;
        completed: boolean;
        completedAt: string | null;
        watchTimeSeconds: number;
        lastPositionSeconds: number;
      }>;
      modules: Array<{
        module: string;
        title: string;
        order: number;
        lessonsCompleted: boolean;
        quizPassed: boolean;
        completed: boolean;
        completedAt: string | null;
      }>;
    }>
  > => {
    const { data } = await api.get(`/progress/courses/${courseId}/me`);
    return data;
  },

  // PATCH /api/progress/lessons/:lessonId/content-complete
  markLessonComplete: async (
    lessonId: string,
  ): Promise<
    ApiResponse<{
      lessonId: string;
      contentCompleted: boolean;
      completed: boolean;
      nextLessonId?: string;
    }>
  > => {
    const { data } = await api.patch(
      `/progress/lessons/${lessonId}/content-complete`,
    );
    return data;
  },

  // PATCH /api/progress/lessons/:lessonId/playback
  updatePlaybackProgress: async (
    lessonId: string,
    payload: {
      watchTimeSeconds?: number;
      lastPositionSeconds?: number;
    },
  ): Promise<
    ApiResponse<{
      lessonId: string;
      watchTimeSeconds: number;
      lastPositionSeconds: number;
    }>
  > => {
    const { data } = await api.patch(
      `/progress/lessons/${lessonId}/playback`,
      payload,
    );
    return data;
  },
};

export default progressApi;
