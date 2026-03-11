"use client";

import { ChevronLeft, ChevronRight, LogOut, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuizFooterActions = ({
  currentIndex,
  totalQuestions,
  remainingQuestions,
  isSubmitting,
  onPrevious,
  onNext,
  onOpenSubmitDialog,
  onOpenLeaveDialog,
}: {
  currentIndex: number;
  totalQuestions: number;
  remainingQuestions: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onOpenSubmitDialog: () => void;
  onOpenLeaveDialog: () => void;
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {remainingQuestions === 0
              ? "All questions answered"
              : `${remainingQuestions} question(s) remaining`}
          </p>
          <p className="text-sm text-slate-500">
            You can move between questions before submitting.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={onOpenLeaveDialog}>
            <LogOut className="h-4 w-4" />
            Leave quiz
          </Button>

          <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {!isLast ? (
            <Button onClick={onNext} className="text-white">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onOpenSubmitDialog} disabled={isSubmitting} className="text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit quiz
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizFooterActions;