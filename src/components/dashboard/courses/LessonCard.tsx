import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, FileText, CheckCircle2, Clock } from "lucide-react";
import { ILesson } from "@/interfaces/course.interface";

interface LessonCardProps {
  lesson: ILesson;
  isCompleted: boolean;
  onSelect: (lessonId: string) => void;
}

export const LessonCard = ({ lesson, isCompleted, onSelect }: LessonCardProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getLessonIcon = () => {
    if (isCompleted) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (lesson.video) return <PlayCircle className="h-5 w-5 text-muted-foreground" />;
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-border"
      onClick={() => onSelect(lesson._id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-muted mt-1">
              {getLessonIcon()}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">
                {lesson.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {lesson.content}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDuration(lesson.duration || 0)}</span>
                </div>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};