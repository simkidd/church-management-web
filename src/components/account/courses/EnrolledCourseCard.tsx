"use client";

import { ICourse } from "@/interfaces/course.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  PlayCircle,
  CheckCircle2,
  Award,
  MoreVertical,
  BookOpen,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface EnrolledCourseCardProps {
  course: ICourse;
}

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
  const progress = Math.max(0, Math.min(100, course.progress?.percentage ?? 0));
  const completedLessons = course.progress?.completedLessons ?? 0;
  const totalLessons = course.progress?.totalLessons ?? 0;

  const hasStarted = progress > 0;
  const isCompleted =
    course.enrollment?.status === "completed" || progress >= 100;

  const instructorFirstName = course.instructor?.firstName ?? "";
  const instructorLastName = course.instructor?.lastName ?? "";
  const instructorName =
    `${instructorFirstName} ${instructorLastName}`.trim() || "Instructor";

  const instructorInitials =
    `${instructorFirstName.charAt(0)}${instructorLastName.charAt(0)}`.trim() ||
    "I";

  const thumbnailUrl =
    course.thumbnail?.url ||
    "https://placehold.co/800x500/e2e8f0/64748b?text=Course";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url("${thumbnailUrl}")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute left-3 top-3">
          <Badge
            variant="secondary"
            className={cn(
              "border-0 bg-white/95 text-xs font-semibold shadow-sm backdrop-blur-sm dark:bg-slate-900/95",
              isCompleted && "bg-green-500/90 text-white",
              !hasStarted && !isCompleted && "bg-slate-500/90 text-white",
            )}
          >
            {isCompleted ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} />
                Completed
              </span>
            ) : hasStarted ? (
              <span className="flex items-center gap-1">
                <PlayCircle size={12} />
                In Progress
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <BookOpen size={12} />
                Not Started
              </span>
            )}
          </Badge>
        </div>

        <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="rounded-lg bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <MoreVertical size={16} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <BookOpen size={16} className="mr-2" />
                View Syllabus
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Award size={16} className="mr-2" />
                View Certificate
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                Unenroll
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute bottom-3 right-3">
          {isCompleted ? (
            <div className="flex size-12 items-center justify-center rounded-full bg-green-500 shadow-lg">
              <Award size={24} className="text-white" />
            </div>
          ) : (
            <Link
              href={`/courses/${course._id}/learn`}
              className="flex size-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110 dark:bg-slate-900"
            >
              <PlayCircle
                size={24}
                className="fill-primary/20 text-primary"
              />
            </Link>
          )}
        </div>

        {course.duration ? (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Clock size={12} />
            {course.duration}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex-1">
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
            {course.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {course.description || "No description available"}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {instructorInitials.toUpperCase()}
          </div>
          <span className="truncate text-xs font-medium text-slate-500">
            {instructorName}
          </span>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span
                className={cn(
                  "font-semibold",
                  isCompleted
                    ? "text-green-600"
                    : "text-slate-600 dark:text-slate-400",
                )}
              >
                {isCompleted ? "Course Completed!" : `${progress}% Complete`}
              </span>
              <span className="text-slate-400">
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full transition-all",
                  isCompleted
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-primary to-primary/80",
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {isCompleted ? (
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <CheckCircle2 size={14} />
                <span>Certificate earned</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                {hasStarted ? "Keep going" : "Ready to begin"}
              </div>
            )}

            <Link
              href={`/courses/${course._id}/learn`}
              className={cn(
                "ml-auto rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
                isCompleted
                  ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                  : hasStarted
                    ? "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
              )}
            >
              {isCompleted ? "Review" : hasStarted ? "Continue" : "Start Learning"}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default EnrolledCourseCard;