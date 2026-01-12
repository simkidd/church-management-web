"use client";
import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/lib/api/event.api";
import { IEvent } from "@/interfaces/event.interface";
import { ApiResponse } from "@/interfaces/response.interface";

const useFeaturedEvents = () => {
  const { data, isLoading, isError, refetch } = useQuery<ApiResponse<IEvent[]>>(
    {
      queryKey: ["featuredEvents"],
      queryFn: async () => eventsApi.getFeaturedEvents(),
    }
  );

  return { featuredEvents: data?.data ?? [], isLoading, isError, refetch };
};

export default useFeaturedEvents;
