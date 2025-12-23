"use client";
import useSermons from "@/hooks/useSermons";
import { ListSermonsParams } from "@/interfaces/sermon.interface";
import { Calendar, History, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ArchiveCard from "./ArchiveCard";
import ArchiveCardSkeleton from "./ArchiveCardSkeleton";

const SermonsArchiveContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [openFilter, setOpenFilter] = useState(false);

  const itemsPerPage = 12;
  const [filters, setFilters] = useState<ListSermonsParams>(() => {
    return {
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: itemsPerPage,
    };
  });

  const { sermons, isPending, totalSermons, totalPages } = useSermons(filters);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 shrink-0 space-y-6">
        <button className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-gray-800">
          <span className="font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">filter_list</span>
            Filters
          </span>
          <span className="material-symbols-outlined">expand_more</span>
        </button>
        <div className="hidden lg:block space-y-8 bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800 sticky top-24">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#111418] dark:text-white">
                Sort By
              </h3>
              <button className="text-xs text-primary dark:text-primary-light cursor-pointer font-medium hover:underline">
                Reset
              </button>
            </div>
            <div className="relative">
              <select className="w-full bg-[#f0f2f4] dark:bg-gray-900 border-none rounded-lg py-2.5 px-3 text-sm font-medium text-[#111418] dark:text-white focus:ring-2 focus:ring-primary cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Most Popular</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>

          <hr className="border-dashed border-gray-200 dark:border-gray-700" />
          <div>
            <h3 className="font-bold text-[#111418] dark:text-white mb-3">
              Date Range
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#f0f2f4] dark:bg-gray-900 p-2 rounded-lg">
                  <Calendar size={14} className="text-gray-500" />
                </div>
                <span className="text-sm text-gray-500">Last 30 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#f0f2f4] dark:bg-gray-900 p-2 rounded-lg">
                  <History size={14} className="text-gray-500" />
                </div>
                <span className="text-sm text-gray-500">2023 Archive</span>
              </div>
            </div>
          </div>
          <button className="w-full py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-200 dark:shadow-none">
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Main Content Grid */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Search and Chips */}
        <div className="space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-[#637288]" />
            </div>
            <input
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border-none ring-1 ring-slate-200 dark:ring-gray-700 rounded-xl text-[#111418] dark:text-white placeholder-[#637288] focus:ring-2 focus:ring-primary shadow-sm transition-all"
              placeholder="Search by title, speaker, or topic..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-blue-400 rounded-full transition-colors border border-primary/20">
              <span className="text-sm font-medium">Faith</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-[#637288] dark:text-gray-300 rounded-full border border-slate-200 dark:border-gray-700 transition-colors shadow-sm">
              <span className="text-sm font-medium">Healing</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-[#637288] dark:text-gray-300 rounded-full border border-slate-200 dark:border-gray-700 transition-colors shadow-sm">
              <span className="text-sm font-medium">Prosperity</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-[#637288] dark:text-gray-300 rounded-full border border-slate-200 dark:border-gray-700 transition-colors shadow-sm">
              <span className="text-sm font-medium">Relationships</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-[#637288] dark:text-gray-300 rounded-full border border-slate-200 dark:border-gray-700 transition-colors shadow-sm">
              <span className="text-sm font-medium">Family</span>
            </button>
          </div>
        </div>

        {/* Sermon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isPending
            ? [...Array(6)].map((_, i) => <ArchiveCardSkeleton key={i} />)
            : sermons.map((sermon) => (
                <ArchiveCard key={sermon._id} sermon={sermon} />
              ))}
        </div>

        {/* Pagination / Load More */}
        <div className="flex flex-col items-center justify-center mt-8 gap-4">
          <button className="px-8 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-gray-700 text-[#111418] dark:text-white font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm w-full md:w-auto cursor-pointer">
            Load More Sermons
          </button>
        </div>
      </div>
    </div>
  );
};

export default SermonsArchiveContent;
