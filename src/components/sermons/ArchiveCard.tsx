"use client";
import { ISermon } from "@/interfaces/sermon.interface";
import { format } from "date-fns";
import { Bookmark, Clock, Headphones, Play, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatVideoDuration } from "@/utils/helpers/time";

const ArchiveCard = ({ sermon }: { sermon: ISermon }) => {
  return (
    <div className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        {sermon.thumbnail?.url ? (
          <Image
            src={sermon.thumbnail.url}
            alt={sermon.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
        )}
        {/* overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1">
          <Clock size={14} />
          {formatVideoDuration(sermon.duration)}
        </div>
        <div
          className={`className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded text-xs font-bold shadow-md"`}
        >
          {sermon.video ? "Video" : "Audio"}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/sermons/${sermon.slug}`}>
            <button className="bg-primary/90 text-white rounded-full p-3 shadow-lg scale-90 hover:scale-100 transition-transform cursor-pointer">
              <Play size={36} />
            </button>
          </Link>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-wider">
            {sermon.series?.title || sermon.category || "Sermon"}
          </span>
          <button className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
            <Bookmark />
          </button>
        </div>
        <Link href={`/sermons/${sermon.slug}`}>
          <h3 className="text-lg font-bold text-[#111418] dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">
            {sermon.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-4 line-clamp-2">
          {sermon.description}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-slate-200">
              <AvatarImage
                src={sermon.preacher?.avatar?.url || ""}
                alt={`${sermon.preacher.firstName}'s avatar`}
              />
              <AvatarFallback className="bg-slate-200 text-accent-warm-2 font-semibold ">
                {sermon.preacher.firstName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111418] dark:text-gray-200">
                {`${sermon.preacher.firstName || ""} ${
                  sermon.preacher.lastName || ""
                }`.trim() || "Unknown Speaker"}
              </span>
              <span className="text-[10px] text-slate-400">
                {format(new Date(sermon.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            {sermon.audioUrl && (
              <span className="p-1.5 text-slate-400 rounded-lg transition-colors">
                <Headphones size={20} />
              </span>
            )}
            {sermon.video && (
              <span className="p-1.5 text-slate-400 rounded-lg transition-colors">
                <Video size={20} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
