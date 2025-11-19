import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface CourseProgressProps {
  completedLessons: number;
  totalLessons: number;
}

export const CourseProgress = ({
  completedLessons,
  totalLessons,
}: CourseProgressProps) => {
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-card">
      <h3 className="font-semibold text-lg">Your Progress</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Completion</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <div>
            <div className="font-medium">{completedLessons}</div>
            <div className="text-muted-foreground">Completed</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <div>
            <div className="font-medium">{totalLessons}</div>
            <div className="text-muted-foreground">Total Lessons</div>
          </div>
        </div>
      </div>
    </div>
  );
};
