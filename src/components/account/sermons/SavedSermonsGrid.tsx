"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiErrorResponse, ApiResponse } from "@/interfaces/response.interface";
import { ISermon } from "@/interfaces/sermon.interface";
import { sermonsApi } from "@/lib/api/sermon.api";
import { formatVideoDuration } from "@/utils/helpers/time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Bookmark, Clock, Play } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const SavedSermonsGrid = () => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<
    ApiResponse<{ sermons: ISermon[]; sermonIds: string[] }>
  >({
    queryKey: ["saved-sermons"],
    queryFn: sermonsApi.getMySavedSermons,
  });

  const sermons = data?.data.sermons ?? [];

  const removeSermon = useMutation({
    mutationFn: (sermonId: string) => sermonsApi.toggleSaveSermon(sermonId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["saved-sermons"] });

      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      console.error("error:", errorMessage);
    },
  });

  // Handle remove sermon
  const handleRemoveSermon = (id: string) => {
    removeSermon.mutate(id);
  };

  if (isPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <Skeleton className="h-48 w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-4 flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  if (!sermons.length) {
    return (
      <div className="py-20 text-center text-sm text-slate-500">
        You haven’t saved any sermons yet.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="text-slate-900 dark:text-white font-semibold mx-1">
            {sermons.length}
          </span>
          saved items
        </p>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sermons.map((sermon) => (
          <div
            key={sermon._id}
            className="group bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all flex flex-col"
          >
            {/* Image with overlay */}
            <div className="relative h-48 bg-slate-200 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${sermon.thumbnail?.url}')` }}
              ></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link href={`/sermons/${sermon.slug}`}>
                  <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-lg cursor-pointer hover:bg-primary hover:border-primary transition-colors">
                    <Play size={32} className="ml-1 text-white" />
                  </div>
                </Link>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center gap-1">
                <Clock size={14} />
                {formatVideoDuration(sermon.duration)}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {sermon.title}
              </h4>

              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                {sermon.description}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end">
                <div className="flex gap-2 ">
                  <button
                    onClick={() => handleRemoveSermon(sermon._id)}
                    className="text-primary dark:text-primary-light cursor-pointer"
                    title="Remove from Saved"
                  >
                    <Bookmark size={20} className="fill-primary dark:fill-primary-light" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSermonsGrid;
