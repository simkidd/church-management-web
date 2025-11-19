import { ICourse, ListCourseParams } from "@/interfaces/course.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import api from "../axios";
import { IProgress } from "@/interfaces/progress.interface";

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

  // get course progress
  getCourseProgress: async (id: string): Promise<ApiResponse<IProgress>> => {
    const response = await api.get(`/courses/${id}/progress`);
    return response.data;
  },

  //enroll in course
  enrollInCourse: async (id: string): Promise<ApiResponse<IProgress>> => {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  },

  // mark as complete
  markLessonComplete: async (
    id: string,
    lessonId: string
  ): Promise<ApiResponse<IProgress>> => {
    const response = await api.post(
      `/courses/${id}/lessons/${lessonId}/complete`
    );
    return response.data;
  },
};

export default courseApi;
