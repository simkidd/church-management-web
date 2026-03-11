"use client";
import { ICourse } from "@/interfaces/course.interface";
import { IProgressStats } from "@/interfaces/progress.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {
  Clock,
  PlayCircle,
  CheckCircle2,
  Award,
  Calendar,
  MoreVertical,
  BookOpen,
  Timer,
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
  course: ICourse & IProgressStats;
}

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
  const progress = course.progress?.percentage ?? 0;
  const completedLessons = course.progress?.completedLessons ?? 0;
  const totalLessons = course.progress?.totalLessons ?? 0;
  const hasStarted = progress > 0;
  const isCompleted = progress === 100;

  // Calculate estimated time remaining
  const estimatedTimeLeft = course.duration
    ? Math.ceil((course.duration * (100 - progress)) / 100)
    : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full"
    >
      {/* Thumbnail Section */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url('${course.thumbnail?.url || "/placeholder-course.jpg"}')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className={cn(
              "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-xs font-semibold border-0 shadow-sm",
              isCompleted && "bg-green-500/90 text-white",
              !hasStarted && "bg-slate-500/90 text-white",
            )}
          >
            {isCompleted ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} /> Completed
              </span>
            ) : hasStarted ? (
              <span className="flex items-center gap-1">
                <PlayCircle size={12} /> In Progress
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <BookOpen size={12} /> Not Started
              </span>
            )}
          </Badge>
        </div>

        {/* Quick Actions Menu */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg text-white transition-colors">
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

        {/* Progress Ring (for completed) or Play Button */}
        <div className="absolute bottom-3 right-3">
          {isCompleted ? (
            <div className="size-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Award size={24} className="text-white" />
            </div>
          ) : (
            <Link href={`/courses/${course._id}/learn`}>
              <div className="size-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                <PlayCircle
                  size={24}
                  className="text-primary fill-primary/20"
                />
              </div>
            </Link>
          )}
        </div>

        {/* Course Duration */}
        {course.duration && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Clock size={12} />
            {course.duration} mins
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-2">
          {course.category && (
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
              {course.category}
            </span>
          )}
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar size={12} />
            Enrolled{" "}
            {course.enrolledAt
              ? new Date(course.enrolledAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Recently"}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-4 flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description || "No description available"}
          </p>
        </div>

        {/* Instructor Info */}
        {course.instructor && (
          <div className="flex items-center gap-2 mb-4">
            <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
              {course.instructor.name?.charAt(0) || "I"}
            </div>
            <span className="text-xs text-slate-500 font-medium truncate">
              {course.instructor.name}
            </span>
          </div>
        )}

        {/* Progress Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
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
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
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

          {/* Time Estimate & CTA */}
          <div className="flex items-center justify-between">
            {!isCompleted && estimatedTimeLeft && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Timer size={14} />
                <span>{estimatedTimeLeft}m left</span>
              </div>
            )}
            {isCompleted && (
              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle2 size={14} />
                <span>Certificate earned</span>
              </div>
            )}

            <Link
              href={`/courses/${course._id}${hasStarted ? "/learn" : ""}`}
              className="ml-auto"
            >
              <button
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer",
                  isCompleted
                    ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                    : hasStarted
                      ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
                )}
              >
                {isCompleted
                  ? "Review"
                  : hasStarted
                    ? "Continue"
                    : "Start Learning"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnrolledCourseCard;
