import { ICourse } from "./course.interface";

export interface IExam {
  _id: string;
  title: string;
  course: ICourse;
  questions: IQuestion[];
  questionCount?: number;
  passingScore: number;
  duration: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  submissionCount?: number;
  // Additional fields for the exam-taking experience
  examDetails?: {
    totalQuestions: number;
    totalPoints: number;
    timeLimit: number;
    passingScore: number;
  };
  userStatus?: {
    hasSubmitted: boolean;
    submissionId?: string;
    canRetake: boolean;
    previousScore?: number;
    previousResult?: "passed" | "failed";
    isGraded?: boolean;
  };
  previousResults?: {
    score: number;
    maxScore: number;
    percentage: number;
    isPassed: boolean;
    submittedAt: string;
    gradedAt: string;
  };
  hasFullAccess?: boolean;

  isActive: boolean; // NEW: Only one active exam per course
  status: "draft" | "published" | "archived"; // NEW: Better status management
  version: number; // NEW: Track exam versions
  maxAttempts?: number; // NEW: Limit retakes
  retakeDelay?: number; // NEW: Hours between retakes
  availableFrom?: Date; // NEW: Schedule exam availability
  availableUntil?: Date; // NEW: Schedule exam expiration
  description?: string; // NEW: Exam description
  instructions?: string; // NEW: Exam instructions
}

export interface IQuestion {
  _id: string;
  questionText: string;
  type: "mcq" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string;
  keywords?: string[];
  points: number;
  order: number;
}

export interface ISubmission {
  _id: string;
  exam: string | IExam;
  user: string;
  answers: IAnswer[];
  score: number;
  percentage: number;
  isGraded: boolean;
  isPassed: boolean;
  submittedAt: string;
  gradedAt?: string;
}

export interface IAnswer {
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  pointsAwarded?: number;
  feedback: string;
}

export interface CreateExamData {
  title: string;
  description?: string;
  course: string;
  duration: number;
  passingScore: number;
  isPublished?: boolean;
  questions: Omit<IQuestion, "id">[];
}

export interface UpdateExamData {
  title?: string;
  description?: string;
  duration?: number;
  passingScore?: number;
  isPublished?: boolean;
}

export interface ExamSubmissionData {
  answers: {
    questionId: string;
    answer: string;
  }[];
}

export interface IExamSubmission {
  _id?: string;
  exam: string;
  user: string;
  answers: Array<{
    question: string;
    answer: string;
    isCorrect: boolean | null;
    pointsAwarded: number;
    feedback: string;
  }>;
  score: number; // This should exist based on your backend
  maxScore: number;
  percentage: number;
  isGraded: boolean;
  isPassed: boolean;
  submittedAt: string;
  gradedAt?: string;
}

export interface IExamResult {
  submissionId: string;
  examTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  isGraded: boolean;
  passingScore: number;
  duration: number;
  submittedAt: string;
  gradedAt?: string;
  answers: Array<{
    questionId: string;
    questionText: string;
    questionType: string;
    userAnswer: string;
    correctAnswer?: string;
    isCorrect: boolean;
    pointsAwarded: number;
    maxPoints: number;
    feedback: string;
  }>;
  attemptInfo?: {
    attemptNumber: number;
    totalAttempts: number;
    maxAttempts: number;
    canRetake: boolean;
    nextRetakeAvailable?: string | null;
  };
}

export interface ManualGradeData {
  gradedAnswers: {
    questionId: string;
    pointsAwarded: number;
    feedback?: string;
  }[];
}

export interface ListExamsParams {
  page: number;
  limit?: number;
  course?: string;
  isPublished?: boolean;
  search?: string;
}

export interface ListExamSubmissonsParams {
  page?: number;
  limit?: number;
  graded?: boolean;
}

export interface IExamSubmissionResponse {
  submission: {
    id: string;
    score: number;
    percentage: number;
    isPassed: boolean;
    isGraded: boolean;
    maxScore: number;
    submittedAt: string;
    attemptNumber?: number;
  };
  message: string;
}

export interface IExamByCourseResponse {
  exam: IExam;
  userStatus: {
    hasSubmitted: boolean;
    submissionId?: string;
    attemptCount: number;
    canRetake: boolean;
    latestScore?: number;
    latestPassed?: boolean;
    isGraded?: boolean;
    nextRetakeAvailable?: string | null;
    maxAttempts: number;
  };
}
