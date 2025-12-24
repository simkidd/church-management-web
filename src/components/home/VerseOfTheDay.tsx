import { Share2, Sun } from "lucide-react";
import React from "react";

const VerseOfTheDay = () => {
  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-soft border border-slate-100 dark:border-slate-800 bg-white dark:bg-surface-dark group">
      <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-white to-orange-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 opacity-80"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200 dark:bg-orange-900/30 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-200 dark:bg-amber-900/30 rounded-full blur-3xl opacity-50"></div>{" "}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-100 dark:border-amber-800">
          <Sun size={14} />
          Verse of the Day
        </div>
        <blockquote className="text-2xl md:text-3xl font-serif italic font-medium text-slate-800 dark:text-slate-100 leading-relaxed drop-shadow-sm">
          &quot;For I know the plans I have for you, plans to prosper you and
          not to harm you, plans to give you hope and a future.&quot;
        </blockquote>
        <div className="flex flex-col items-center gap-2">
          <cite className="text-sm font-bold text-primary dark:text-blue-400 not-italic uppercase tracking-wide">
            — Jeremiah 29:11
          </cite>
          <div className="h-1 w-12 bg-amber-300 rounded-full mt-2"></div>
        </div>
        <button className="mt-4 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer">
          <Share2 size={18} />
          Share with a friend
        </button>
      </div>
    </div>
  );
};

export default VerseOfTheDay;
