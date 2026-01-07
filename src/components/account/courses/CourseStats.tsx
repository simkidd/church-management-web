"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { usersApi } from "@/lib/api/user.api";
import { useQuery } from "@tanstack/react-query";
import {
  AwardIcon,
  CheckCircle2,
  GraduationCap,
  LucideIcon
} from "lucide-react";

const CourseStats = () => {
  const { data, isPending } = useQuery({
    queryKey: ["my-course-stats"],
    queryFn: usersApi.getMyCourseStats,
  });

  const stats = data?.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={GraduationCap}
        label="In Progress"
        value={stats?.inProgress || 0}
        loading={isPending}
      />
      <StatCard
        icon={CheckCircle2}
        label="Completed"
        value={stats?.completed || 0}
        loading={isPending}
      />
      <StatCard
        icon={AwardIcon}
        label="Certifcates"
        value={stats?.certificates || 0}
        loading={isPending}
      />
    </div>
  );
};

export default CourseStats;

const StatCard = ({
  icon: Icon,
  label,
  loading,
  value,
}: {
  label: string;
  value?: number;
  loading?: boolean;
  icon: LucideIcon;
}) => (
  <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm group hover:border-primary/30 transition-colors">
    <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    {loading ? (
      <Skeleton className="h-8 w-10 mb-1" />
    ) : (
      <span className="text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </span>
    )}
    <span className="text-sm text-slate-500 font-medium">{label}</span>
  </div>
);
