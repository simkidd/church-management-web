"use client";
import useSermons from "@/hooks/useSermons";
import { ListSermonsParams } from "@/interfaces/sermon.interface";
import React, { useState } from "react";
import SermonFilters from "./SermonFilters";
import { Skeleton } from "../ui/skeleton";
import { SermonCard } from "./SermonCard";

const SermonsPageComp = () => {
  const [filters, setFilters] = useState<ListSermonsParams>({
    page: 1,
    limit: 12,
    isPublished: true,
  });

  const { sermons, totalSermons, totalPages, isPending, isError } =
    useSermons(filters);

  const handleFilterChange = (newFilters: ListSermonsParams) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Sermons
          </h2>
          <p className="text-muted-foreground">
            Unable to load sermons at this time. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sermons</h1>
        <p className="text-muted-foreground">
          Watch and listen to messages that inspire faith and transform lives.
        </p>
      </div>

      <SermonFilters
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full aspect-video" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : sermons.length === 0 ? (
        <div className="text-xl font-semibold mb-2">
          <h3 className="text-muted-foreground">No sermons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for new sermons.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {sermons.length} of {totalSermons} sermons
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sermons.map((sermon) => (
              <SermonCard key={sermon._id} sermon={sermon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SermonsPageComp;
