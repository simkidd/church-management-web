"use client";
import { Skeleton } from "@/components/ui/skeleton";

const LessonSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonSkeleton;
