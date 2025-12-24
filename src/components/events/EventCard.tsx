import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface IEvent {
  id: number;
  month: string;
  day: string;
  title: string;
  category: string;
  time: string;
  location: string;
  image: string;
  isOpenToAll: boolean;
}

const getCategoryColors = (category: string) => {
  switch (category.toLowerCase()) {
    case "bible study":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        darkBg: "dark:bg-amber-900/30",
        darkText: "dark:text-amber-300",
        border: "border-amber-100",
        darkBorder: "dark:border-amber-900/50",
      };
    case "youth":
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        darkBg: "dark:bg-indigo-900/30",
        darkText: "dark:text-indigo-300",
        border: "border-indigo-100",
        darkBorder: "dark:border-indigo-900/50",
      };
    case "outreach":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        darkBg: "dark:bg-green-900/30",
        darkText: "dark:text-green-300",
        border: "border-green-100",
        darkBorder: "dark:border-green-900/50",
      };
    case "worship":
      return {
        bg: "bg-primary/10",
        text: "text-primary",
        darkBg: "dark:bg-primary/30",
        darkText: "dark:text-blue-200",
        border: "border-primary/10",
        darkBorder: "dark:border-primary/40",
      };
    default:
      return {
        bg: "bg-slate-50",
        text: "text-slate-700",
        darkBg: "dark:bg-slate-900/30",
        darkText: "dark:text-slate-300",
        border: "border-slate-100",
        darkBorder: "dark:border-slate-900/50",
      };
  }
};

const EventCard = ({ event }: { event: IEvent }) => {
  const categoryColors = getCategoryColors(event.category);

  return (
    <article className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-slate-100 dark:border-slate-800 group h-full">
      <div className="relative h-52 overflow-hidden">
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-16 shadow-lg z-10 border border-slate-100 dark:border-slate-800">
          <span className="block text-[11px] font-bold text-primary dark:text-primary-light tracking-widest uppercase">
            {event.month}
          </span>
          <span className="block text-2xl font-black text-slate-800 dark:text-white leading-none mt-0.5">
            {event.day}
          </span>
        </div>
        <Image
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={event.title}
          src={event.image}
          fill
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/50 to-transparent opacity-60"></div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${categoryColors.bg} ${categoryColors.text} ${categoryColors.darkBg} ${categoryColors.darkText} uppercase tracking-wide border ${categoryColors.border} ${categoryColors.darkBorder}`}
          >
            {event.category}
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
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-primary-light">
              <MapPin size={16} />
            </div>
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center">
            {event.isOpenToAll ? (
              <span className="text-xs text-slate-400 font-medium italic">
                Open to all visitors
              </span>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Members only
              </span>
            )}
          </div>
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
