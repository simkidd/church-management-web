"use client";

import { ICourse } from "@/interfaces/course.interface";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FolderKanban,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: ICourse;
  index?: number;
}

const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
  const isEnrolled = !!course.enrollment?.isEnrolled;
  const progress = Math.max(0, Math.min(100, course.progress?.percentage ?? 0));
  const enrollmentStatus = course.enrollment?.status ?? null;

  const isCompleted =
    enrollmentStatus === "completed" || (isEnrolled && progress >= 100);

  const href = isEnrolled
    ? `/courses/${course._id}/learn`
    : `/courses/${course._id}`;

  const thumbnailUrl =
    course.thumbnail?.url ||
    "https://placehold.co/1200x800/e2e8f0/64748b?text=Course";

  const instructorFirstName = course.instructor?.firstName ?? "";
  const instructorLastName = course.instructor?.lastName ?? "";
  const instructorName =
    `${instructorFirstName} ${instructorLastName}`.trim() || "Instructor";

  const initials =
    `${instructorFirstName.charAt(0)}${instructorLastName.charAt(0)}`.trim() ||
    "I";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-surface-dark"
    >
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url("${thumbnailUrl}")` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <div className="absolute left-4 top-4">
          {isCompleted ? (
            <StatusChip
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
              label="Completed"
              className="bg-emerald-500 text-white"
            />
          ) : isEnrolled ? (
            <StatusChip
              icon={<PlayCircle className="h-3.5 w-3.5" />}
              label="In Progress"
              className="bg-primary text-white"
            />
          ) : (
            <StatusChip
              icon={<BookOpen className="h-3.5 w-3.5" />}
              label="Available"
              className="bg-white/90 text-slate-700"
            />
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 rounded-2xl bg-black/45 px-3 py-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700">
                  {initials.toUpperCase()}
                </div>
                <span className="truncate text-xs font-semibold text-white">
                  {instructorName}
                </span>
              </div>
            </div>

            {course.duration ? (
              <div className="shrink-0 rounded-2xl bg-black/45 px-3 py-2 backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-white">
                  <Clock3 className="h-3.5 w-3.5 text-white/80" />
                  <span className="text-xs font-medium">{course.duration}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-primary dark:text-white">
            {course.title}
          </h3>

          {isEnrolled ? (
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {isCompleted ? "Completed" : "Progress"}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    isCompleted
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-700 dark:text-slate-200",
                  )}
                >
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full",
                    isCompleted ? "bg-emerald-500" : "bg-primary",
                  )}
                />
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 dark:border-slate-700">
              <p className="text-sm text-slate-500">
                Enroll to start learning and track your progress.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5">
          <Link
            href={href}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
              isCompleted
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
                : isEnrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
            )}
          >
            <span>
              {isCompleted
                ? "Review Course"
                : isEnrolled
                  ? "Continue Learning"
                  : "View Course"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const StatusChip = ({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm",
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
};

const MetaBadge = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {icon}
      {label}
    </span>
  );
};

export default CourseCard;
