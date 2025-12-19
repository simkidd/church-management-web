import {
  ArrowRight,
  Award,
  AwardIcon,
  Book,
  CheckCircle2,
  GraduationCap,
  LucideAward,
} from "lucide-react";
import React from "react";

const CoursesSection = () => {
  return (
    <section id="courses">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="text-primary" />
          My Courses &amp; Learning
        </h3>
        <a
          className="text-sm font-medium text-primary hover:text-blue-700 hover:underline"
          href="#"
        >
          Course Dashboard
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase">
              In Progress
            </span>

            <Book className="text-slate-300 dark:text-slate-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Foundations of Faith II
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Module 3: Walking in Spirit
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Progress</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-linear-to-r from-primary to-blue-400 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          <button className="mt-6 w-full py-2.5 rounded-xl bg-primary text-white font-medium text-sm shadow-lg shadow-primary/20 hover:bg-primary-light hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
            Continue Learning
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center hover:border-primary/20 transition-colors">
            <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
              <CheckCircle2 />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              4
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Completed Courses
            </span>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center hover:border-primary/20 transition-colors">
            <div className="size-10 rounded-full bg-accent-warm-2/10 flex items-center justify-center text-accent-warm-2 mb-3">
              <AwardIcon />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              12
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Certificates Earned
            </span>
          </div>
          <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div
              className="size-12 bg-white dark:bg-slate-700 rounded-lg shadow-sm bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtHUt10NxHDzO1ALQ-RJy6hoXAQW1sAmfZ2UG5_pbedTFg9FSnc-CwpboYjo789ykXRzlmF2qsboNpN2roAn349NSP5mfNgWWL5SSLfRWqEKYs1yQdmhLyAy4WS9XmKBITOPcrDvuQY2z2JZQ8tAqdNyIlzUPtzlGdh0Gz_T38yYfhz5Ch7z3EeuDUI_rkY4qdSMf59XzBklXzwiA6iNGoivcsSxpv58rMUySYc4vwz5dEaRFJPlUrIdfzCWdTF4ijinouvXS9biOn')                    ",
              }}
            ></div>
            <div className="flex-1">
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                New: Leadership 101
              </h5>
              <p className="text-xs text-slate-500">Enrollment open now</p>
            </div>
            <button className="text-xs font-semibold text-primary hover:text-blue-700">
              View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
