import QuizPageContent from "@/components/courses/quiz/QuizPageContent";
import React from "react";

const QuizPage = async({
  params,
}: {
  params: Promise<{ courseId: string; quizId: string }>;
}) => {
  const { courseId, quizId } = await params;

  return <QuizPageContent courseId={courseId} quizId={quizId} />;
};

export default QuizPage;
