import { ArrowRight, Clock, Play, PlayCircle } from "lucide-react";
import React from "react";

const RecentCourse = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <PlayCircle className="text-primary" />
        Pick up where you left off
      </h3>
      <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start group relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>
        <div
          className="w-full md:w-1/3 aspect-video md:aspect-auto md:h-48 rounded-2xl bg-cover bg-center shadow-sm relative overflow-hidden shrink-0"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUcCzS24_-eDl9_5i9IbsYtana9dkaYhjLLYF8gh6Ux0q0jPD7R_Gx21nt2f6cRb9xtU081d8jLDDXM-RODGcBcfIIy_NYDkGRrfKIbsX-LNha3P5IHM1qxcuzSGqd-ZjCX5naOCBcMALrdoGpEupV09HSeOpraujDfDE3V901mrcQRZEs409hBFWBmQHGnRheRkslHz2FqTJf7EIm2DjyhOSnm-c7aAL9qrfE0IBMF3mchRd2tlZ-yfQbqq6MYIAlGSs8dpLY0FzJ')                ",
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Play size={32} className="text-white drop-shadow-md" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-sm">
            <Clock size={14} className="text-accent-warm-2" />
            15m remaining
          </div>
        </div>
        <div className="flex-1 w-full space-y-4 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-primary dark:text-primary-light bg-primary/10 px-2 py-1 rounded-lg mb-2 inline-block uppercase">
                Theology
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                Foundations of Faith II
              </h2>
              <p className="text-sm text-slate-500">
                Module 3: Walking in Spirit
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-600 dark:text-slate-400">
                Course Progress
              </span>
              <span className="text-primary font-bold">65%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
              <div
                className="bg-linear-to-r from-primary to-primary-light h-2.5 rounded-full relative shadow-sm"
                style={{ width: "65%" }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1.5 bg-white/50 rounded-full mr-1"></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <ArrowRight size={14} />
              Next: The Fruits of the Spirit
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 sm:flex-none bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer">
              <Play size={20} />
              Continue Lesson
            </button>
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              View Syllabus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCourse;
