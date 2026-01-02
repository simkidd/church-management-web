import QuizLayout from "@/components/courses/quiz/QuizLayout";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  return <QuizLayout quizId={quizId} />;
}
