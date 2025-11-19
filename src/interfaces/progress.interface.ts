import { ICourse, ILesson } from "./course.interface";
import { IUser } from "./user.interface";

export interface IProgress {
  _id: string;
  user: IUser;
  course: ICourse;
  lessonsProgress: ILessonProgress[];
  overallProgress: number;
  enrolledAt: string;
  lastAccessedAt: string;
  completedAt?: string;
  certificateIssued: boolean;
  certificateUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ILessonProgress {
  lessonId: ILesson;
  isCompleted: boolean;
  completedAt?: string;
  timeSpent?: number;
  lastAccessedAt?: Date;
}
