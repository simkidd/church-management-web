"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCourses from "@/hooks/use-courses";
import { ListCourseParams } from "@/interfaces/course.interface";
import { debounce } from "@/utils/helpers/debounce";
import { BookOpen, RefreshCw, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import CourseCard from "./CourseCard";
import { CourseCardSkeleton } from "./CourseCardSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { getPaginationRange } from "@/components/shared/DataTable";

export function CourseGrid() {
  const [filters, setFilters] = useState<ListCourseParams>({
    page: 1,
    limit: 10,
  });

  const { courses, isPending, totalPages, refetch } = useCourses(filters);

  const onPaginationChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const hasActiveFilters = filters.search || filters.isPublished !== undefined;

  return (
    <div className="space-y-6">
      <div>
        <div>
          {isPending ? (
            <>
              <div className="pb-6">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            </>
          ) : !courses || courses.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No courses found"
              description="Try adjusting your filters or search terms."
              action={
                hasActiveFilters && (
                  <Button variant="outline" onClick={() => refetch()}>
                    Refresh
                  </Button>
                )
              }
            />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>

              {courses.length > 0 && totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => onPaginationChange(filters.page! - 1)}
                        aria-disabled={filters.page === 1}
                        className={cn(
                          "cursor-pointer",
                          filters.page === 1 && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>

                    {getPaginationRange(filters.page!, totalPages).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === filters.page}
                            onClick={() => onPaginationChange(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => onPaginationChange(filters.page! + 1)}
                        aria-disabled={filters.page! >= totalPages}
                        className={cn(
                          "cursor-pointer",
                          filters.page! >= totalPages &&
                            "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
