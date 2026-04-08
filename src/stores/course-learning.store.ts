import { create } from "zustand";
import { ICourse } from "@/interfaces/course.interface";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";
import { IProgressStats } from "@/interfaces/progress.interface";
import {
  areAllModuleLessonsCompleted,
  getLessonCompleted,
  getLessonContentCompleted,
  getLessonHasQuiz,
  getLessonQuizPassed,
} from "@/utils/helpers/course-learning";
import { IQuizAttempt, IQuizSummary } from "@/interfaces/quiz.interface";

type NextPlayableItem =
  | { type: "lesson"; id: string }
  | { type: "lesson-quiz"; id: string }
  | { type: "module-quiz"; id: string }
  | { type: "course-quiz"; id: string }
  | { type: "certificate"; id: string };

interface QuizState {
  attemptsUsed: number;
  attemptsLeft: number;
  lastAttempt: IQuizAttempt | null;
  isLoading: boolean;
}

interface CourseLearningCourse extends ICourse {
  quiz?: IQuizSummary | null;
}

interface CourseLearningState {
  course: CourseLearningCourse | null;
  modules: IModuleWithState[];
  progress: IProgressStats | null;
  isEnrolled: boolean;
  activeLesson: ILessonWithState | null;
  openModules: Record<string, boolean>;

  // Quiz state
  activeQuizId: string | null;
  quizStates: Record<string, QuizState>;

  setCourseData: (data: {
    course: ICourse;
    modules: IModuleWithState[];
    progress: IProgressStats;
    enrolled: { isEnrolled: boolean };
    quiz?: IQuizSummary | null;
    preferredLessonId?: string;
  }) => void;

  setActiveLesson: (lesson: ILessonWithState | null) => void;
  setActiveLessonById: (lessonId: string | null | undefined) => void;
  initializeActiveLesson: (lessonId?: string | null) => void;
  toggleModule: (moduleId: string) => void;
  openModule: (moduleId: string) => void;
  closeModule: (moduleId: string) => void;
  resetCourseLearning: () => void;

  flatLessons: () => ILessonWithState[];
  getLessonById: (lessonId: string) => ILessonWithState | null;
  getModuleByLessonId: (lessonId: string) => IModuleWithState | undefined;
  currentModule: () => IModuleWithState | undefined;
  lessonIndex: () => number;
  currentLessonPosition: () => number;
  totalLessons: () => number;

  // Updated nextPlayable that enforces the strict flow
  nextPlayable: () => NextPlayableItem | null;

  // Get next item after specific lesson (for quiz flow)
  nextAfterLesson: (lessonId: string) => NextPlayableItem | null;

  previousPlayableLesson: () => ILessonWithState | null;
  isFirstLesson: () => boolean;
  isLastLesson: () => boolean;

  // Quiz actions
  setActiveQuiz: (quizId: string | null) => void;
  setQuizState: (quizId: string, state: Partial<QuizState>) => void;
  clearQuizState: (quizId?: string) => void;

  // Quiz helpers
  hasPassedQuiz: (quizId: string) => boolean;
  canAttemptQuiz: (quizId: string, maxAttempts: number) => boolean;
  getQuizAttemptsUsed: (quizId: string) => number;
  isQuizLocked: (quizId: string, maxAttempts: number) => boolean;

  // Module helpers
  isModuleCompleted: (moduleId: string) => boolean;
  isCourseCompleted: () => boolean;
  getNextModuleFirstLesson: (currentModuleId: string) => ILessonWithState | null;
}

const getAllLessons = (modules: IModuleWithState[]): ILessonWithState[] =>
  modules.flatMap((module) => module.lessons ?? []);

const findFirstAccessibleLesson = (
  modules: IModuleWithState[],
): ILessonWithState | null => {
  const lessons = getAllLessons(modules);
  return (
    lessons.find((lesson) => !lesson.isLockedForUser) ?? lessons[0] ?? null
  );
};

const mergeOpenModules = (
  modules: IModuleWithState[],
  previous: Record<string, boolean>,
  activeLessonId?: string | null,
): Record<string, boolean> => {
  const nextState: Record<string, boolean> = {};

  for (const courseModule of modules) {
    nextState[courseModule._id] = previous[courseModule._id] ?? false;
  }

  if (activeLessonId) {
    const activeModule = modules.find((courseModule) =>
      courseModule.lessons?.some((lesson) => lesson._id === activeLessonId),
    );

    if (activeModule) {
      nextState[activeModule._id] = true;
    }
  }

  if (!Object.values(nextState).some(Boolean) && modules[0]) {
    nextState[modules[0]._id] = true;
  }

  return nextState;
};

export const useCourseLearningStore = create<CourseLearningState>(
  (set, get) => ({
    course: null,
    modules: [],
    progress: null,
    isEnrolled: false,
    activeLesson: null,
    openModules: {},

    activeQuizId: null,
    quizStates: {},

    setCourseData: ({
      course,
      modules,
      progress,
      enrolled,
      quiz,
      preferredLessonId,
    }) => {
      const previousActiveLessonId = get().activeLesson?._id;
      const allLessons = getAllLessons(modules);

      let nextActiveLesson: ILessonWithState | null = null;

      if (preferredLessonId) {
        nextActiveLesson =
          allLessons.find((lesson) => lesson._id === preferredLessonId) ?? null;
      }

      if (!nextActiveLesson && previousActiveLessonId) {
        nextActiveLesson =
          allLessons.find((lesson) => lesson._id === previousActiveLessonId) ??
          null;
      }

      if (nextActiveLesson?.isLockedForUser) {
        nextActiveLesson = null;
      }

      if (!nextActiveLesson) {
        nextActiveLesson = findFirstAccessibleLesson(modules);
      }

      set((state) => ({
        course: {
          ...course,
          quiz: quiz ?? null,
        },
        modules,
        progress,
        isEnrolled: enrolled.isEnrolled,
        activeLesson: nextActiveLesson,
        openModules: mergeOpenModules(
          modules,
          state.openModules,
          nextActiveLesson?._id,
        ),
      }));
    },

    setActiveLesson: (lesson) =>
      set((state) => ({
        activeLesson: lesson,
        activeQuizId: null,
        openModules: lesson
          ? mergeOpenModules(state.modules, state.openModules, lesson._id)
          : state.openModules,
      })),

    setActiveLessonById: (lessonId) => {
      if (!lessonId) {
        set({ activeLesson: null, activeQuizId: null });
        return;
      }

      const lesson =
        get()
          .flatLessons()
          .find((item) => item._id === lessonId && !item.isLockedForUser) ??
        null;

      if (!lesson) return;

      set((state) => ({
        activeLesson: lesson,
        activeQuizId: null,
        openModules: mergeOpenModules(
          state.modules,
          state.openModules,
          lesson._id,
        ),
      }));
    },

    initializeActiveLesson: (lessonId) => {
      const lessons = get().flatLessons();

      let nextLesson: ILessonWithState | null = null;

      if (lessonId) {
        nextLesson =
          lessons.find(
            (lesson) => lesson._id === lessonId && !lesson.isLockedForUser,
          ) ?? null;
      }

      if (!nextLesson) {
        nextLesson =
          lessons.find((lesson) => !lesson.isLockedForUser) ??
          lessons[0] ??
          null;
      }

      set((state) => ({
        activeLesson: nextLesson,
        activeQuizId: null,
        openModules: mergeOpenModules(
          state.modules,
          state.openModules,
          nextLesson?._id,
        ),
      }));
    },

    toggleModule: (moduleId) =>
      set((state) => ({
        openModules: {
          ...state.openModules,
          [moduleId]: !state.openModules[moduleId],
        },
      })),

    openModule: (moduleId) =>
      set((state) => ({
        openModules: {
          ...state.openModules,
          [moduleId]: true,
        },
      })),

    closeModule: (moduleId) =>
      set((state) => ({
        openModules: {
          ...state.openModules,
          [moduleId]: false,
        },
      })),

    resetCourseLearning: () =>
      set({
        course: null,
        modules: [],
        progress: null,
        isEnrolled: false,
        activeLesson: null,
        openModules: {},
        activeQuizId: null,
        quizStates: {},
      }),

    setActiveQuiz: (quizId) => set({ activeQuizId: quizId }),

    setQuizState: (quizId, quizState) =>
      set((state) => ({
        quizStates: {
          ...state.quizStates,
          [quizId]: {
            ...(state.quizStates[quizId] ?? {
              attemptsUsed: 0,
              attemptsLeft: 1,
              lastAttempt: null,
              isLoading: false,
            }),
            ...quizState,
          },
        },
      })),

    clearQuizState: (quizId) =>
      set((state) => {
        if (quizId) {
          const { [quizId]: _, ...rest } = state.quizStates;
          return { quizStates: rest, activeQuizId: null };
        }
        return { quizStates: {}, activeQuizId: null };
      }),

    hasPassedQuiz: (quizId) => {
      const state = get().quizStates[quizId];
      return state?.lastAttempt?.passed ?? false;
    },

    canAttemptQuiz: (quizId, maxAttempts) => {
      const state = get().quizStates[quizId];
      const attemptsUsed = state?.attemptsUsed ?? 0;
      return attemptsUsed < maxAttempts;
    },

    getQuizAttemptsUsed: (quizId) => {
      return get().quizStates[quizId]?.attemptsUsed ?? 0;
    },

    isQuizLocked: (quizId, maxAttempts) => {
      const state = get().quizStates[quizId];
      if (!state) return false;
      return state.attemptsUsed >= maxAttempts && !state.lastAttempt?.passed;
    },

    // Check if a module is fully completed (all lessons + module quiz)
    isModuleCompleted: (moduleId) => {
      const courseModule = get().modules.find((m) => m._id === moduleId);
      if (!courseModule) return false;

      // Check all lessons completed
      const lessonsCompleted = areAllModuleLessonsCompleted(courseModule);
      
      // Check module quiz passed (if exists)
      const moduleQuizPassed = !courseModule.quiz || 
        !!courseModule.quiz.isPassed || 
        get().hasPassedQuiz(courseModule.quiz._id);

      return lessonsCompleted && moduleQuizPassed;
    },

    // Check if entire course is completed
    isCourseCompleted: () => {
      return !!get().progress?.courseCompleted
    },

    flatLessons: () => getAllLessons(get().modules),

    getLessonById: (lessonId) =>
      get()
        .flatLessons()
        .find((lesson) => lesson._id === lessonId) ?? null,

    getModuleByLessonId: (lessonId) =>
      get().modules.find((module) =>
        module.lessons?.some((lesson) => lesson._id === lessonId),
      ),

    currentModule: () => {
      const { activeLesson } = get();
      if (!activeLesson) return undefined;
      return get().getModuleByLessonId(activeLesson._id);
    },

    lessonIndex: () => {
      const courseModule = get().currentModule();
      const activeLesson = get().activeLesson;

      if (!courseModule || !activeLesson) return 0;

      const index =
        courseModule.lessons?.findIndex(
          (lesson) => lesson._id === activeLesson._id,
        ) ?? -1;

      return index >= 0 ? index : 0;
    },

    currentLessonPosition: () => {
      const lessons = get().flatLessons();
      const activeLessonId = get().activeLesson?._id;

      if (!activeLessonId) return 0;

      const index = lessons.findIndex(
        (lesson) => lesson._id === activeLessonId,
      );
      return index >= 0 ? index + 1 : 0;
    },

    totalLessons: () => get().flatLessons().length,

    // ENFORCED FLOW: Lesson -> Lesson Quiz -> Next Lesson -> ... -> Module Quiz -> Next Module -> ... -> Course Quiz -> Certificate
    nextPlayable: () => {
      const activeLesson = get().activeLesson;
      const modules = get().modules;
      
      if (!activeLesson) return null;

      const currentModule = get().currentModule();
      if (!currentModule) return null;

      const hasQuiz = getLessonHasQuiz(activeLesson);
      const contentCompleted = getLessonContentCompleted(activeLesson);
      const lessonQuizPassed = getLessonQuizPassed(activeLesson);

      // STEP 1: If lesson has quiz and content is done but quiz not passed -> go to lesson quiz
      if (hasQuiz && contentCompleted && !lessonQuizPassed) {
        return {
          type: "lesson-quiz",
          id: activeLesson.quiz!._id,
        };
      }

      // STEP 2: Check if lesson is fully completed (content + quiz if exists)
      const lessonFullyCompleted = getLessonCompleted(activeLesson) || 
        (contentCompleted && (!hasQuiz || lessonQuizPassed));

      if (!lessonFullyCompleted) {
        return null; // Must complete current lesson first
      }

      // STEP 3: Find next lesson in current module
      const moduleLessons = currentModule.lessons ?? [];
      const currentIndex = moduleLessons.findIndex(
        (lesson) => lesson._id === activeLesson._id,
      );

      for (let i = currentIndex + 1; i < moduleLessons.length; i++) {
        if (!moduleLessons[i].isLockedForUser) {
          return { type: "lesson", id: moduleLessons[i]._id };
        }
      }

      // STEP 4: No more lessons in this module -> check for module quiz
      const moduleQuiz = currentModule.quiz;
      const allModuleLessonsCompleted = areAllModuleLessonsCompleted(currentModule);
      const moduleQuizPassed = !moduleQuiz || 
        !!moduleQuiz.isPassed || 
        get().hasPassedQuiz(moduleQuiz._id);

      if (moduleQuiz && !moduleQuiz.isLockedForUser && allModuleLessonsCompleted && !moduleQuizPassed) {
        return {
          type: "module-quiz",
          id: moduleQuiz._id,
        };
      }

      // STEP 5: Module quiz passed or no quiz -> move to next module
      const currentModuleIndex = modules.findIndex(
        (m) => m._id === currentModule._id,
      );

      for (let i = currentModuleIndex + 1; i < modules.length; i++) {
        const nextModule = modules[i];
        // Check if next module is unlocked (previous module quiz passed)
        const firstLesson = nextModule.lessons?.find(
          (lesson) => !lesson.isLockedForUser,
        );
        if (firstLesson) {
          return { type: "lesson", id: firstLesson._id };
        }
      }

      // STEP 6: All modules done -> check for course quiz
      const allModulesCompleted = modules.every((module) => {
        const lessonsDone = areAllModuleLessonsCompleted(module);
        const quizDone = !module.quiz || 
          !!module.quiz.isPassed || 
          get().hasPassedQuiz(module.quiz._id);
        return lessonsDone && quizDone;
      });

      const courseQuiz = get().course?.quiz;
      const courseQuizPassed = !courseQuiz || 
        !!courseQuiz.isPassed || 
        get().hasPassedQuiz(courseQuiz._id);

      if (courseQuiz && !courseQuiz.isLockedForUser && allModulesCompleted && !courseQuizPassed) {
        return {
          type: "course-quiz",
          id: courseQuiz._id,
        };
      }

      // STEP 7: Everything completed -> certificate
      if (get().progress?.courseCompleted) {
        return {
          type: "certificate",
          id: get().course?._id ?? "",
        };
      }

      return null;
    },

    // Get next item after a specific lesson (used after quiz completion)
    nextAfterLesson: (lessonId) => {
      const allLessons = get().flatLessons();
      const modules = get().modules;
      
      // Find the lesson's module
      const lessonModule = modules.find(m => 
        m.lessons?.some(l => l._id === lessonId)
      );
      
      if (!lessonModule) return null;

      const moduleLessons = lessonModule.lessons ?? [];
      const currentIndex = moduleLessons.findIndex((l) => l._id === lessonId);

      // Look for next lesson in same module
      for (let i = currentIndex + 1; i < moduleLessons.length; i++) {
        if (!moduleLessons[i].isLockedForUser) {
          return { type: "lesson", id: moduleLessons[i]._id };
        }
      }

      // No more lessons -> check module quiz
      const allModuleLessonsCompleted = areAllModuleLessonsCompleted(lessonModule);
      const moduleQuiz = lessonModule.quiz;
      const moduleQuizPassed = !moduleQuiz || 
        !!moduleQuiz.isPassed || 
        get().hasPassedQuiz(moduleQuiz._id);

      if (moduleQuiz && !moduleQuiz.isLockedForUser && allModuleLessonsCompleted && !moduleQuizPassed) {
        return { type: "module-quiz", id: moduleQuiz._id };
      }

      // Module done -> next module's first lesson
      const currentModuleIndex = modules.findIndex((m) => m._id === lessonModule._id);
      for (let i = currentModuleIndex + 1; i < modules.length; i++) {
        const nextModule = modules[i];
        const firstLesson = nextModule.lessons?.find(
          (lesson) => !lesson.isLockedForUser,
        );
        if (firstLesson) {
          return { type: "lesson", id: firstLesson._id };
        }
      }

      // All modules done -> course quiz
      const allModulesCompleted = modules.every((module) => {
        const lessonsDone = areAllModuleLessonsCompleted(module);
        const quizDone = !module.quiz || 
          !!module.quiz.isPassed || 
          get().hasPassedQuiz(module.quiz._id);
        return lessonsDone && quizDone;
      });

      const courseQuiz = get().course?.quiz;
      const courseQuizPassed = !courseQuiz || 
        !!courseQuiz.isPassed || 
        get().hasPassedQuiz(courseQuiz._id);

      if (courseQuiz && !courseQuiz.isLockedForUser && allModulesCompleted && !courseQuizPassed) {
        return { type: "course-quiz", id: courseQuiz._id };
      }

      // Everything done -> certificate
      if (get().progress?.courseCompleted) {
        return { type: "certificate", id: get().course?._id ?? "" };
      }

      return null;
    },

    previousPlayableLesson: () => {
      const activeLesson = get().activeLesson;
      if (!activeLesson) return null;

      const lessons = get().flatLessons();
      const currentIndex = lessons.findIndex(
        (lesson) => lesson._id === activeLesson._id,
      );

      if (currentIndex <= 0) return null;

      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!lessons[i].isLockedForUser) {
          return lessons[i];
        }
      }

      return null;
    },

    isFirstLesson: () => {
      const activeLessonId = get().activeLesson?._id;
      const firstAccessible = get()
        .flatLessons()
        .find((lesson) => !lesson.isLockedForUser);
      return firstAccessible?._id === activeLessonId;
    },

    isLastLesson: () => {
      const activeLessonId = get().activeLesson?._id;
      const lessons = get()
        .flatLessons()
        .filter((lesson) => !lesson.isLockedForUser);

      return lessons[lessons.length - 1]?._id === activeLessonId;
    },

    getNextModuleFirstLesson: (currentModuleId) => {
      const modules = get().modules;
      const currentIdx = modules.findIndex((m) => m._id === currentModuleId);
      if (currentIdx === -1 || currentIdx >= modules.length - 1) return null;

      // Find next module that has an unlocked lesson
      for (let i = currentIdx + 1; i < modules.length; i++) {
        const nextModule = modules[i];
        const firstUnlocked = nextModule.lessons?.find(l => !l.isLockedForUser);
        if (firstUnlocked) return firstUnlocked;
      }
      
      return null;
    },
  }),
);