"use client";
import useCourses from "@/hooks/use-courses";
import { ListCourseParams } from "@/interfaces/course.interface";
import { ChevronDown, Loader2, User, User2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CoursesGrid = () => {
  const [filters, setFilters] = useState<ListCourseParams>({
    page: 1,
    limit: 10,
  });
  const {
    infiniteQuery: { courses, isLoadingInfinite, isFetchingNextPage },
    hasMore,
    loadMore,
  } = useCourses(filters);

  return (
    <div className="container px-4 mx-auto space-y-10">
      {/* <section className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              category.isActive
                ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"
            }`}
          >
            {category.name}
          </button>
        ))}
      </section> */}

      {isLoadingInfinite && (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="group flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all duration-300 h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${course.thumbnail?.url}')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              {/* Level badge removed from here */}
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex-1">
                {/* <div className="flex items-center gap-2 text-xs font-semibold text-primary dark:text-primary-light mb-2">
                  {course.category}
                </div> */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {course.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <User2 size={18} />
                  <span>
                    {course.instructor?.firstName +
                      " " +
                      course.instructor?.lastName}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 mt-auto flex gap-3">
              <Link href={`/courses/${course._id}`} className="flex-1">
                <button className="py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer w-full" >
                  View Details
                </button>
              </Link>
              <button className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => loadMore()}
            disabled={isFetchingNextPage}
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Loading…
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
    </div>
  );
};

export default CoursesGrid;
