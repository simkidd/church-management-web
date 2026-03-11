import { IQuiz, IQuizAttempt, SubmitAnswersResponse } from "@/interfaces/quiz.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import api from "../axios";

export const quizApi = {
  // get quiz by id
  getQuizById: async (quizId: string): Promise<ApiResponse<IQuiz>> => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  // submit quiz
  attemptQuiz: async (payload: {
    quizId: string;
    answers: Array<{ questionId: string; selectedOptions: string[] }>;
  }): Promise<ApiResponse<SubmitAnswersResponse>> => {
    const response = await api.post(
      `/quizzes/${payload.quizId}/attempt`,
      payload,
    );
    return response.data;
  },

  // get quiz attempt (latest)
  getQuizAttemptById: async (
    attemptId: string,
  ): Promise<
    ApiResponse<{
      attempt: IQuizAttempt;
      attemptsLeft: number;
    }>
  > => {
    const response = await api.get(`/quizzes/quiz-attempts/${attemptId}`);
    return response.data;
  },

  getQuizByModule: async (
    moduleId: string,
  ): Promise<
    ApiResponse<
      IQuiz & {
        isLockedForUser: boolean;
        lastAttempt: {
          _id: string;
          score: number;
          percentage: number;
          passed: boolean;
          status: string;
        } | null;
      }
    >
  > => {
    const { data } = await api.get(`/quizzes/module/${moduleId}`);
    return data;
  },
};
