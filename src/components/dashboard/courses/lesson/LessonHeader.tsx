import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BarChart3 } from "lucide-react";
import { formatDuration } from "@/utils/helpers/time";
import { ICourse, ILesson } from "@/interfaces/course.interface";
import { IProgress } from "@/interfaces/progress.interface";

interface LessonHeaderProps {
  course?: ICourse;
  currentLesson: ILesson;
  currentLessonIndex: number;
  totalLessons: number;
  progress?: IProgress;
  completedLessons: number;
}

const LessonHeader = ({
  course,
  currentLesson,
  currentLessonIndex,
  totalLessons,
  progress,
  completedLessons,
}: LessonHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Badge variant="outline" className="text-sm">
            Lesson {currentLessonIndex + 1}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            {currentLesson.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatDuration(currentLesson.duration as number)}</span>
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="sm:hidden bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Course Progress</span>
          <span className="text-sm">{progress?.overallProgress || 0}%</span>
        </div>
        <Progress value={progress?.overallProgress || 0} />
        <div className="text-xs text-muted-foreground mt-1 text-center">
          {completedLessons} of {totalLessons} lessons completed
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="text-xs text-muted-foreground flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">Space</kbd>
          Play/Pause
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">←</kbd>
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">→</kbd>
          Navigate
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">Ctrl+C</kbd>
          Mark Complete
        </span>
      </div>
    </div>
  );
};

export default LessonHeader;