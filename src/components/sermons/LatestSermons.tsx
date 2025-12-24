"use client";
import useSermons from "@/hooks/useSermons";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ISermon } from "@/interfaces/sermon.interface";
import { format } from "date-fns";
import { formatVideoDuration } from "@/utils/helpers/time";

// Sermon Card Component
const SermonCard: React.FC<{ sermon: ISermon }> = ({ sermon }) => {
  return (
    <Link href={`/sermons/${sermon.slug}`}>
      <article className="group cursor-pointer flex flex-col gap-3 card-hover-scale">
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-soft">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            aria-label={sermon.title}
            style={{ backgroundImage: `url('${sermon.thumbnail?.url}')` }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-primary/90 backdrop-blur-md p-3.5 rounded-full shadow-lg shadow-black/20 text-white transform scale-90 group-hover:scale-100 transition-transform">
              <Play size={36} />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
            {formatVideoDuration(sermon.duration)}
          </div>
          {/* {sermon.showProgressBar && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-accent-warm-2 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              style={{ width: `${sermon.progressPercentage}%` }}
            ></div>
          </div>
        )} */}
        </div>
        <div className="px-1">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
            {sermon.title}
          </h4>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              {sermon.preacher.firstName + " " + sermon.preacher.lastName} •{" "}
              {format(sermon.datePreached, "MMM dd")}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

// Loading Skeleton Component
const SermonCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Thumbnail skeleton */}
      <Skeleton className="aspect-video rounded-2xl w-full" />

      {/* Title skeleton */}
      <div className="px-1 space-y-2">
        <Skeleton className="h-5 w-4/5" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
};

const LatestSermons: React.FC = () => {
  const { sermons, isPending } = useSermons({
    page: 1,
    limit: 4,
  });

  return (
    <section
      className="fade-in-up container px-4 mx-auto"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-accent-warm-2 rounded-full"></div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Latest Sermons
          </h3>
        </div>

        {!isPending && (
          <Link
            className="text-sm font-bold text-primary dark:text-primary-light hover:text-primary-hover flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
            href="/sermons/archive"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isPending
          ? Array.from({ length: 4 }).map((_, index) => (
              <SermonCardSkeleton key={index} />
            ))
          : sermons.map((sermon) => (
              <SermonCard key={sermon._id} sermon={sermon} />
            ))}
      </div>
    </section>
  );
};

export default LatestSermons;
