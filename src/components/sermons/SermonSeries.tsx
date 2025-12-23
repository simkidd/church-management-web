"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import useSeries from "@/hooks/useSeries";
import { ISeries } from "@/interfaces/series.interface";
import { Skeleton } from "../ui/skeleton";

// Sermon Series Card Component
const SermonSeriesCard: React.FC<{ series: ISeries }> = ({ series }) => {
  return (
    <Link href={`/sermons/archive?series=${series.slug}`}>
      <div className="group relative overflow-hidden rounded-2xl aspect-4/3 md:aspect-3/2 shadow-md hover:shadow-xl transition-all border border-slate-200/50 dark:border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          aria-label={series.title}
          style={{ backgroundImage: `url('${series.thumbnail?.url}')` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h4 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-sm group-hover:text-accent-warm transition-colors">
            {series.title}
          </h4>
          <p className="text-slate-200 text-sm line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
            {series.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Sermon Series Skeleton Card Component
const SermonSeriesSkeletonCard: React.FC = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl aspect-4/3 md:aspect-3/2 shadow-md border border-slate-200/50 dark:border-slate-800">
      <Skeleton className="absolute inset-0 w-full h-full bg-white dark:bg-slate-800/50" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <Skeleton className="h-7 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </div>
    </div>
  );
};

const SermonSeries: React.FC = () => {
  const { series, isPending } = useSeries({
    page: 1,
    limit: 7,
  });

  return (
    <section
      className="fade-in-up container px-4 mx-auto"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-accent-warm-2 rounded-full"></div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Sermon Series
          </h3>
        </div>
        <div className="flex gap-2"></div>
      </div>

      {isPending ? (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <SermonSeriesSkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {series.map((series) => (
              <CarouselItem
                key={series._id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <SermonSeriesCard series={series} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-0 right-0 flex gap-2 z-10">
            <CarouselPrevious className="-top-10 -left-24 size-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm cursor-pointer" />
            <CarouselNext className="-top-10 right-0 size-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm cursor-pointer" />
          </div>
        </Carousel>
      )}
    </section>
  );
};

export default SermonSeries;
