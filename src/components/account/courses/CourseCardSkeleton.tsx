import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="rounded-2xl border bg-card-light dark:bg-card-dark overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
