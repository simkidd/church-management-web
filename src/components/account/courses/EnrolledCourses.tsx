"use client";
import { usersApi } from "@/lib/api/user.api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import { ICourse } from "@/interfaces/course.interface";
import { IProgressStats } from "@/interfaces/progress.interface";

const EnrolledCourses = () => {
  const [status, setStatus] = useState<"in-progress" | "completed">(
    "in-progress"
  );

  const { data, isLoading } = useQuery({
    queryKey: ["my-courses", status],
    queryFn: () => usersApi.getMyCourses({ status }),
  });

  const courses = data?.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Enrolled Courses
          <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {courses.length}
          </span>
        </h3>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {["in-progress", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s as "in-progress" | "completed")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
                status === s
                  ? "bg-white dark:bg-slate-700 text-xs font-semibold shadow-sm text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white "
              )}
            >
              {s === "in-progress" ? "In Progress" : "Completed"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))
        ) : courses.length === 0 ? (
          <p className="text-sm text-muted-foreground">No courses found.</p>
        ) : (
          courses.map((course: ICourse & IProgressStats) => (
            <EnrolledCourseCard key={course._id} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
