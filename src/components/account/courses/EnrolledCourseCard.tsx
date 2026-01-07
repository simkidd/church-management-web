"use client";
import { ICourse } from "@/interfaces/course.interface";
import { IProgressStats } from "@/interfaces/progress.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const EnrolledCourseCard = ({
  course,
}: {
  course: ICourse & IProgressStats;
}) => {
  const progress = course.progress.percentage ?? 0;
  const completedLessons = course.progress?.completedLessons ?? 0;
  const totalLessons = course.progress?.totalLessons ?? 0;
  const hasStarted = progress > 0;

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col group hover:border-primary/30 transition-all h-full">
      <div
        className="h-40 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-700"
        style={{
          backgroundImage: `url('${course.thumbnail?.url}')`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-5 flex-1 flex flex-col bg-card-light dark:bg-card-dark relative z-10">
        <div className="mb-4 flex-1">
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
            {course.title}
          </h4>
          <p className="text-sm text-slate-500 line-clamp-2">
            {course.description}
          </p>
        </div>
        <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>{progress}% Complete</span>
              <span>
                {completedLessons} /{totalLessons} Lessons
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
              <div
                className={cn(
                  "h-1.5 rounded-full bg-primary dark:bg-primary-light transition-all"
                )}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Link href={`/courses/${course._id}`}>
            <button className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              {hasStarted ? "Continue" : "Start Learning"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
