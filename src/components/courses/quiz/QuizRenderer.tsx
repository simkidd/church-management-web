"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionItem from "./QuestionItem";
import { IQuiz, IQuizQuestion } from "@/interfaces/quiz.interface";

interface QuizRendererProps {
  quiz: IQuiz;
  questions: IQuizQuestion[];
}

export default function QuizRenderer({ quiz, questions }: QuizRendererProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    // TODO: POST /quiz-attempts or /quiz/submit
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <p className="text-slate-500 mt-1">Module: {quiz.module.title}</p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <QuestionItem
            key={q._id}
            index={index}
            question={q}
            value={answers[q._id]}
            onChange={handleChange}
          />
        ))}
      </div>

      <Button onClick={handleSubmit} className="mt-6">
        Submit Quiz
      </Button>
    </div>
  );
}
