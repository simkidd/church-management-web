"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Clock, Headphones, Play, Video } from "lucide-react";

const ArchiveCardSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 shadow-sm flex flex-col h-full">
      {/* Thumbnail skeleton */}
      <div className="relative aspect-video overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />

        {/* Media type skeleton */}
        <Skeleton className="absolute top-3 left-3 h-6 w-14 rounded" />

        {/* Play button skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="rounded-full p-3">
            <Play size={36} className="text-transparent" />
          </Skeleton>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-1">
        {/* Series and bookmark */}
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-5 w-5 rounded">
            <Bookmark className="text-transparent" />
          </Skeleton>
        </div>

        {/* Title skeleton */}
        <Skeleton className="h-5 w-4/5 mb-2" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
        </div>

        {/* Footer skeleton */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
          {/* Speaker info skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-lg">
              <Headphones size={20} className="text-transparent" />
            </Skeleton>
            <Skeleton className="h-8 w-8 rounded-lg">
              <Video size={20} className="text-transparent" />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCardSkeleton;
