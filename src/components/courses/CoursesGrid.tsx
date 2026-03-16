// components/courses/CoursesGrid.tsx
"use client";
import useCourses from "@/hooks/use-courses";
import { useCoursesStore } from "@/stores/courses.store";
import { ChevronDown, Loader2 } from "lucide-react";
import React from "react";
import CourseCard from "./CourseCard";
import { Skeleton } from "../ui/skeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const CoursesGrid = () => {
  const { filters } = useCoursesStore();

  const {
    infiniteQuery: { 
      courses, 
      isLoadingInfinite, 
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    },
  } = useCourses(filters);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoadingInfinite && courses.length === 0) {
    return <CoursesGridSkeleton />;
  }

  return (
    <div className="container px-4 mx-auto space-y-10">
      {isLoadingInfinite && courses.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Loading courses...
            </span>
          </div>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}

        {/* Show skeleton cards while fetching next page */}
        {isFetchingNextPage && (
          <>
            {[1, 2, 3].map((i) => (
              <CourseCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </section>

      {/* Infinite scroll trigger */}
      {hasNextPage && !isLoadingInfinite && (
        <div 
          ref={loadMoreRef}
          className="flex justify-center py-8"
        >
          <button
            disabled={isFetchingNextPage}
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Courses
                <ChevronDown
                  size={18}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      )}

      {!hasNextPage && courses.length > 0 && (
        <p className="text-center text-slate-500 py-8 text-sm">
          You&apos;ve reached the end
        </p>
      )}

      {courses.length === 0 && !isLoadingInfinite && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or check back later for new courses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesGrid;

// Skeleton components...
const CourseCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-soft h-full animate-pulse">
      <div className="relative h-48 bg-muted">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
};

const CoursesGridSkeleton = () => {
  return (
    <div className="container px-4 mx-auto space-y-10">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
};