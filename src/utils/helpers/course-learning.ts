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

  return hasQuiz ? contentCompleted && quizPassed : contentCompleted;
};

export const getLessonStatus = (lesson: ILessonWithState) => {
  const hasQuiz = getLessonHasQuiz(lesson);
  const contentCompleted = getLessonContentCompleted(lesson);
  const quizPassed = getLessonQuizPassed(lesson);
  const completed = getLessonCompleted(lesson);

  const lessonLocked = lesson.isLockedForUser;
  const quizLocked = lesson.quiz?.isLockedForUser;

  // 🔒 Highest priority
  if (lessonLocked) return "locked";

  // ✅ Fully completed
  if (completed) return "completed";

  // ⏳ Content not completed
  if (!contentCompleted) return "content-pending";

  // 📝 Quiz logic
  if (hasQuiz) {
    if (quizLocked) return "quiz-locked";
    if (!quizPassed) return "quiz-pending";
  }

  // ✅ No quiz + content done
  return "completed";
};

export const countCompletedLessons = (lessons: ILessonWithState[] = []) =>
  lessons.filter(getLessonCompleted).length;

export const areAllModuleLessonsCompleted = (module: IModuleWithState) =>
  (module.lessons ?? []).length > 0 &&
  (module.lessons ?? []).every(getLessonCompleted);
