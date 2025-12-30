"use client";
import { useSermonView } from "@/hooks/useSermonView";
import { ISermon } from "@/interfaces/sermon.interface";
import { format } from "date-fns";
import {
  Bookmark,
  BookOpen,
  Calendar,
  Headphones,
  Layers,
  PlayCircle,
  Share2,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MoreFromSeries from "./MoreFromSeries";
import VideoPlayer from "./VideoPlayer";

const SermonDetails = ({ sermon }: { sermon: ISermon }) => {
  useSermonView(sermon._id);

  // const { data, isPending, isError } = useQuery<ApiResponse<ISermon>>({
  //   queryKey: ["sermon", sermon._id],
  //   queryFn: () => sermonsApi.getSermonById(sermon._id),
  //   enabled: !!sermon._id,
  // });

  // const sermonData = data?.data;

  const mediaItem = {
    id: sermon._id,
    title: sermon.title,
    description: sermon.description,
    video: {
      url: sermon.video?.url,
      type: sermon.video.type,
    },
    audioUrl: sermon.audioUrl,
    thumbnail: {
      url: sermon.thumbnail?.url,
      alt: sermon.title,
    },
    duration: sermon.duration,
    createdAt: sermon.datePreached,
  };

  return (
    <div className="container px-4 mx-auto py-5">
      <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        <Link
          className="text-[#637288] hover:text-primary transition-colors"
          href="/"
        >
          Home
        </Link>
        <span className="text-[#637288]">/</span>
        <Link
          className="text-[#637288] hover:text-primary transition-colors"
          href={`/sermons`}
        >
          Sermons
        </Link>

        {sermon.series && (
          <>
            <span className="text-[#637288]">/</span>
            <Link
              className="text-[#637288] hover:text-primary transition-colors capitalize"
              href={`/sermons/archive?series=${sermon.series.slug}`}
            >
              {sermon.series?.title}
            </Link>
          </>
        )}
        <span className="text-[#637288]">/</span>
        <span className="text-primary dark:text-white font-medium truncate max-w-50 sm:max-w-none capitalize">
          {sermon.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-text-main dark:text-white mb-3 capitalize">
              {sermon.title}
            </h1>
            {sermon.series && (
              <p className="text-lg text-text-muted dark:text-gray-400 font-medium">
                {sermon.series?.title}
              </p>
            )}
          </div>
          {/* video player */}
          <VideoPlayer
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            media={mediaItem as any}
            type="sermon"
            showTitle={true}
            autoPlay={false}
            onPlay={() => console.log("Sermon started playing")}
            onEnded={() => console.log("Sermon ended")}
          />

          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-100 dark:border-white/10">
            {sermon.video && (
              <button className="flex items-center gap-2 h-12 px-6 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 cursor-pointer">
                <PlayCircle size={20} />
                <span>Watch Video</span>
              </button>
            )}

            {sermon.audioUrl && (
              <a
                href={sermon.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-12 px-6 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-text-main dark:text-white border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                <Headphones size={20} />
                <span>Listen Audio</span>
              </a>
            )}
            <div className="grow"></div>
            <div className="flex items-center gap-2">
              {/* <button
                className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-muted hover:text-primary transition-all cursor-pointer"
                title="Download Resources"
              >
                <Download size={20} />
              </button> */}
              <button
                className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-muted hover:text-primary transition-all cursor-pointer"
                title="Save for Later"
              >
                <Bookmark size={20} />
              </button>
              <button
                className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-muted hover:text-primary transition-all cursor-pointer"
                title="Share Sermon"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-8 border-b border-gray-100 dark:border-white/10 overflow-x-auto no-scrollbar">
              <button className="pb-3 px-1 border-b-2 border-primary text-primary font-bold text-sm whitespace-nowrap">
                About this Sermon
              </button>
              {/* <button className="pb-3 px-1 border-b-2 border-transparent text-text-muted hover:text-text-main dark:hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap">
                Transcript
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent text-text-muted hover:text-text-main dark:hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap">
                Study Notes
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent text-text-muted hover:text-text-main dark:hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap">
                Discussion
              </button> */}
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-text-main/80 dark:text-gray-300">
              <p className="leading-relaxed whitespace-pre-wrap">
                {sermon.description}
              </p>

              {sermon.keyTakeaways && sermon.keyTakeaways?.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-text-main dark:text-white mt-6 mb-3">
                    Key Takeaways
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                    {sermon.keyTakeaways?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20 ring-2 ring-white dark:ring-white/5">
                <AvatarImage
                  src={sermon.preacher?.avatar?.url || ""}
                  alt={`${sermon.preacher.firstName}'s avatar`}
                />
                <AvatarFallback className="border-2 border-primary/20 ring-2 ring-white dark:ring-white/5">
                  {sermon.preacher.firstName[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-bold text-lg text-text-main dark:text-white">
                  {/* Pastor John Doe */}
                  {sermon.preacher.firstName + " " + sermon.preacher.lastName}
                </h3>
                <p className="text-text-muted text-sm">Senior Pastor</p>
              </div>
            </div>
            {/* <button className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-primary dark:text-white text-sm font-bold hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
              View Profile
            </button> */}
          </div>
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-primary/5 px-6 py-4 border-b border-primary/5">
              <h3 className="font-bold text-primary dark:text-blue-400">
                Sermon Info
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-primary dark:text-blue-300">
                  <Calendar />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-text-muted mb-1">
                    Date Preached
                  </p>
                  <p className="text-text-main dark:text-white font-medium">
                    {format(new Date(sermon.datePreached), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-primary dark:text-blue-300">
                  <BookOpen />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-text-muted mb-1">
                    Scripture
                  </p>
                  <span className="text-text-main dark:text-white font-medium hover:text-primary decoration-primary/30 underline underline-offset-4 transition-colors capitalize">
                    {sermon.scripture}
                  </span>
                </div>
              </div>

              {sermon.series && (
                <div className="flex gap-4 items-start">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-primary dark:text-blue-300">
                    <Layers />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-text-muted mb-1">
                      Series
                    </p>
                    <Link
                      className="text-text-main dark:text-white font-medium hover:text-primary transition-colors"
                      href="#"
                    >
                      {sermon.series?.title}
                    </Link>
                  </div>
                </div>
              )}

              {sermon.tags && sermon.tags.length > 0 && (
                <div className="flex gap-4 items-start">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-primary dark:text-blue-300">
                    <Tag />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-text-muted mb-1">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sermon.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-xs font-medium text-text-main dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary rounded-2xl p-6 text-center relative overflow-hidden group shadow-lg shadow-primary/25">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 size-32 rounded-full bg-black/20 blur-xl"></div>
            <h3 className="text-white font-bold text-xl relative z-10 mb-2">
              New Here?
            </h3>
            <p className="text-white/80 text-sm mb-4 relative z-10">
              We&apos;d love to connect with you and help you find your place in
              our community.
            </p>
            <button className="w-full bg-white text-primary py-3 rounded-3xl font-bold text-sm hover:bg-gray-50 transition-colors relative z-10 shadow-md cursor-pointer">
              Connect Card
            </button>
          </div>
        </div>
      </div>

      {/* more from this series */}
      <MoreFromSeries sermon={sermon} />
    </div>
  );
};

export default SermonDetails;
