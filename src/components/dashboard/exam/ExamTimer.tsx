"use client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  timeRemaining: number;
  totalTime: number;
  compact?: boolean;
}

const ExamTimer = ({ timeRemaining, totalTime, compact = false }: ExamTimerProps) => {
  const [displayTime, setDisplayTime] = useState(timeRemaining);

  useEffect(() => {
    setDisplayTime(timeRemaining);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (displayTime < 300) {
      return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    } else if (displayTime < 900) {
      return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
    }
    return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
  };

  if (compact) {
    return (
      <div className={cn(
        "flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border",
        getTimerColor()
      )}>
        <Clock className="h-3 w-3" />
        <span>{formatTime(displayTime)}</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-lg border font-medium",
      getTimerColor()
    )}>
      <Clock className="h-4 w-4" />
      <span>Time: {formatTime(displayTime)}</span>
    </div>
  );
};

export default ExamTimer;