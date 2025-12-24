"use client";
import React from "react";

const EnrolledCourses = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Enrolled Courses
          <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            3
          </span>
        </h3>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-xs font-semibold shadow-sm text-slate-900 dark:text-white transition-all">
            In Progress
          </button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
            Completed
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col group hover:border-primary/30 transition-all h-full">
          <div
            className="h-40 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpPWtXpfbmCVIYsvZC49zIkpPAhbovYiUPVzTQClSjQcXRAA0Qx95y0cTC3JJf3e57b4DDe7YMk_f_PnJJD_4SfNdW1UcxntrgFbMaJd00Gtwsg8Vy9DpwS2O0khZ5sxqLoJsBF3kMkv2VsgYWMce_hvheWSPqYOTeKav3OVupOMJWbEAJJ-wENz8rYtpdxZVBxh-86d9VukGWKpdGK21JmkjhpVS3ZFeOojTvnCGrz-UM7VLyVHI8FFRN_jUpzxxmPcrBdBtPqG2R')",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm z-10">
              <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  local_fire_department
                </span>
                Trending
              </span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col bg-card-light dark:bg-card-dark relative z-10">
            <div className="mb-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Leadership
                </span>
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-200"></div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-300"></div>
                </div>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                Biblical Leadership 101
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                Learn the biblical principles of servant leadership and how to
                apply them in your community.
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>12% Complete</span>
                  <span>2/16 Lessons</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-orange-500 h-1.5 rounded-full"
                    style={{ width: "12%" }}
                  ></div>
                </div>
              </div>
              <button className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Continue
              </button>
            </div>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col group hover:border-primary/30 transition-all h-full">
          <div
            className="h-40 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtHUt10NxHDzO1ALQ-RJy6hoXAQW1sAmfZ2UG5_pbedTFg9FSnc-CwpboYjo789ykXRzlmF2qsboNpN2roAn349NSP5mfNgWWL5SSLfRWqEKYs1yQdmhLyAy4WS9XmKBITOPcrDvuQY2z2JZQ8tAqdNyIlzUPtzlGdh0Gz_T38yYfhz5Ch7z3EeuDUI_rkY4qdSMf59XzBklXzwiA6iNGoivcsSxpv58rMUySYc4vwz5dEaRFJPlUrIdfzCWdTF4ijinouvXS9biOn')                  ",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm z-10">
              {/* <span className="text-xs font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  new_releases
                </span>
                New
              </span> */}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col bg-card-light dark:bg-card-dark relative z-10">
            <div className="mb-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  History
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                History of the Church
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                An overview of major events in church history from Acts to the
                present day.
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>0% Complete</span>
                  <span>Start Course</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-slate-300 dark:bg-slate-600 h-1.5 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
              <button className="w-full py-2 rounded-xl bg-primary/5 text-primary border border-primary/10 text-xs font-semibold hover:bg-primary hover:text-white transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col group hover:border-primary/30 transition-all h-full">
          <div
            className="h-40 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2-8xQn93rs82BYV8YyFnryxIMerQ1vril_kTHQTolaDsfBKyzyJiItlXocc-hbqEAeh5Tp1tCPQyfoZVL0w2yDsKFugRJyIAf_vEbgqYwnqx2nWxB-yPQlrJpHJT6gYLskc-yoB0dslSqQzCjzEFtLZdqxMKpKh5aJloN1qOt3NvY90uB91Zrz4E1wAEDW-Pzyr3k0GgkBd0zSoS456-n-3XZXzjRv9LtKTKd1QoQ6-IJw9x_JshzT9jBJtIqjFkXZdeyqb_4OKDN')                  ",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="p-5 flex-1 flex flex-col bg-card-light dark:bg-card-dark relative z-10">
            <div className="mb-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Prayer
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                Effective Prayer Life
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                Deepen your relationship with God through understanding the
                power of prayer.
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>85% Complete</span>
                  <span>Last Lesson</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <button className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Resume
              </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center h-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
          <div className="size-16 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
            <span className="material-symbols-outlined text-[32px]">add</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Explore Catalog
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            Find new courses to grow your faith
          </p>
          <span className="text-xs font-semibold text-primary group-hover:underline">
            Browse 24+ Courses
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
