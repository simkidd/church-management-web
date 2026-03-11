import { create } from "zustand";
import { ListCourseParams } from "@/interfaces/course.interface";

interface CoursesState {
  filters: ListCourseParams;
  searchInput: string;
  sortBy: "popular" | "newest" | "az";

  setSearchInput: (search: string) => void;
  setSortBy: (sort: "popular" | "newest" | "az") => void;
  updateFilters: (updates: Partial<ListCourseParams>) => void;
  clearSearch: () => void;
  getApiFilters: () => ListCourseParams;
}

export const useCoursesStore = create<CoursesState>((set, get) => ({
  filters: { page: 1, limit: 9 },
  searchInput: "",
  sortBy: "popular",

  setSearchInput: (search) => set({ searchInput: search }),

  setSortBy: (sort) => {
    const newFilters: ListCourseParams = { page: 1 };

    switch (sort) {
      case "newest":
        newFilters.sortBy = "createdAt";
        newFilters.sortOrder = "desc";
        break;
      case "az":
        newFilters.sortBy = "title";
        newFilters.sortOrder = "asc";
        break;
      case "popular":
      default:
        newFilters.sortBy = "enrolledCount";
        newFilters.sortOrder = "desc";
    }

    set({ sortBy: sort, filters: { ...get().filters, ...newFilters } });
  },

  updateFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
    })),

  clearSearch: () =>
    set((state) => ({
      searchInput: "",
      filters: { ...state.filters, search: undefined, page: 1 },
    })),

  getApiFilters: () => {
    const { filters, searchInput } = get();
    return { ...filters, search: searchInput || undefined };
  },
}));
