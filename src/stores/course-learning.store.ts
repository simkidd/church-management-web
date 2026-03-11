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

type NextPlayableItem =
  | { type: "lesson"; id: string }
  | { type: "lesson-quiz"; id: string }
  | { type: "module-quiz"; id: string };

interface CourseLearningState {
  course: ICourse | null;
  modules: IModuleWithState[];
  progress: IProgressStats | null;
  isEnrolled: boolean;
  activeLesson: ILessonWithState | null;
  openModules: Record<string, boolean>;

  setCourseData: (data: {
    course: ICourse;
    modules: IModuleWithState[];
    progress: IProgressStats;
    enrolled: { isEnrolled: boolean };
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
  nextPlayable: () => NextPlayableItem | null;
  previousPlayableLesson: () => ILessonWithState | null;
  isFirstLesson: () => boolean;
  isLastLesson: () => boolean;
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

    setCourseData: ({
      course,
      modules,
      progress,
      enrolled,
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
        course,
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
        openModules: lesson
          ? mergeOpenModules(state.modules, state.openModules, lesson._id)
          : state.openModules,
      })),

    setActiveLessonById: (lessonId) => {
      if (!lessonId) {
        set({ activeLesson: null });
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
      }),

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

    nextPlayable: () => {
      const activeLesson = get().activeLesson;
      if (!activeLesson) return null;

      const currentModule = get().currentModule();
      if (!currentModule) return null;

      const hasQuiz = getLessonHasQuiz(activeLesson);
      const contentCompleted = getLessonContentCompleted(activeLesson);
      const quizPassed = getLessonQuizPassed(activeLesson);
      const completed = getLessonCompleted(activeLesson);

      if (
        hasQuiz &&
        contentCompleted &&
        !quizPassed &&
        !activeLesson.quiz?.isLockedForUser
      ) {
        return {
          type: "lesson-quiz",
          id: activeLesson.quiz!._id,
        };
      }

      if (!completed) {
        return null;
      }

      const moduleLessons = currentModule.lessons ?? [];
      const currentIndex = moduleLessons.findIndex(
        (lesson) => lesson._id === activeLesson._id,
      );

      for (let i = currentIndex + 1; i < moduleLessons.length; i++) {
        if (!moduleLessons[i].isLockedForUser) {
          return { type: "lesson", id: moduleLessons[i]._id };
        }
      }

      if (
        currentModule.quiz &&
        !currentModule.quiz.isLockedForUser &&
        areAllModuleLessonsCompleted(currentModule)
      ) {
        return {
          type: "module-quiz",
          id: currentModule.quiz._id,
        };
      }

      const modules = get().modules;
      const currentModuleIndex = modules.findIndex(
        (m) => m._id === currentModule._id,
      );

      for (let i = currentModuleIndex + 1; i < modules.length; i++) {
        const nextLesson = (modules[i].lessons ?? []).find(
          (lesson) => !lesson.isLockedForUser,
        );
        if (nextLesson) {
          return { type: "lesson", id: nextLesson._id };
        }
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
  }),
);
