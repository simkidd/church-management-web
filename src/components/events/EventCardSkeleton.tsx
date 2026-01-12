"use client";

import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <article className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft border border-slate-100 dark:border-slate-800">
      {/* Image */}
      <div className="relative h-52">
        <Skeleton className="absolute inset-0 dark:bg-slate-900/80" />

        {/* Date badge */}
        <div className="absolute top-4 left-4 rounded-xl px-3 py-2 min-w-16 border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
          <Skeleton className="h-3 w-8 mb-1" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Type badge */}
        <Skeleton className="h-5 w-28 rounded-md mb-4 dark:bg-slate-900/80" />

        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded mb-4 dark:bg-slate-900/80" />

        {/* Meta */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded-full dark:bg-slate-900/80" />
            <Skeleton className="h-4 w-1/2 rounded dark:bg-slate-900/80" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded-full dark:bg-slate-900/80" />
            <Skeleton className="h-4 w-2/3 rounded dark:bg-slate-900/80" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <Skeleton className="h-3 w-28 rounded dark:bg-slate-900/80" />
          <Skeleton className="h-4 w-16 rounded dark:bg-slate-900/80" />
        </div>
      </div>
    </article>
  );
};

export default EventCardSkeleton;
