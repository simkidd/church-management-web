"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ICourse } from "@/interfaces/course.interface";
import { BookOpen, CheckCircle2, Clock, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course }: { course: ICourse }) => {
  const progress = course.progress;
  const isEnrolled = progress?.isEnrolled;
  const overallProgress = progress?.overallProgress || 0;
  const totalLessons = progress?.totalLessons || course.lessons?.length || 0;

  return (
    <Card className="py-0 overflow-hidden gap-3">
      {course.thumbnail?.url ? (
        <div className="relative aspect-video w-full">
          <Image
            src={course.thumbnail.url}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-12 w-12" />
            <span className="text-sm">No thumbnail</span>
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
            {course.title}
          </CardTitle>
          {isEnrolled && overallProgress === 100 && (
            <Badge variant="default" className="bg-green-500 whitespace-nowrap">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 h-full pb-6">
        <div className="flex flex-col gap-4 pt-2 mt-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration || "N/A"}</span>
            </div>
          </div>

          {/* Progress section for enrolled users */}
          {isEnrolled && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-green-600">
                  {overallProgress}%
                </span>
              </div>
              <Progress value={overallProgress} />
            </div>
          )}

          <div className="flex">
            <Button variant={isEnrolled ? "default" : "outline"} asChild>
              <Link
                href={`/dashboard/courses/${course._id}`}
                className="flex-1"
              >
                {isEnrolled ? "Continue" : "Start Course"}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
