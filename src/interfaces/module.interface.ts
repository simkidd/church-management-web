import { ILessonWithState } from "./lesson.interface";
import { IQuiz } from "./quiz.interface";

export interface IModule {
  _id: string;
  course: string;
  title: string;
  order: number;
  quiz?: IQuiz;
}

export interface IModuleWithLessons extends IModule {
  lessons?: ILessonWithState[];
}