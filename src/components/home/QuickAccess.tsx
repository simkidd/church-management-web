import { BookOpenText, GraduationCap, HandHeart, PlayCircle } from "lucide-react";
import React from "react";

const QuickAccess = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Quick Access
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            className="group relative flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-8 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
            href="#"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <PlayCircle
                size={128}
                className="text-primary dark:text-primary-light transform rotate-12"
              />
            </div>
            <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-primary-light group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <PlayCircle size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                Watch Sermons
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Stream past services and series anytime you want. Be inspired
                daily.
              </p>
            </div>
          </a>
          <a
            className="group relative flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-8 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
            href="#"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap size={128} className="transform rotate-12 text-accent-warm" />
            </div>
            <div className="size-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <BookOpenText size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                Bible Academy
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Deepen your understanding with guided studies and discipleship
                tracks.
              </p>
            </div>
          </a>
          <a
            className="group relative flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-8 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
            href="#"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <HandHeart size={128} className="text-red-500 transform rotate-12" />
            </div>
            <div className="size-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <HandHeart size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
                Prayer Wall
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Submit requests and join us in intercession for others in need.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
