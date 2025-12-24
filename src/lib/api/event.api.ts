import { ListEventsParams, IEvent } from "@/interfaces/event.interface";
import { ApiResponse, PaginatedResponse } from "@/interfaces/response.interface";
import api from "../axios";

export const eventsApi = {
  // Get all events with filters
  getAllEvents: async (
    params?: ListEventsParams
  ): Promise<ApiResponse<PaginatedResponse<IEvent>>> => {
    const response = await api.get("/events", { params });
    return response.data;
  },

  // Get event by ID
  getEventById: async (id: string): Promise<ApiResponse<IEvent>> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
}