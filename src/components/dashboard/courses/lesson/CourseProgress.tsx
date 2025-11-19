import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IProgress } from "@/interfaces/progress.interface";
import { BarChart3 } from "lucide-react";

interface CourseProgressProps {
  progress?: IProgress;
  completedLessons: number;
  totalLessons: number;
  allLessonsCompleted: boolean;
}

const CourseProgress = ({
  progress,
  completedLessons,
  totalLessons,
  allLessonsCompleted,
}: CourseProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-semibold">
              {progress?.overallProgress || 0}%
            </span>
          </div>
          <Progress
            value={progress?.overallProgress || 0}
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {completedLessons}
            </div>
            <div className="text-xs text-muted-foreground">
              Completed
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-muted-foreground">
              {totalLessons - completedLessons}
            </div>
            <div className="text-xs text-muted-foreground">
              Remaining
            </div>
          </div>
        </div>

        {/* Progress Milestone */}
        {completedLessons > 0 && completedLessons < totalLessons && (
          <div className="text-center text-xs text-muted-foreground p-2 bg-muted/50 rounded">
            {completedLessons >= Math.floor(totalLessons * 0.75)
              ? "Almost there! 🚀"
              : completedLessons >= Math.floor(totalLessons * 0.5)
              ? "Halfway done! 🌟"
              : completedLessons >= Math.floor(totalLessons * 0.25)
              ? "Great start! 💪"
              : "Keep going! 📚"}
          </div>
        )}

        {/* Exam Progress */}
        {allLessonsCompleted && (
          <div className="text-center text-xs text-green-600 p-2 bg-green-50 rounded border border-green-200">
            <div className="font-medium mb-1">🎓 Ready for Exam!</div>
            <p>All lessons completed</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseProgress;