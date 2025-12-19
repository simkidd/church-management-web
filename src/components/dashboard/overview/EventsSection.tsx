import { ArrowRight, Calendar, CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const EventsSection = () => {
  return (
    <section className="h-full flex flex-col" id="events">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="text-primary" />
          My Events
        </h3>
      </div>
      <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-1 h-full flex flex-col">
        <div className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all cursor-pointer group relative border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
          <div className="shrink-0 w-16 h-16 rounded-xl bg-linear-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 text-primary dark:text-blue-400 flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-primary"></div>
            <span className="text-[10px] font-bold uppercase tracking-wide opacity-70 mt-1">
              Oct
            </span>
            <span className="text-2xl font-bold leading-none">24</span>
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
              Volunteer Appreciation
            </h5>
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-slate-400">
                schedule
              </span>
              6:00 PM • Main Hall
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-500/30">
                <CheckIcon size={10} />
                Registered
              </span>
              <span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors flex items-center gap-0.5">
                Ticket
                <ArrowRight size={10} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all cursor-pointer group relative border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
          <div className="shrink-0 w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700/50 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
            <span className="text-[10px] font-bold uppercase tracking-wide">
              Sep
            </span>
            <span className="text-2xl font-bold leading-none">15</span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Annual Retreat
            </h5>
            <p className="text-xs text-slate-500 mb-1.5">
              Camp David • Full Day
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Past Event
              </span>
              <span className="text-[10px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View Photos
              </span>
            </div>
          </div>
        </div>
        <Link
          className="mt-auto block w-full text-center py-3 text-xs font-semibold text-slate-500 hover:text-primary border-t border-slate-100 dark:border-slate-800 transition-colors"
          href="#"
        >
          View Full Calendar
        </Link>
      </div>
    </section>
  );
};

export default EventsSection;
