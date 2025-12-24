"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/interfaces/response.interface";
import { ISermon } from "@/interfaces/sermon.interface";
import { seriesApi } from "@/lib/api/series.api";

interface UseMoreFromSeriesParams {
  seriesId?: string;
  excludeSermonId?: string;
  limit?: number;
}

const useMoreFromSeries = ({
  seriesId,
  excludeSermonId,
  limit = 6,
}: UseMoreFromSeriesParams) => {
  const { data, isPending, isError, refetch } = useQuery<
    ApiResponse<ISermon[]>
  >({
    queryKey: ["moreFromSeries", seriesId, excludeSermonId, limit],
    queryFn: () =>
      seriesApi.getMoreFromSeries({
        seriesId: seriesId!,
        exclude: excludeSermonId,
        limit,
      }),
    enabled: !!seriesId, // only run when series exists
  });

  return {
    sermons: data?.data || [],
    isPending,
    isError,
    refetch,
  };
};

export default useMoreFromSeries;
