"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useSermons from "@/hooks/useSermons";
import { format } from "date-fns";
import { Calendar, PlayCircle, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export const FeaturedSermons = () => {
  const { sermons, isPending } = useSermons({
    page: 1,
    limit: 3,
    isFeatured: true,
  });

  if (isPending) {
    return (
      <section className="px-4 py-5">
        <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[400px] md:min-h-[500px] shadow-xl shadow-primary/5">
          <Skeleton className="absolute inset-0" />
          <div className="relative z-10 p-6 md:p-10 lg:p-14 w-full max-w-4xl flex flex-col gap-4 md:gap-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <div className="flex flex-wrap gap-4 pt-2">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!sermons || sermons.length === 0) {
    return (
      <section className="px-4 py-5">
        <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-xl">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
              No Featured Sermons Available
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Check back later for new featured sermon content
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-5">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {sermons.map((sermon) => {
            // Format the date
            const formattedDate = format(
              new Date(sermon.datePreached),
              "MMM d, yyyy"
            );

            // Get preacher name
            const preacherName = sermon.preacher
              ? `${sermon.preacher.firstName} ${sermon.preacher.lastName}`
              : "Pastor";

            return (
              <CarouselItem key={sermon._id}>
                <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end shadow-xl shadow-primary/5">
                  {/* Background Image using next/image */}
                  <div className="absolute inset-0">
                    <Image
                      src={sermon.thumbnail?.url || ""}
                      alt={sermon.title || "Featured Sermon"}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-slate-900/60 to-transparent mix-blend-multiply opacity-90"></div>
                  <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-transparent to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-10 lg:p-14 w-full max-w-4xl flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-3">
                      <span className="bg-accent-warm-2 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-glow">
                        Featured
                      </span>
                      <span className="text-slate-200 text-sm font-medium flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                        <Calendar size={14} />
                        {formattedDate}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                      {sermon.title}
                    </h1>
                    <p className="text-slate-100 text-base md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed opacity-95 text-shadow-sm whitespace-pre-wrap line-clamp-3 truncate">
                      {sermon.description ||
                        `Join ${preacherName} as they share insights from ${
                          sermon.scripture || "Scripture"
                        }.`}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link href={`/sermons/${sermon.slug}`}>
                        <button className="bg-white hover:bg-slate-50 text-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                          <PlayCircle />
                          Watch Sermon
                        </button>
                      </Link>
                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all border border-white/20 hover:border-white/40 cursor-pointer">
                        <Plus />
                        Add to List
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2">
          {sermons.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/50"
              data-active={index === 0}
              // Note: You'd need to handle active state based on carousel position
              // This is a simple static version
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};
