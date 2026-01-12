"use client";

import { IEvent, ListEventsParams } from "@/interfaces/event.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import { eventsApi } from "@/lib/api/event.api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useEvents = (params?: ListEventsParams) => {
  /* -------------------------------------------------------------------------- */
  /*                               NORMAL QUERY                                 */
  /* -------------------------------------------------------------------------- */

  const {
    data: paginatedData,
    isPending: isPaginatedPending,
    isError: isPaginatedError,
    refetch: refetchPaginated,
  } = useQuery<ApiResponse<PaginatedResponse<IEvent>>>({
    queryKey: ["allEvents", params],
    queryFn: () => eventsApi.getAllEvents(params),
  });

  const paginated = useMemo(() => {
    if (!paginatedData || isPaginatedPending || isPaginatedError) {
      return {
        events: [],
        totalEvents: 0,
        totalPages: 0,
      };
    }

    return {
      events: paginatedData.data.data ?? [],
      totalEvents: paginatedData.data.pagination.totalItems ?? 0,
      totalPages: paginatedData.data.pagination.totalPages ?? 0,
    };
  }, [paginatedData, isPaginatedPending, isPaginatedError]);

  /* -------------------------------------------------------------------------- */
  /*                               INFINITE QUERY                               */
  /* -------------------------------------------------------------------------- */

  const {
    data: infiniteData,
    isPending: isInfinitePending,
    isError: isInfiniteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchInfinite,
  } = useInfiniteQuery<ApiResponse<PaginatedResponse<IEvent>>>({
    queryKey: ["infinite-events", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      eventsApi.getAllEvents({
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const infiniteEvents = infiniteData?.pages.flatMap((p) => p.data.data) ?? [];

  const infiniteTotalEvents =
    infiniteData?.pages[0]?.data.pagination.totalItems ?? 0;

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return {
    /* paginated */
    events: paginated.events,
    totalEvents: paginated.totalEvents,
    totalPages: paginated.totalPages,
    isPending: isPaginatedPending,
    isError: isPaginatedError,
    refetch: refetchPaginated,

    /* infinite */
    infiniteEvents,
    infiniteTotalEvents,
    isInfinitePending,
    isInfiniteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchInfinite,
  };
};

export default useEvents;
