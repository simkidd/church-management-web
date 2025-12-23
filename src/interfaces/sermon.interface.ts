import { ISeries } from "./series.interface";
import { IUser } from "./user.interface";

export interface ISermon {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  keyTakeaways?: string[];
  series?: ISeries;
  preacher: IUser;
  video: IMedia;
  audioUrl?: string | null;
  thumbnail?: IMedia | null;
  datePreached: string;
  duration?: number;
  scripture?: string;
  tags?: string[];
  category?: string;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMedia {
  url: string;
  publicId: string;
  type: string;
}

export interface ListSermonsParams {
  page: number;
  limit?: number;
  preacher?: string;
  search?: string;
  tags?: string;
  startDate?: string;
  endDate?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: string;
}
