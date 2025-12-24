"use client";
import {
  AwardIcon,
  CheckCircle,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import React from "react";

const CourseStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm group hover:border-primary/30 transition-colors">
        <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <GraduationCap size={24} />
        </div>
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          3
        </span>
        <span className="text-sm text-slate-500 font-medium">In Progress</span>
      </div>
      <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm group hover:border-green-500/30 transition-colors">
        <div className="size-12 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <CheckCircle2 size={24} />
        </div>
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          8
        </span>
        <span className="text-sm text-slate-500 font-medium">Completed</span>
      </div>
      <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm group hover:border-accent/30 transition-colors">
        <div className="size-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <AwardIcon size={24} />
        </div>
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          12
        </span>
        <span className="text-sm text-slate-500 font-medium">Certificates</span>
      </div>
    </div>
  );
};

export default CourseStats;
