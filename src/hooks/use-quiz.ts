"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { quizApi } from "@/lib/api/quiz.api";
import {
  IQuizByIdResponse,
  IQuizAttempt,
  IQuizQuestion,
} from "@/interfaces/quiz.interface";
import { ApiResponse } from "@/interfaces/response.interface";

interface SubmitAnswersInput {
  quizId: string;
  answers: Record<string, number>; // questionId → selected option index
}

export interface SubmitAnswersResponse {
  attempt: string; // attempt ID
  score: number;
  passed: boolean;
  attemptsLeft: number;
}

export function useQuiz(quizId: string) {
  const queryClient = useQueryClient();

  // Fetch quiz
  const quizQuery = useQuery<ApiResponse<IQuizByIdResponse>>({
    queryKey: ["quiz", quizId],
    queryFn: () => quizApi.getQuizById(quizId),
    enabled: !!quizId,
  });

  // Submit quiz answers
  const submitQuiz = useMutation({
    mutationFn: quizApi.attemptQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
    },
  });

  return {
    quiz: quizQuery.data?.data.quiz,
    questions: quizQuery.data?.data.questions as IQuizQuestion[] | undefined,
    isQuizLoading: quizQuery.isLoading,
    submitQuiz: submitQuiz.mutate,
    isSubmitting: submitQuiz.isPending,
    submitResult: submitQuiz.data?.data,
  };
}
