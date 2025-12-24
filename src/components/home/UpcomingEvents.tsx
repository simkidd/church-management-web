import { ArrowRight, ChevronRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

// Helper function for category colors
const getCategoryStyles = (category: string) => {
  switch (category.toLowerCase()) {
    case "family":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        ring: "ring-green-600/10",
        darkBg: "dark:bg-green-900/30",
        darkText: "dark:text-green-400",
      };
    case "worship":
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
        ring: "ring-purple-600/10",
        darkBg: "dark:bg-purple-900/30",
        darkText: "dark:text-purple-400",
      };
    case "youth":
      return {
        bg: "bg-orange-50",
        text: "text-orange-700",
        ring: "ring-orange-600/10",
        darkBg: "dark:bg-orange-900/30",
        darkText: "dark:text-orange-400",
      };
    case "bible study":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        ring: "ring-amber-600/10",
        darkBg: "dark:bg-amber-900/30",
        darkText: "dark:text-amber-400",
      };
    case "outreach":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        ring: "ring-blue-600/10",
        darkBg: "dark:bg-blue-900/30",
        darkText: "dark:text-blue-400",
      };
    default:
      return {
        bg: "bg-slate-50",
        text: "text-slate-700",
        ring: "ring-slate-600/10",
        darkBg: "dark:bg-slate-900/30",
        darkText: "dark:text-slate-400",
      };
  }
};

// Event data
const upcomingEvents = [
  {
    id: 1,
    month: "Aug",
    day: "15",
    title: "Community Picnic",
    category: "Family",
    time: "12:00 PM - 3:00 PM",
    location: "Central Park",
  },
  {
    id: 2,
    month: "Aug",
    day: "18",
    title: "Midweek Encounter",
    category: "Worship",
    time: "7:00 PM - 8:30 PM",
    location: "Main Sanctuary",
  },
  {
    id: 3,
    month: "Aug",
    day: "20",
    title: "Youth Ignite",
    category: "Youth",
    time: "6:30 PM - 8:00 PM",
    location: "Youth Hall",
  },
];

// Event Item Component
const EventItem = ({
  event,
  isLast,
}: {
  event: {
    id: number;
    month: string;
    day: string;
    title: string;
    category: string;
    time: string;
    location: string;
  };
  isLast: boolean;
}) => {
  const categoryStyles = getCategoryStyles(event.category);

  return (
    <>
      <div className="group flex gap-5 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer items-start">
        <div className="hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shrink-0 text-center shadow-sm group-hover:shadow-md transition-shadow group-hover:border-blue-200">
          <span className="text-xs font-bold text-primary dark:text-primary-light uppercase tracking-wide">
            {event.month}
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {event.day}
          </span>
        </div>
        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-md ${categoryStyles.bg} px-2.5 py-1 text-xs font-semibold ${categoryStyles.text} ring-1 ring-inset ${categoryStyles.ring} ${categoryStyles.darkBg} ${categoryStyles.darkText}`}
            >
              {event.category}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock size={18} className="text-slate-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={18} className="text-slate-400" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center self-center text-slate-300 dark:text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all">
          <ChevronRight />
        </div>
      </div>
      {!isLast && (
        <div className="h-px bg-slate-50 dark:bg-slate-800 mx-4"></div>
      )}
    </>
  );
};

const UpcomingEvents = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Upcoming Events
        </h2>
        <Link
          className="text-sm font-bold text-primary dark:text-primary-light hover:text-primary-hover flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
          href="#"
        >
          View Calendar
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft p-3 flex flex-col gap-2">
        {upcomingEvents.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            isLast={index === upcomingEvents.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
