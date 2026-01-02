"use client";

import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import QuizSidebar from "./QuizSidebar";
import { useQuiz } from "@/hooks/use-quiz";

export default function QuizLayout({ quizId }: { quizId: string }) {
  const { quiz, questions, isQuizLoading } = useQuiz(quizId);

  if (isQuizLoading) return <div className="p-8">Loading quiz...</div>;
  if (!quiz || !questions) return <div className="p-8">Quiz not found</div>;

  return (
    <div className="dark:text-gray-100 min-h-screen flex flex-col">
      <QuizHeader quiz={quiz} />

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <QuizContent questions={questions} />
        <QuizSidebar questions={questions} />
      </main>
    </div>
  );
}
