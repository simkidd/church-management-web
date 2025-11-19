import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle2 } from "lucide-react";

interface ExamCardProps {
  onTakeExam: () => void;
}

const ExamCard = ({ onTakeExam }: ExamCardProps) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-green-700">
          <GraduationCap className="h-5 w-5" />
          Ready for Exam!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-green-700">
          <p className="mb-3">
            🎉 Congratulations! You&apos;ve completed all lessons and are now ready to take the course exam.
          </p>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" />
              All lessons completed
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" />
              Ready for final assessment
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" />
              Certificate upon passing
            </li>
          </ul>
        </div>
        <Button
          onClick={onTakeExam}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <GraduationCap className="h-4 w-4" />
          Take Course Exam
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExamCard;