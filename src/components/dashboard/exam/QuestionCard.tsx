"use client"
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { IQuestion } from "@/interfaces/exam.interface";

interface QuestionCardProps {
  currentQuestion: IQuestion;
  currentQuestionIndex: number;
  answers: { [key: string]: string };
  questions: IQuestion[];
  onAnswerSelect: (questionId: string, answer: string) => void;
  onQuestionNavigate: (index: number) => void;
}

const QuestionCard = ({
  currentQuestion,
  currentQuestionIndex,
  answers,
  questions,
  onAnswerSelect,
  onQuestionNavigate,
}: QuestionCardProps) => {
  const isAnswered = !!answers[currentQuestion._id];

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "mcq":
        return (
          <div className="space-y-2">
            {currentQuestion.options?.map((option: string, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion._id] === option
                    ? "border-blue-500 shadow-sm"
                    : "hover:border-slate-400 hover:shadow-sm"
                }`}
                onClick={() => onAnswerSelect(currentQuestion._id, option)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      answers[currentQuestion._id] === option
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-slate-300 "
                    }`}
                  >
                    {answers[currentQuestion._id] === option && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className=" leading-relaxed">
                    {option}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "true-false":
        return (
          <div className="space-y-3">
            {["True", "False"].map((option) => (
              <div
                key={option}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion._id] === option
                    ? "border-blue-500 shadow-sm"
                    : "hover:border-slate-400 hover:shadow-sm"
                }`}
                onClick={() => onAnswerSelect(currentQuestion._id, option)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      answers[currentQuestion._id] === option
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-slate-300 "
                    }`}
                  >
                    {answers[currentQuestion._id] === option && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="leading-relaxed font-medium">
                    {option}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "short-answer":
        return (
          <div className="space-y-2">
            <textarea
              value={answers[currentQuestion._id] || ""}
              onChange={(e) =>
                onAnswerSelect(currentQuestion._id, e.target.value)
              }
              placeholder="Type your answer here..."
              className="w-full min-h-[120px] p-3 border-2 rounded-lg resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <p className="text-xs text-slate-500">
              Your answer will be reviewed for keyword matches and may require
              manual grading.
            </p>
          </div>
        );

      default:
        return (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unknown question type: {currentQuestion.type}
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <Card className="">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Question {currentQuestionIndex + 1}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700"
          >
            {currentQuestion.points} point
            {currentQuestion.points !== 1 ? "s" : ""}
          </Badge>
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            {currentQuestion.type === "mcq" && "Multiple Choice"}
            {currentQuestion.type === "true-false" && "True/False"}
            {currentQuestion.type === "short-answer" && "Short Answer"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium  leading-relaxed">
              {currentQuestion.questionText}
            </h3>
            {currentQuestion.type === "short-answer" && (
              <p className="text-sm text-muted-foreground mt-2">
                Provide a detailed answer in the space below.
              </p>
            )}
          </div>

          {renderQuestionContent()}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2
              className={`h-4 w-4 ${
                isAnswered ? "text-green-600" : "text-muted-foreground"
              }`}
            />
            {isAnswered ? "Answered" : "Not Answered"}
          </div>

          {/* Question Numbers Pagination */}
          <div className="flex items-center gap-1">
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={
                  currentQuestionIndex === index
                    ? "default"
                    : "outline"
                }
                size="sm"
                className={`h-8 w-8 p-0 text-xs ${
                  currentQuestionIndex === index
                    ? "bg-blue-600 text-white"
                    : answers[questions[index]._id]
                    ? "bg-slate-600 text-white"
                    : "bg-white text-slate-700 border-slate-300"
                }`}
                onClick={() => onQuestionNavigate(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;