"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { usersApi } from "@/lib/api/user.api";
import { useQuery } from "@tanstack/react-query";
import {
  AwardIcon,
  CheckCircle2,
  Clock,
  GraduationCap,
  LucideIcon,
  TrendingUp,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";

interface StatData {
  inProgress: number;
  completed: number;
  certificates: number;
  studyStreak?: number;
  totalHours?: number;
}

const CourseStats = () => {
  const { data, isPending } = useQuery({
    queryKey: ["my-course-stats"],
    queryFn: usersApi.getMyCourseStats,
  });

  const stats = data?.data as StatData | undefined;

  const statItems = [
    {
      icon: GraduationCap,
      label: "In Progress",
      value: stats?.inProgress || 0,
      color: "blue",
      trend: "+2 this week",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: stats?.completed || 0,
      color: "green",
      trend: "Great job!",
    },
    {
      icon: AwardIcon,
      label: "Certificates",
      value: stats?.certificates || 0,
      color: "amber",
      trend: "Keep it up!",
    },
    {
      icon: Flame,
      label: "Day Streak",
      value: stats?.studyStreak || 5,
      color: "orange",
      trend: "You're on fire!",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard
            icon={item.icon}
            label={item.label}
            value={item.value}
            loading={isPending}
            color={item.color as "blue" | "green" | "amber" | "orange" | "purple"}
            trend={item.trend}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CourseStats;

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value?: number;
  loading?: boolean;
  color: "blue" | "green" | "amber" | "orange" | "purple";
  trend?: string;
}

const colorVariants = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-blue-500/20",
  green: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
  amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 ring-amber-500/20",
  orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 ring-orange-500/20",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 ring-purple-500/20",
};

const StatCard = ({
  icon: Icon,
  label,
  loading,
  value,
  color,
  trend,
}: StatCardProps) => (
  <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
    <div className="flex items-start justify-between">
      <div className={`size-10 rounded-xl ${colorVariants[color]} flex items-center justify-center ring-1 ring-inset transition-transform group-hover:scale-110`}>
        <Icon size={20} />
      </div>
      {!loading && trend && (
        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    
    <div className="mt-4">
      {loading ? (
        <Skeleton className="h-8 w-16 mb-2" />
      ) : (
        <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </span>
      )}
      <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
    </div>
  </div>
);