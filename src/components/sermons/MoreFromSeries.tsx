"use client";
import useMoreFromSeries from "@/hooks/use-more-from-series";
import { ISermon } from "@/interfaces/sermon.interface";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const MoreFromSeries = ({ sermon }: { sermon: ISermon }) => {
  const { sermons, isPending } = useMoreFromSeries({
    seriesId: sermon?.series?._id,
    excludeSermonId: sermon?._id,
    limit: 4,
  });

  if (!sermon?.series || sermons.length === 0) return null;

  return (
    <section className="mt-20 border-t border-gray-100 dark:border-white/10 pt-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-main dark:text-white">
          More from this Series
        </h2>
        <Link
          className="text-sm font-bold text-primary dark:text-primary-light hover:text-primary-hover flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
          href="#"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isPending
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                {/* Thumbnail skeleton */}
                <Skeleton className="aspect-video rounded-xl w-full" />

                {/* Title skeleton */}
                <div className="px-1 space-y-2">
                  <Skeleton className="h-5 w-4/5" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            ))
          : sermons.map((sermon) => (
              <Link
                key={sermon._id}
                className="group flex flex-col gap-3"
                href={`/sermons/${sermon.slug}`}
              >
                <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-gray-100 dark:bg-white/5">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    data-alt="Open bible on a wooden table with warm lighting"
                    style={{
                      backgroundImage: `url('${sermon.thumbnail?.url}')`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                    42:15
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium mb-1">
                    {format(new Date(sermon.datePreached), "MMM dd, yyyy")}
                  </p>
                  <h3 className="text-base font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1 truncate">
                    {sermon.description}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default MoreFromSeries;
