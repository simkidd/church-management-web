import { ILesson } from "./lesson.interface";
import { IUser } from "./user.interface";

export interface ILessonProgress {
  user: IUser;
  lesson: ILesson;

  completed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IProgressStats {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}
