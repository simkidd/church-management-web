import { ILesson } from "./lesson.interface";
import { IUser } from "./user.interface";

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  instructor: IUser;
  thumbnail: IMedia;
  introVideo: IMedia;
  duration: string; // e.g. "6 weeks", "3 months", "1 year"
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  progressionMode: "free" | "sequential";
  learningObjectives: string[];

  enrollment?: {
    isEnrolled: boolean;
    status: "active" | "completed" | "cancelled" | null;
  };
  progress?: {
    percentage: number;
    completedLessons: number;
    totalLessons: number;
    courseCompleted: boolean;
  };

  status?: "in-progress" | "completed";
}

export interface IMedia {
  url: string;
  publicId: string;
}
export interface ListCourseParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: "asc" | "desc";
  sortBy?: "createdAt" | "enrolledCount" | "rating" | "title";
  isPublished?: boolean;
  isFeatured?: boolean;
}

export interface ICourseEnrollment {
  _id: string;
  user: string;
  course: string;
  enrolledAt: string;
  completedAt: string | null;
  status: "active" | "completed" | "cancelled";
  progressPercentage: number;
  certificateIssued: boolean;
}

export interface IMaterialFile {
  url: string;
  publicId?: string;
}

export interface ILessonMaterial {
  _id: string;
  lesson: ILesson;
  title: string;
  file: IMaterialFile;
  isDownloadable: boolean;
  createdAt: string;
  updatedAt: string;
}
