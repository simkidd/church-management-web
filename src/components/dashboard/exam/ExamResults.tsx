/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Award,
  XCircle,
  FileText,
  CheckCircle2,
  RotateCcw,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface ExamResultsProps {
  course: any;
  results: any;
  userStatus: any;
  onRetakeExam: () => void;
  courseId: string;
}

const ExamResults = ({
  course,
  results,
  userStatus,
  onRetakeExam,
  courseId,
}: ExamResultsProps) => {
  // Safely destructure with defaults to handle undefined results
  const {
    score = 0,
    percentage = 0,
    isPassed = false,
    isGraded = true,
    answers = [],
    submission, // Handle case where results might be a submission object
  } = results || {};

  // Use submission data if available (from backend response structure)
  const finalScore = submission?.score ?? score;
  const finalPercentage = submission?.percentage ?? percentage;
  const finalIsPassed = submission?.isPassed ?? isPassed;
  const finalIsGraded = submission?.isGraded ?? isGraded;
  const finalAnswers = submission?.answers ?? answers;

  const correctAnswers = (finalAnswers || []).filter(
    (answer: any) => answer.isCorrect
  ).length;
  const totalQuestions = (finalAnswers || []).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card className="border shadow-2xl pt-0">
          <CardHeader className="text-center py-8 bg-linear-to-r from-muted/50 to-muted/30 rounded-t-lg">
            <div className="flex justify-center mb-4">
              {finalIsPassed ? (
                <div className="w-24 h-24 bg-linear-to-br from-green-100 to-emerald-200 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-linear-to-br from-red-100 to-orange-200 dark:from-red-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center shadow-lg">
                  <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
              )}
            </div>

            <CardTitle className="text-3xl sm:text-4xl font-bold mb-3 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {finalIsPassed ? "Congratulations! 🎉" : "Keep Learning!"}
            </CardTitle>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {finalIsPassed
                ? "You have successfully completed the course and passed the exam with flying colors!"
                : "Don't worry! Review the course material and try again. Every attempt is a learning opportunity."}
            </p>
          </CardHeader>

          <CardContent className="space-y-6 pt-8">
            {/* Score Card */}
            <Card>
              <CardContent className="">
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div className="space-y-2">
                    <div
                      className={`text-3xl font-bold ${
                        finalIsPassed 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {finalPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Final Score
                    </div>
                    <Progress
                      value={finalPercentage}
                      className={`h-2 ${
                        finalIsPassed 
                          ? "bg-green-100 dark:bg-green-900/30" 
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {correctAnswers}/{totalQuestions}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Correct Answers
                    </div>
                    <Progress
                      value={(correctAnswers / (totalQuestions || 1)) * 100}
                      className="h-2 bg-blue-100 dark:bg-blue-900/30"
                    />
                  </div>
                 
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            {/* {finalAnswers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Question Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {finalAnswers.map((answer: any, index: number) => (
                    <div
                      key={answer.questionId || answer.question?._id || index}
                      className={`p-4 rounded-lg border-2 ${
                        answer.isCorrect
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {answer.isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium mb-2">
                            {index + 1}.{" "}
                            {answer.question?.questionText || "Question"}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-muted-foreground">
                                Your answer:
                              </span>
                              <span
                                className={
                                  answer.isCorrect
                                    ? "text-green-700 dark:text-green-400 font-medium"
                                    : "text-red-700 dark:text-red-400 font-medium"
                                }
                              >
                                {answer.answer || "Not answered"}
                              </span>
                            </div>
                            {!answer.isCorrect &&
                              answer.question?.correctAnswer && (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-muted-foreground">
                                    Correct answer:
                                  </span>
                                  <span className="text-green-700 dark:text-green-400 font-medium">
                                    {answer.question.correctAnswer}
                                  </span>
                                </div>
                              )}
                            {answer.feedback && (
                              <div className="flex items-start gap-2 pt-1">
                                <span className="font-medium text-muted-foreground mt-0.5">
                                  Feedback:
                                </span>
                                <span className="text-muted-foreground">
                                  {answer.feedback}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )} */}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {!finalIsPassed && userStatus?.canRetake && (
                <Button
                  onClick={onRetakeExam}
                  size="lg"
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  <RotateCcw className="h-4 w-4" />
                  Retake Exam
                </Button>
              )}

              <Button
                asChild
                variant={finalIsPassed ? "default" : "outline"}
                size="lg"
                className="gap-2 shadow-lg"
              >
                <Link href={`/dashboard/courses/${courseId}`}>
                  <Home className="h-4 w-4" />
                  Back to Course
                </Link>
              </Button>

              {finalIsPassed && (
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <Award className="h-4 w-4" />
                  Download Certificate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamResults;