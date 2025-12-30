import { ICourse, ListCourseParams } from "@/interfaces/course.interface";
import { IModuleWithLessons } from "@/interfaces/module.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import api from "../axios";
import { IProgressStats } from "@/interfaces/progress.interface";
import { IMarkLessonCompleteResponse } from "@/interfaces/lesson.interface";

export const courseApi = {
  //  GET all courses
  getAllCourses: async (
    params?: ListCourseParams
  ): Promise<ApiResponse<PaginatedResponse<ICourse>>> => {
    const response = await api.get("/courses", { params });
    return response.data;
  },

  // GET single course by ID
  getCourseById: async (id: string): Promise<ApiResponse<ICourse>> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // // get course progress
  // getCourseProgress: async (id: string): Promise<ApiResponse<IProgress>> => {
  //   const response = await api.get(`/courses/${id}/progress`);
  //   return response.data;
  // },

  // //enroll in course
  // enrollInCourse: async (id: string): Promise<ApiResponse<IProgress>> => {
  //   const response = await api.post(`/courses/${id}/enroll`);
  //   return response.data;
  // },

  // mark as complete
  markLessonComplete: async (
    lessonId: string
  ): Promise<ApiResponse<IMarkLessonCompleteResponse>> => {
    const response = await api.post(
      `/lessons/${lessonId}/complete`
    );
    return response.data;
  },

  // get course modules
  getCourseModules: async (
    courseId: string
  ): Promise<
    ApiResponse<{
      course: ICourse;
      progress: IProgressStats;
      modules: IModuleWithLessons[];
    }>
  > => {
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  },
};

export default courseApi;
