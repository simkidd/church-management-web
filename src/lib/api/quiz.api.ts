import { IQuizByIdResponse } from "@/interfaces/quiz.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import api from "../axios";
import { SubmitAnswersResponse } from "@/hooks/use-quiz";

export const quizApi = {
  // get quiz by id
  getQuizById: async (
    quizId: string
  ): Promise<ApiResponse<IQuizByIdResponse>> => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  // submit quiz
  attemptQuiz: async (payload: {
    quizId: string;
    answers: Record<string, number>;
  }): Promise<ApiResponse<SubmitAnswersResponse>> => {
    const response = await api.post(
      `/quizzes/${payload.quizId}/attempt`,
      payload
    );
    return response.data;
  },
};
