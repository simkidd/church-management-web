"use client";
import { usersApi } from "@/lib/api/user.api";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import { ICourse } from "@/interfaces/course.interface";
import { IProgressStats } from "@/interfaces/progress.interface";
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Filter, 
  GraduationCap,
  Search,
  Sparkles 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type CourseStatus = "in-progress" | "completed" | "all";

const EnrolledCourses = () => {
  const [status, setStatus] = useState<CourseStatus>("in-progress");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["my-courses", status],
    queryFn: () => usersApi.getMyCourses({ status: status === "all" ? undefined : status }),
  });

  const courses = data?.data ?? [];

  const filteredCourses = courses.filter((course: ICourse) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "in-progress" as const, label: "In Progress", icon: Clock },
    { id: "completed" as const, label: "Completed", icon: CheckCircle2 },
    { id: "all" as const, label: "All Courses", icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-slate-400" size={20} />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Enrolled Courses
          </h3>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
            {courses.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatus(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  status === tab.id
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <tab.icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status + searchQuery}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <EmptyState status={status} searchQuery={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course: ICourse & IProgressStats, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EnrolledCourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ 
  status, 
  searchQuery 
}: { 
  status: CourseStatus; 
  searchQuery: string 
}) => {
  if (searchQuery) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
        <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-slate-400" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No courses found
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          We couldn't find any courses matching "{searchQuery}". Try adjusting your search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
      <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        {status === "completed" ? (
          <CheckCircle2 className="text-primary" size={28} />
        ) : (
          <Sparkles className="text-primary" size={28} />
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {status === "completed" 
          ? "No completed courses yet" 
          : "No active courses"}
      </h3>
      <p className="text-slate-500 max-w-sm mx-auto mb-6">
        {status === "completed"
          ? "Finish your in-progress courses to see them here and earn certificates!"
          : "Browse our catalog to start learning something new today."}
      </p>
      {status !== "completed" && (
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <BookOpen size={18} />
          Browse Courses
        </button>
      )}
    </div>
  );
};

export default EnrolledCourses;