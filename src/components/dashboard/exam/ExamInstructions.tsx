import { HelpCircle, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ExamInstructions = () => {
  return (
    <Card className="">
      <CardHeader >
        <CardTitle className="text-sm flex items-center gap-2 ">
          <HelpCircle className="h-4 w-4" />
          Exam Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-600">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <span>The exam will auto-submit when time expires</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <span>Answer all questions before submitting</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <span>You can navigate between questions freely</span>
          </div>
        </div>

        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 text-xs">
            Do not refresh the page or navigate away during the exam
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ExamInstructions;
