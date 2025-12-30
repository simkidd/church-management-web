import { IMedia } from "./sermon.interface";

export interface ILesson {
  _id: string;
  module: string;
  title: string;
  content: string;

  video?: IMedia;
  duration?: number;

  order: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  isGloballyLocked?: boolean;
}

export interface IMarkLessonCompleteResponse {
  lessonId: string;
  moduleCompleted: boolean;
  nextLessonId: string | null;
}

export interface ILessonWithState extends ILesson {
  isCompleted: boolean;
  isLockedForUser: boolean;
}