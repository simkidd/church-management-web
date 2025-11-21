import { ICourse, ListCourseParams } from "@/interfaces/course.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import api from "../axios";
import { IProgress } from "@/interfaces/progress.interface";
import { IExam, IExamByCourseResponse } from "@/interfaces/exam.interface";

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

  // Exam methods
  getExamByCourseId: async (
    courseId: string
  ): Promise<ApiResponse<IExamByCourseResponse>> => {
    const response = await api.get(`/courses/${courseId}/exam`);
    return response.data;
  },

  // Check exam eligibility
  checkExamEligibility: async (
    courseId: string
  ): Promise<
    ApiResponse<{
      canTakeExam: boolean;
      completedLessons: number;
      totalLessons: number;
      progress: number;
      hasExistingSubmission: boolean;
      canRetake: boolean;
      previousScore?: number;
      previousPassed?: boolean;
      examDetails?: {
        title: string;
        duration: number;
        passingScore: number;
        totalQuestions: number;
      };
    }>
  > => {
    const response = await api.get(`/courses/${courseId}/exam/eligibility`);
    return response.data;
  },

  // Submit course exam
  submitCourseExam: async (
    courseId: string,
    data: { answers: { questionId: string; answer: string }[] }
  ): Promise<
    ApiResponse<{
      submission: {
        id: string;
        score: number;
        percentage: number;
        isPassed: boolean;
        isGraded: boolean;
        maxScore: number;
        submittedAt: string;
      };
      message: string;
    }>
  > => {
    const response = await api.post(`/courses/${courseId}/exam/submit`, data);
    return response.data;
  },

  getExamResults: async (courseId: string) => {
    const response = await api.get(`/courses/${courseId}/exam/results`);
    return response.data;
  },
};

export default courseApi;
