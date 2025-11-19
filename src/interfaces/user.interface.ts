export interface IUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  avatar: IAvatar;
  address: string;
  city: string;
  state: string;
  role: Role;
  isVerified: boolean;
  status: AccountStatus;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;

  isAdmin: boolean;
  isSuperAdmin: boolean;
  isInstructor: boolean;
  isPastor: boolean;
}

export type Gender = "male" | "female";
export type Role = "super-admin" | "admin" | "pastor" | "instructor" | "member";
export type AccountStatus = "active" | "inactive" | "suspended" | "banned";

export interface IAvatar {
  url: string;
  publicId: string;
}
