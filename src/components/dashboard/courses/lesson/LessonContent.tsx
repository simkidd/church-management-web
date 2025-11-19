import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ILesson } from "@/interfaces/course.interface";
import { FileText } from "lucide-react";

interface LessonContentProps {
  currentLesson: ILesson;
}

const LessonContent = ({ currentLesson }: LessonContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Lesson Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed whitespace-pre-wrap text-muted-foreground">
            {currentLesson.content}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonContent;