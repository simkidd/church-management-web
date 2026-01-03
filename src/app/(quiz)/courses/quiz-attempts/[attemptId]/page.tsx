import ResultPageComp from "@/components/courses/quiz/ResultPageComp";
import { quizApi } from "@/lib/api/quiz.api";
import React from "react";

const ResultPage = async ({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) => {
  const { attemptId } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 py-12 transition-colors duration-300">
      <ResultPageComp attemptId={attemptId} />
    </div>
  );
};

export default ResultPage;
