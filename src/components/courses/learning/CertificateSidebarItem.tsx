"use client"

import { cn } from "@/lib/utils";
import { Award, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const CertificateSidebarItem = ({
  courseId,
  isEnrolled,
}: {
  courseId: string;
  isEnrolled: boolean;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (!isEnrolled) return;
        router.push(`/courses/${courseId}/certificate`);
      }}
      disabled={!isEnrolled}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left dark:border-emerald-900/60 dark:bg-emerald-950/30",
        !isEnrolled && "cursor-not-allowed opacity-60",
      )}
    >
      <Award className="h-4 w-4 text-emerald-600" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Certificate
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          View and download your certificate
        </p>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </button>
  );
};