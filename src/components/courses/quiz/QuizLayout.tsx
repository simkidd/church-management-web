"use client";

import QuizHeader from "./QuizHeader";
import QuizContent from "./QuizContent";
import QuizSidebar from "./QuizSidebar";
import { useQuiz } from "@/hooks/use-quiz";
import SubmitDialog from "./SubmitDialog";
import TimeExpiredDialog from "./TimeExpiredDialog";
import { useQuizStore } from "@/stores/quiz.store";

export default function QuizLayout({ quizId }: { quizId: string }) {
  const { quiz, questions, isQuizLoading } = useQuiz(quizId);
  const { submitted, timeExpired } = useQuizStore();

  if (isQuizLoading) return <div className="p-8">Loading quiz...</div>;
  if (!quiz || !questions) return <div className="p-8">Quiz not found</div>;

  return (
    <div className="dark:text-gray-100 min-h-screen flex flex-col">
      {!submitted && !timeExpired && <QuizHeader quiz={quiz} />}

      {!submitted && !timeExpired && (
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <QuizContent questions={questions} />
          <QuizSidebar questions={questions} />
        </main>
      )}

      {submitted && <SubmitDialog />}
      {timeExpired && <TimeExpiredDialog />}
    </div>
  );
}
