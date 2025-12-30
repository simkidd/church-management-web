import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

const CourseDetailSkeleton = () => {
  return (
    <div className="container px-4 mx-auto py-5">
      {/* Breadcrumb Skeleton */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Video Player Skeleton */}
          <Card className="overflow-hidden py-0">
            <CardHeader className="p-0">
              <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>

          {/* Title and Navigation Skeleton */}
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-8 w-full max-w-md" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-3" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-36" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex space-x-4">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />

              {/* Key Takeaways Skeleton */}
              <div className="space-y-2 mt-6">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflection Box Skeleton */}
              <Skeleton className="h-20 w-full mt-6 rounded-lg" />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Instructor Card Skeleton */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Content Skeleton */}
          <Card className="">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4 p-4">
                {[1].map((moduleIndex) => (
                  <div key={moduleIndex} className="space-y-2">
                    {/* Module Header */}
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-4 w-4" />
                    </div>

                    {/* Module Lessons */}
                    <div className="space-y-1 ml-8">
                      {[1, 2, 3].map((lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center gap-3 p-2"
                        >
                          <Skeleton className="h-5 w-5" />
                          <div className="space-y-1 flex-1">
                            <Skeleton className="h-3 w-full max-w-xs" />
                            <Skeleton className="h-2 w-16" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;
