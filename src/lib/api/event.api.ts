import {
  ListEventsParams,
  IEvent,
  IWeeklyHighlight,
} from "@/interfaces/event.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
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

  getWeeklyHighlights: async (): Promise<ApiResponse<IWeeklyHighlight[]>> => {
    const response = await api.get(`/events/weekly-highlights`);
    return response.data;
  },
  
  getFeaturedEvents: async (): Promise<ApiResponse<IEvent[]>> => {
    const response = await api.get(`/events/featured`);
    return response.data;
  },
};
