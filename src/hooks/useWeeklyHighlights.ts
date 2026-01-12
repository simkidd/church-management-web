"use client";

import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@/lib/api/event.api";
import { IWeeklyHighlight } from "@/interfaces/event.interface";
import { ApiResponse } from "@/interfaces/response.interface";

const useWeeklyHighlights = () => {
  const { data, isPending, isError, refetch } = useQuery<
    ApiResponse<IWeeklyHighlight[]>
  >({
    queryKey: ["weeklyHighlights"],
    queryFn: eventsApi.getWeeklyHighlights,
    staleTime: 1000 * 60 * 10, // 10 minutes (perfect for highlights)
  });

  return {
    highlights: data?.data ?? [],
    isPending,
    isError,
    refetch,
  };
};

export default useWeeklyHighlights;
