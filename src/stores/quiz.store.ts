import { create } from "zustand";

interface QuizState {
  currentIndex: number;
  answers: Record<string, number>;
  startedAt: number | null;
  duration: number; // seconds

  startQuiz: (duration: number) => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentIndex: 0,
  answers: {},
  startedAt: null,
  duration: 0,

  startQuiz: (duration) =>
    set({
      startedAt: Date.now(),
      duration,
    }),

  selectAnswer: (questionId, optionIndex) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: optionIndex,
      },
    })),

  goTo: (index) => set({ currentIndex: index }),

  next: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),

  prev: () =>
    set((state) => ({ currentIndex: Math.max(0, state.currentIndex - 1) })),

  reset: () =>
    set({
      currentIndex: 0,
      answers: {},
      startedAt: null,
      duration: 0,
    }),
}));
