import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Award, AlertCircle, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { ILesson } from "@/interfaces/course.interface";

interface LessonNavigationProps {
  currentLessonIndex: number;
  isLastLesson: boolean;
  allLessonsCompleted: boolean;
  completedLessons: number;
  totalLessons: number;
  nextLesson: ILesson;
  courseId: string;
  onPreviousLesson: () => void;
  onNextLesson: () => void;
}

const LessonNavigation = ({
  currentLessonIndex,
  isLastLesson,
  allLessonsCompleted,
  completedLessons,
  totalLessons,
  nextLesson,
  courseId,
  onPreviousLesson,
  onNextLesson,
}: LessonNavigationProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Play className="h-5 w-5" />
          Lesson Navigation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onPreviousLesson}
            disabled={currentLessonIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {nextLesson ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onNextLesson}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : isLastLesson && !allLessonsCompleted ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push(`/dashboard/courses/${courseId}`)}
            >
              Overview
              <Award className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        {/* Exam reminder for last lesson */}
        {isLastLesson && !allLessonsCompleted && (
          <div className="text-center text-xs text-amber-600 p-2 bg-amber-50 rounded border border-amber-200">
            <div className="flex items-center gap-1 justify-center mb-1">
              <AlertCircle className="h-3 w-3" />
              <span className="font-medium">
                Complete all lessons to take the exam
              </span>
            </div>
            <p>
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonNavigation;