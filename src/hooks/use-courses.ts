import { ListCourseParams } from "@/interfaces/course.interface";
import { courseApi } from "@/lib/api/course.api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useCourses = (filters?: ListCourseParams) => {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["courses", filters],
    queryFn: ({ pageParam = 1 }) =>
      courseApi.getAllCourses({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const courses =
    infiniteQuery.data?.pages.flatMap((page) => page.data.data) ?? [];
  const hasMore = infiniteQuery.hasNextPage;

  const loadMore = () => {
    if (hasMore && !infiniteQuery.isFetchingNextPage) {
      infiniteQuery.fetchNextPage();
    }
  };

  return {
    infiniteQuery: {
      courses,
      isLoadingInfinite: infiniteQuery.isLoading,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      hasNextPage: infiniteQuery.hasNextPage,
      fetchNextPage: infiniteQuery.fetchNextPage,
      isError: infiniteQuery.isError,
      error: infiniteQuery.error,
    },
    hasMore,
    loadMore,
  };
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseApi.getCourseById(id),
    enabled: !!id,
  });
};

export const useCourseModules = (courseId: string) => {
  return useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: () => courseApi.getCourseModules(courseId),
    enabled: !!courseId,
  });
};

export const useEnroll = () => {
  return useMutation({
    mutationFn: courseApi.enrollInCourse,
  });
};

export default useCourses;
