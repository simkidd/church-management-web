import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDuration } from "@/utils/helpers/time";
import { ICourse } from "@/interfaces/course.interface";
import { IProgress } from "@/interfaces/progress.interface";

interface QuickNavigationProps {
  course?: ICourse;
  courseId: string;
  currentLessonId: string;
  progress?: IProgress;
  markLessonComplete: (lessonId: string) => void;
  isMarkingComplete: boolean;
}

const QuickNavigation = ({
  course,
  courseId,
  currentLessonId,
  progress,
  markLessonComplete,
  isMarkingComplete,
}: QuickNavigationProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Course Lessons</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-64 overflow-y-auto">
        {course?.lessons?.map((lesson, index) => {
          const isCurrent = lesson._id === currentLessonId;

          const isLessonCompleted = progress?.lessonsProgress?.some(
            (lp) =>
              lp.lessonId.toString() === lesson._id.toString() && lp.isCompleted
          );

          return (
            <Button
              key={lesson._id}
              variant={isCurrent ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-3 group relative"
              onClick={() =>
                router.push(
                  `/dashboard/courses/${courseId}/lessons/${lesson._id}`
                )
              }
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isLessonCompleted
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isLessonCompleted ? "✓" : index + 1}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div
                    className={`text-sm font-medium truncate ${
                      isCurrent ? "text-primary" : ""
                    }`}
                  >
                    {lesson.title}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDuration(lesson.duration as number)}
                  </div>
                </div>
              </div>

              {/* Quick Complete Button */}
              {/* {!isCurrent && !isLessonCompleted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity ml-auto absolute right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    markLessonComplete(lesson._id);
                    toast.success(`"${lesson.title}" marked as complete!`);
                  }}
                  disabled={isMarkingComplete}
                >
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground hover:text-green-600" />
                </Button>
              )} */}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickNavigation;
