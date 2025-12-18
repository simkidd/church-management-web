"use client";

import { ApiResponse } from "@/interfaces/response.interface";
import { ISermon } from "@/interfaces/sermon.interface";
import { sermonsApi } from "@/lib/api/sermon.api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const usePopularSermons = (limit: number = 6) => {
  const { data, isPending, isError, refetch } = useQuery<
    ApiResponse<ISermon[]>
  >({
    queryKey: ["popularSermons", limit],
    queryFn: async () => sermonsApi.getPopular(limit),
  });

  const sermons = useMemo(() => {
    if (!data || isPending || isError) return [];
    return data.data || [];
  }, [data, isPending, isError]);

  return {
    sermons,
    isPending,
    isError,
    refetch,
  };
};

export default usePopularSermons;
