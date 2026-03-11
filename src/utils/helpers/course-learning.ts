import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";

export const getLessonContentCompleted = (lesson: ILessonWithState) =>
  !!lesson.progress?.contentCompleted;

export const getLessonQuizPassed = (lesson: ILessonWithState) =>
  !!lesson.progress?.quizPassed || !!lesson.quiz?.isPassed;

export const getLessonHasQuiz = (lesson: ILessonWithState) => !!lesson.quiz;

export const getLessonCompleted = (lesson: ILessonWithState) => {
  const contentCompleted = getLessonContentCompleted(lesson);
  const hasQuiz = getLessonHasQuiz(lesson);
  const quizPassed = getLessonQuizPassed(lesson);

  return (
    !!lesson.isCompleted ||
    (hasQuiz ? contentCompleted && quizPassed : contentCompleted)
  );
};

export const getLessonStatus = (lesson: ILessonWithState) => {
  const hasQuiz = getLessonHasQuiz(lesson);
  const contentCompleted = getLessonContentCompleted(lesson);
  const quizPassed = getLessonQuizPassed(lesson);
  const completed = getLessonCompleted(lesson);

  if (completed) return "completed";
  if (!hasQuiz && !contentCompleted) return "content-pending";
  if (!hasQuiz && contentCompleted) return "completed";
  if (hasQuiz && !contentCompleted) return "content-pending";
  if (hasQuiz && contentCompleted && !quizPassed) return "quiz-pending";

  return "completed";
};

export const countCompletedLessons = (lessons: ILessonWithState[] = []) =>
  lessons.filter(getLessonCompleted).length;

export const areAllModuleLessonsCompleted = (module: IModuleWithState) =>
  (module.lessons ?? []).length > 0 &&
  (module.lessons ?? []).every(getLessonCompleted);
