import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { ILesson } from "@/interfaces/course.interface";

interface CompletionCardProps {
  isCompleted: boolean;
  isMarkingComplete: boolean;
  videoProgress: number;
  currentLesson: ILesson;
  onMarkComplete: () => void;
}

const CompletionCard = ({
  isCompleted,
  isMarkingComplete,
  videoProgress,
  currentLesson,
  onMarkComplete,
}: CompletionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle2 className="h-5 w-5" />
          {isCompleted ? "Lesson Completed" : "Mark Complete"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCompleted ? (
          <>
            <Button
              className="w-full h-12"
              onClick={onMarkComplete}
              disabled={isMarkingComplete}
              variant="default"
            >
              {isMarkingComplete ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Marking Complete...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Mark as Complete
                </div>
              )}
            </Button>

            {currentLesson?.video?.url && videoProgress > 0 && (
              <div className="text-xs text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Video Progress</span>
                  <span>{Math.round(videoProgress)}%</span>
                </div>
                <Progress value={videoProgress} className="h-1" />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="font-semibold text-green-600">Lesson Completed</p>
            <p className="text-sm text-muted-foreground mt-1">
              Completed on {new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompletionCard;