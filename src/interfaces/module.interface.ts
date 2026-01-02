import { ICourse } from "./course.interface";
import { ILessonWithState } from "./lesson.interface";
import { IQuiz } from "./quiz.interface";

export interface IModule {
  _id: string;
  course: ICourse;
  title: string;
  order: number;
  quiz?: IQuiz;
}

export interface IModuleWithLessons extends IModule {
  lessons?: ILessonWithState[];
}