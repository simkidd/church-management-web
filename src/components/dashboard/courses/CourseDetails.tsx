"use client";
import useProgress from "@/hooks/use-progress";
import { ICourse, ILesson } from "@/interfaces/course.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import courseApi from "@/lib/api/course.api";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  PlayCircle,
  CheckCircle2,
  FileText,
  BarChart3,
  Trophy,
  Lock,
  Loader2,
  ChevronRight,
  Award,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { EmptyState } from "@/components/shared/EmptyState";
import { ILessonProgress, IProgress } from "@/interfaces/progress.interface";

const CourseDetails = ({ courseId }: { courseId: string }) => {
  const router = useRouter();

  const {
    data: courseData,
    isPending,
    error,
  } = useQuery<ApiResponse<ICourse>>({
    queryKey: ["course", courseId],
    queryFn: () => courseApi.getCourseById(courseId),
  });

  const {
    progress,
    isEnrolled,
    overallProgress,
    completedLessons,
    totalLessons,
    enrollInCourse,
    isEnrolling,
    markLessonComplete,
    isMarkingComplete,
  } = useProgress(courseId);

  const course = courseData?.data as ICourse;

  if (isPending) {
    return <CourseDetailsSkeleton />;
  }

  if (error || !course) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Course Not Found"
        description="The course you're looking for doesn't exist or you don't have access
            to it."
        action={
          <Button asChild>
            <Link href={"/dashboard/courses"}>Back to Courses</Link>
          </Button>
        }
      />
    );
  }

  const handleEnroll = () => {
    enrollInCourse();
  };

  const handleStartCourse = () => {
    if (course.lessons && course.lessons.length > 0) {
      const firstLesson = course.lessons[0];
      router.push(`/dashboard/courses/${courseId}/lessons/${firstLesson._id}`);
    }
  };

  const handleStartLesson = (lessonId: string) => {
    router.push(`/dashboard/courses/${courseId}/lessons/${lessonId}`);
  };

  const handleMarkComplete = (lessonId: string) => {
    markLessonComplete(lessonId);
  };

  const getLessonIcon = (isCompleted: boolean, lessonType?: string) => {
    if (isCompleted) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    return <PlayCircle className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Course Thumbnail */}
            {course.thumbnail?.url ? (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={course.thumbnail.url}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
                  {course.duration}
                </Badge>
              </div>
            ) : (
              <div className="relative aspect-video w-full bg-muted flex items-center justify-center rounded-xl">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-12 w-12" />
                  <span className="text-sm">No thumbnail</span>
                </div>
              </div>
            )}

            {/* Course Header */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lessons?.length || 0} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                {course.instructor && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <span>
                      {course.instructor.firstName} {course.instructor.lastName}
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Section */}
              {isEnrolled && (
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Course Progress
                    </span>
                    <span className="font-medium">
                      {completedLessons}/{totalLessons} lessons completed
                    </span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl">Course Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEnrolled ? (
                  <>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-1">
                        {overallProgress}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Complete
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-center">
                        {completedLessons}/{totalLessons}
                      </div>
                      <div className="text-sm text-muted-foreground text-center">
                        Lessons Completed
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleStartCourse}
                      disabled={!course.lessons || course.lessons.length === 0}
                    >
                      {overallProgress > 0 ? (
                        <>
                          <PlayCircle className="h-5 w-5" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-5 w-5" />
                          Start Course
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-2xl font-bold text-center">
                        {course.lessons?.length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground text-center">
                        Lessons
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-center">
                        {course.duration}
                      </div>
                      <div className="text-sm text-muted-foreground text-center">
                        Duration
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Enrolling...
                        </>
                      ) : (
                        "Enroll Now"
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Instructor Card */}
            {course.instructor && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={course.instructor.avatar?.url}
                        alt={course.instructor.firstName}
                      />
                      <AvatarFallback>
                        {course.instructor.firstName?.[0]}
                        {course.instructor.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {course.instructor.firstName}{" "}
                        {course.instructor.lastName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Course Instructor
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Course Content Tabs */}
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Course Content</CardTitle>
                <CardDescription>
                  {course.lessons?.length || 0} lessons • {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {course.lessons?.map((lesson: ILesson, index: number) => (
                    <LessonItem
                      key={lesson._id}
                      lesson={lesson}
                      index={index}
                      isEnrolled={isEnrolled}
                      progress={progress!}
                      onStartLesson={() => handleStartLesson(lesson._id)}
                      onMarkComplete={() => handleMarkComplete(lesson._id)}
                      isMarkingComplete={isMarkingComplete}
                    />
                  ))}

                  {(!course.lessons || course.lessons.length === 0) && (
                    <EmptyState
                      icon={FileText}
                      title="No lessons available yet."
                      description="Available lessons will appear here."
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About This Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Course Overview</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">
                  What You&apos;ll Learn
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      Deep understanding of core concepts and principles
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Practical skills and real-world applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      Comprehensive knowledge from basic to advanced topics
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>Lifetime access to course materials and updates</span>
                  </li>
                </ul>
              </div>

              {course.instructor && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Instructor</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={course.instructor.avatar?.url}
                        alt={course.instructor.firstName}
                      />
                      <AvatarFallback className="text-lg">
                        {course.instructor.firstName?.[0]}
                        {course.instructor.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {course.instructor.firstName}{" "}
                        {course.instructor.lastName}
                      </h4>
                      <p className="text-muted-foreground">
                        Experienced instructor dedicated to student success
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Lesson Item Component
const LessonItem = ({
  lesson,
  index,
  isEnrolled,
  progress,
  onStartLesson,
  onMarkComplete,
  isMarkingComplete,
}: {
  lesson: ILesson;
  index: number;
  isEnrolled: boolean;
  progress: IProgress;
  onStartLesson: () => void;
  onMarkComplete: () => void;
  isMarkingComplete: boolean;
}) => {
  const isCompleted =
    progress?.lessonsProgress?.some(
      (lp: ILessonProgress) => lp.lessonId._id === lesson._id && lp.isCompleted
    ) || false;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="p-6 hover:bg-muted/50 transition-colors group">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          {!isEnrolled ? (
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
          ) : isCompleted ? (
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg mb-2">{lesson.title}</h4>
          <p className="text-muted-foreground mb-3 line-clamp-2">
            {lesson.content}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {lesson.duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDuration(lesson.duration)}
              </span>
            )}
            <span>Lesson {index + 1}</span>
            {isEnrolled && isCompleted && (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 flex gap-2">
          {isEnrolled ? (
            <>
              {!isCompleted && (
                <Button variant="default" size="sm" onClick={onStartLesson}>
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}

              {isCompleted && (
                <span>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Completed
                </span>
              )}
            </>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <Lock className="h-4 w-4 mr-1" />
              Locked
            </Button>
          )}
          <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

// Skeleton Component
const CourseDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32" />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="aspect-video rounded-xl" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <div className="flex gap-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 py-6 border-b last:border-b-0"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetails;
