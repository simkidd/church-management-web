"use client";
import { useCoursesStore } from "@/stores/courses.store";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import React, { useEffect } from "react";

const TitleAndFilter = () => {
  const { 
    searchInput, 
    setSearchInput, 
    sortBy, 
    setSortBy, 
    clearSearch,
    updateFilters,
  } = useCoursesStore();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({
        search: searchInput || undefined,
        page: 1,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, updateFilters]);

  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 container px-4 mx-auto py-5">
      <div className="flex flex-col gap-2">
        <span className="text-primary dark:text-primary-light font-semibold text-sm uppercase tracking-wider">
          Bible Academy
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Browse Courses
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl">
          Deepen your faith and understanding with our structured learning paths.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary transition-colors">
            <SearchIcon size={20} />
          </span>
          <input
            className="pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-sm focus:border-primary focus:ring-primary dark:text-white w-full md:w-64 shadow-sm outline-none transition-all"
            placeholder="Search courses..."
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "popular" | "newest" | "az")}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer outline-none focus:border-primary"
          >
            <option value="popular">Sort by: Popular</option>
            <option value="newest">Sort by: Newest</option>
            <option value="az">Sort by: A-Z</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <ChevronDown size={18} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default TitleAndFilter;