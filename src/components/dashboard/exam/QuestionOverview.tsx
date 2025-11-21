import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IQuestion } from "@/interfaces/exam.interface";

interface QuestionOverviewProps {
  answers: { [key: string]: string };
  questions: IQuestion[];
}

const QuestionOverview = ({ answers, questions }: QuestionOverviewProps) => {
  return (
    <Card className=" sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2 ">
          <BarChart3 className="h-4 w-4" />
          Question Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(answers).length}
              </div>
              <div className="text-xs text-slate-600">Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">
                {questions.length}
              </div>
              <div className="text-xs text-slate-600">Total</div>
            </div>
          </div>

          <Progress
            value={(Object.keys(answers).length / questions.length) * 100}
            className="h-2 mb-4"
          />

          <p className="text-sm text-slate-600">
            Progress: {Object.keys(answers).length} of {questions.length}{" "}
            questions answered
          </p>
        </div>

        <div className="mt-4 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-600"></div>
            <span>Current Question</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-300"></div>
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-600"></div>
            <span>Answered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionOverview;