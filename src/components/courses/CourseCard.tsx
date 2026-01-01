"use client";
import { ICourse } from "@/interfaces/course.interface";
import { cn } from "@/lib/utils";
import { User2, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course }: { course: ICourse }) => {
  const isEnrolled = course.enrollment?.isEnrolled === true;
  const progress = course.progress?.percentage ?? 0;
  const hasStarted = isEnrolled && progress > 0;

  return (
    <div className="group flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all duration-300 h-full">
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

          {isEnrolled && (
            <div className="my-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-primary dark:bg-primary-light transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {course.description}
          </p>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <User2 size={18} />
            <span>
              {course.instructor?.firstName + " " + course.instructor?.lastName}
            </span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 mt-auto flex gap-3">
        {!isEnrolled && (
          <Link href={`/courses/${course._id}`} className="flex-1">
            <button className="py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer w-full">
              View Details
            </button>
          </Link>
        )}

        {isEnrolled && (
          <Link href={`/courses/${course._id}`} className="flex-1">
            <button
              className={cn(
                "w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer",
                !hasStarted
                  ? "bg-slate-800 dark:bg-slate-900 text-white dark:text-slate-900"
                  : "bg-primary dark:bg-primary-light text-white"
              )}
            >
              {!hasStarted ? "Start Course" : "Continue Course"}

              <ArrowRight size={18} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
