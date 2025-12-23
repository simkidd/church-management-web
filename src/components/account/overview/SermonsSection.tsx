import { Play, PlayCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const SermonsSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PlayCircle className="text-primary" />
          My Sermons &amp; Media
        </h3>
      </div>
      <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-1">
        <div className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group">
          <div className="relative w-24 h-16 bg-slate-200 rounded-lg overflow-hidden shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-300"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUcCzS24_-eDl9_5i9IbsYtana9dkaYhjLLYF8gh6Ux0q0jPD7R_Gx21nt2f6cRb9xtU081d8jLDDXM-RODGcBcfIIy_NYDkGRrfKIbsX-LNha3P5IHM1qxcuzSGqd-ZjCX5naOCBcMALrdoGpEupV09HSeOpraujDfDE3V901mrcQRZEs409hBFWBmQHGnRheRkslHz2FqTJf7EIm2DjyhOSnm-c7aAL9qrfE0IBMF3mchRd2tlZ-yfQbqq6MYIAlGSs8dpLY0FzJ')                 ",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Play size={24} className="drop-shadow-md text-white" />
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-red-500 w-2/3"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              The Power of Community
            </h5>
            <p className="text-xs text-slate-500 mb-1">
              Sunday Service • 45m left
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                Resume
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                Notes
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group">
          <div className="relative w-24 h-16 bg-slate-200 rounded-lg overflow-hidden shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-300"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpPWtXpfbmCVIYsvZC49zIkpPAhbovYiUPVzTQClSjQcXRAA0Qx95y0cTC3JJf3e57b4DDe7YMk_f_PnJJD_4SfNdW1UcxntrgFbMaJd00Gtwsg8Vy9DpwS2O0khZ5sxqLoJsBF3kMkv2VsgYWMce_hvheWSPqYOTeKav3OVupOMJWbEAJJ-wENz8rYtpdxZVBxh-86d9VukGWKpdGK21JmkjhpVS3ZFeOojTvnCGrz-UM7VLyVHI8FFRN_jUpzxxmPcrBdBtPqG2R')                      ",
              }}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              Walking in Wisdom
            </h5>
            <p className="text-xs text-slate-500 mb-1">
              Pastor Michael • Saved
            </p>
            <button className="text-[10px] text-primary font-medium hover:underline">
              Watch Now
            </button>
          </div>
        </div>
        <Link
          className="block w-full text-center py-3 text-xs font-semibold text-slate-500 hover:text-primary border-t border-slate-100 dark:border-slate-800 mt-1"
          href="#"
        >
          View Watch History
        </Link>
      </div>
    </section>
  );
};

export default SermonsSection;
