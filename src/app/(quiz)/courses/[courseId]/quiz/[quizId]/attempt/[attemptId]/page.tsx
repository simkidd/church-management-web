import QuizAttemptPageContent from "@/components/courses/quiz/QuizAttemptPageContent";

export default async function QuizAttemptPage({
  params,
}: {
  params: Promise<{
    courseId: string;
    quizId: string;
    attemptId: string;
  }>;
}) {
  const { courseId, quizId, attemptId } = await params;

  return (
    <QuizAttemptPageContent
      courseId={courseId}
      quizId={quizId}
      attemptId={attemptId}
    />
  );
}
