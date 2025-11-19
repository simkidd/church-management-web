import {
  ExamSubmissionData,
  IExam,
  IExamResult,
  IExamSubmission,
  ListExamsParams
} from "@/interfaces/exam.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import api from "../axios";

export const examsApi = {
  // Get all exams
  getExams: async (
    params?: ListExamsParams
  ): Promise<ApiResponse<PaginatedResponse<IExam>>> => {
    const response = await api.get("/exams", { params });
    return response.data;
  },

  // Get exam by ID
  getExamById: async (id: string): Promise<ApiResponse<IExam>> => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  },

  // Submit exam
  submitExam: async (
    id: string,
    data: ExamSubmissionData
  ): Promise<
    ApiResponse<{
      submission: IExamSubmission;
    }>
  > => {
    const response = await api.post(`/exams/${id}/submit`, data);
    return response.data;
  },

  // Get exam results
  getExamResults: async (
    id: string
  ): Promise<
    ApiResponse<{
      results: IExamResult;
    }>
  > => {
    const response = await api.get(`/exams/${id}/results`);
    return response.data;
  },

  // Get my submission
  getMySubmission: async (
    id: string
  ): Promise<
    ApiResponse<{
      submission: IExamSubmission;
    }>
  > => {
    const response = await api.get(`/exams/${id}/my-submission`);
    return response.data;
  },
};

export default examsApi;
