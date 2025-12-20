import { ApiResponse } from "@/interfaces/response.interface";
import api from "../axios";
import { IUser } from "@/interfaces/user.interface";
import { UserFormData } from "@/components/account/settings/UserprofileForm";

export const usersApi = {
  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<IUser>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (
    data: UserFormData
  ): Promise<
    ApiResponse<{
      user: IUser;
    }>
  > => {
    const response = await api.patch(`/users/profile`, data);
    return response.data;
  },

  // Update user avatar
  updateUserAvatar: async (
    id: string,
    avatarFile: File
  ): Promise<
    ApiResponse<{
      user: IUser;
    }>
  > => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await api.patch(`/users/${id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete user avatar
  deleteUserAvatar: async (
    id: string
  ): Promise<
    ApiResponse<{
      user: IUser;
    }>
  > => {
    const response = await api.delete(`/users/${id}/remove-avatar`);
    return response.data;
  },
}