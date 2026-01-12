"use client";
import React from "react";
import EventCard from "./EventCard";
import { ChevronDown, Lightbulb, Quote, Users2 } from "lucide-react";
import useEvents from "@/hooks/useEvents";
import useWeeklyHighlights from "@/hooks/useWeeklyHighlights";
import { IWeeklyHighlight } from "@/interfaces/event.interface";
import EventCardSkeleton from "./EventCardSkeleton";

// Weekly Highlight Item Component
const HighlightItem = ({ highlight }: { highlight: IWeeklyHighlight }) => (
  <li className="flex gap-4 items-center group cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-xl transition-colors">
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl h-12 w-12 shrink-0 flex items-center justify-center text-primary font-bold shadow-sm group-hover:border-primary/30 transition-colors">
      {highlight.day}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-primary transition-colors">
        {highlight.title}
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {highlight.time}
      </p>
    </div>
  </li>
);

const EventsGridContent = () => {
  const {
    infiniteEvents,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInfinitePending,
  } = useEvents();
  const { highlights, isPending: highlightsPending } = useWeeklyHighlights();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 container px-4 mx-auto">
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isInfinitePending
            ? Array.from({ length: 4 }).map((_, idx) => (
                <EventCardSkeleton key={idx} />
              ))
            : infiniteEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
        </div>

        {hasNextPage && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              {isFetchingNextPage ? "Loading..." : "Load More Events"}
              <ChevronDown />
            </button>
          </div>
        )}
      </div>
      <aside className="lg:col-span-4 space-y-8">
        <div className="bg-accent-warm dark:bg-surface-dark rounded-2xl p-6 border border-amber-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="size-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
              <Lightbulb size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              This Week&apos;s Highlights
            </h3>
          </div>
          <ul className="space-y-4 relative z-10">
            {highlightsPending ? (
              <p className="text-sm text-slate-500">Loading highlights...</p>
            ) : highlights.length === 0 ? (
              <p className="text-sm text-slate-500">No events this week</p>
            ) : (
              highlights.map((highlight) => (
                <HighlightItem key={highlight.id} highlight={highlight} />
              ))
            )}
          </ul>
        </div>

        {/* verse of the day */}
        <div className="bg-linear-to-br from-primary to-primary-dark rounded-2xl p-6 shadow-lg shadow-primary/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Quote size={60} />
          </div>
          <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">
            Verse of the Day
          </h3>
          <p className="text-white italic font-serif text-xl leading-relaxed mb-6 relative z-10">
            &apos;For where two or three are gathered in my name, there am I
            among them.&apos;
          </p>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-blue-300/50"></div>
            <p className="text-sm font-bold text-white">— Matthew 18:20</p>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-soft">
          <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4">
            <Users2 />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Get Involved
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Discover your purpose by joining one of our ministries. There is a
            place for everyone in Dominion City.
          </p>
          <button className="w-full py-3 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light font-bold text-sm transition-all bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
            Browse Ministries
          </button>
        </div>
      </aside>
    </div>
  );
};

export default EventsGridContent;
