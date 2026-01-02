import { ICourse, ListCourseParams } from "@/interfaces/course.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import { courseApi } from "@/lib/api/course.api";
import { useAuthStore } from "@/stores/auth.store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useCourses = (params?: ListCourseParams) => {
  const { user, isLoading: isAuthLoading } = useAuthStore();

  const { data, isPending, isError, refetch } = useQuery<
    ApiResponse<PaginatedResponse<ICourse>>
  >({
    queryKey: ["courses", params],
    queryFn: async () => courseApi.getAllCourses(params),
  });

  // Infinite query version
  const infiniteQuery = useInfiniteQuery<
    ApiResponse<PaginatedResponse<ICourse>>,
    Error
  >({
    queryKey: ["courses-infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      courseApi.getAllCourses({
        ...params,
        page: pageParam as number,
        limit: params?.limit || 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.page < lastPage.data.pagination.totalPages) {
        return lastPage.data.pagination.page + 1;
      }
      return undefined;
    },
    enabled: !isAuthLoading && !!user,
    placeholderData: (prev) => prev,
  });

  const { courses, totalCourses, totalPages } = useMemo(() => {
    if (!data || isPending || isError)
      return { courses: [], totalCourses: 0, totalPages: 0 };

    return {
      courses: data.data.data || [],
      totalCourses: data.data.pagination.totalItems || 0,
      totalPages: data.data.pagination.totalPages || 0,
    };
  }, [data, isPending, isError]);

  return {
    courses,
    totalCourses,
    totalPages,
    isPending,
    isError,
    refetch,

    // Infinite query methods
    infiniteQuery: {
      ...infiniteQuery,
      courses:
        infiniteQuery.data?.pages.flatMap((page) => page.data.data) || [],
      isLoadingInfinite: infiniteQuery.isPending,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    },

    // Helper methods
    hasMore: infiniteQuery.hasNextPage,
    loadMore: infiniteQuery.fetchNextPage,
  };
};

export default useCourses;
