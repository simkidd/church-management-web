import { IUser } from "./user.interface";

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  instructor?: IUser;
  thumbnail?: {
    url: string;
    publicId: string;
  };
  lessons?: ILesson[];
  isPublished: boolean;
  enrolledStudents: IUser[];
  duration: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  progress?: {
    overallProgress: number;
    completedLessons: number;
    totalLessons: number;
    lastAccessedAt?: string;
    isEnrolled: boolean;
  };
}

export interface ILesson {
  _id: string;
  title: string;
  content: string;
  video?: {
    url: string;
    publicId: string;
  };
  duration?: number;
  order: number;
}

export interface ListCourseParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  isPublished?: boolean;
}
