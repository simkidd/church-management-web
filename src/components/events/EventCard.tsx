"use client"
import { IEvent } from "@/interfaces/event.interface";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";

const getEventDateParts = (date: string) => ({
  month: format(new Date(date), "MMM"),
  day: format(new Date(date), "dd"),
});

const EventCard = ({ event }: { event: IEvent }) => {
  const { day, month } = getEventDateParts(event.startDate);

  const dateLabel = event.isMultiDay
    ? `${format(new Date(event.startDate), "MMM dd")} - ${format(
        new Date(event.endDate),
        "MMM dd"
      )}`
    : format(new Date(event.startDate), "EEEE, MMM dd");

  return (
    <article className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-slate-100 dark:border-slate-800 group h-full">
      <div className="relative h-52 overflow-hidden">
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-16 shadow-lg z-10 border border-slate-100 dark:border-slate-800">
          <span className="block text-[11px] font-bold text-primary dark:text-primary-light tracking-widest uppercase">
            {month}
          </span>
          <span className="block text-2xl font-black text-slate-800 dark:text-white leading-none mt-0.5">
            {day}
          </span>
        </div>

        {event.image?.url && (
          <Image
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={event.title}
            src={event.image?.url}
            fill
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/50 to-transparent opacity-60"></div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light uppercase tracking-wide border border-primary/10">
            {event.isMultiDay ? "Multi-Day Event" : "Single Event"}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">
          {event.title}
        </h3>
        <div className="flex flex-col gap-2.5 mb-6 text-slate-500 dark:text-slate-400 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-primary-light">
              <Calendar size={16} />
            </div>
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-primary-light">
              <MapPin size={16} />
            </div>
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 italic">
            {event.requiresRegistration
              ? "Registration required"
              : "Open to all"}
          </span>

          <button className="text-primary dark:text-primary-light hover:text-primary-dark font-bold text-sm flex items-center gap-1 group/btn cursor-pointer">
            Details
            <ArrowRight
              size={18}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
