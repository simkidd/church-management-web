import { ISermon, ListSermonsParams } from "@/interfaces/sermon.interface";
import api from "../axios";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";

export const sermonsApi = {
  // Get all sermons with filters
  getAllSermons: async (
    params?: ListSermonsParams
  ): Promise<ApiResponse<PaginatedResponse<ISermon>>> => {
    const response = await api.get("/sermons", { params });
    return response.data;
  },

  // Get sermon by ID
  getSermonById: async (id: string): Promise<ApiResponse<ISermon>> => {
    const response = await api.get(`/sermons/${id}`);
    return response.data;
  },

  // Get sermon by ID
  getSermonBySlug: async (slug: string): Promise<ApiResponse<ISermon>> => {
    const response = await api.get(`/sermons/slug/${slug}`);
    return response.data;
  },

  // Get popular sermons
  getPopular: async (limit?: number): Promise<ApiResponse<ISermon[]>> => {
    const response = await api.get("/sermons/popular", {
      params: { limit },
    });
    return response.data;
  },

  // Increment view count
  trackView: async (id: string): Promise<{ views: number }> => {
    const response = await api.post(`/sermons/${id}/track-view`);
    return response.data;
  },

  // save sermon
  toggleSaveSermon: async (sermonId: string) => {
    const response = await api.post(`/sermons/${sermonId}/save`);
    return response.data;
  },

  // get saved sermons
  getMySavedSermons: async (): Promise<
    ApiResponse<{ sermons: ISermon[]; sermonIds: string[] }>
  > => {
    const response = await api.get("/sermons/me/saved-sermons");
    return response.data;
  },
};
