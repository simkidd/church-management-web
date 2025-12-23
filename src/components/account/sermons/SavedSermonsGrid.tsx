"use client"
import { Bookmark, ChevronDown, Clock, Play } from "lucide-react";
import React, { useState } from "react";

// Define the interface for sermon items
interface Sermon {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor: "primary" | "accent" | "slate";
  duration: string;
  progress?: number; // optional for in-progress sermons
  addedDate: string;
  imageUrl: string;
  isInProgress?: boolean;
}

// Component props interface
interface SavedSermonsGridProps {
  initialSermons?: Sermon[];
  itemsPerPage?: number;
}

// Sort options type
type SortOption = "Date Added" | "Duration" | "Title";

const SavedSermonsGrid: React.FC<SavedSermonsGridProps> = ({
  initialSermons,
  itemsPerPage = 6,
}) => {
  // Default sermons data
  const defaultSermons: Sermon[] = [
    {
      id: 1,
      title: "Leadership 101: Serving Others",
      description:
        "Discovering the true heart of leadership through service and humility.",
      category: "LEADERSHIP",
      categoryColor: "slate",
      duration: "52m",
      addedDate: "Added 2 days ago",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHUt10NxHDzO1ALQ-RJy6hoXAQW1sAmfZ2UG5_pbedTFg9FSnc-CwpboYjo789ykXRzlmF2qsboNpN2roAn349NSP5mfNgWWL5SSLfRWqEKYs1yQdmhLyAy4WS9XmKBITOPcrDvuQY2z2JZQ8tAqdNyIlzUPtzlGdh0Gz_T38yYfhz5Ch7z3EeuDUI_rkY4qdSMf59XzBklXzwiA6iNGoivcsSxpv58rMUySYc4vwz5dEaRFJPlUrIdfzCWdTF4ijinouvXS9biOn",
    },
    {
      id: 2,
      title: "Faith in Difficult Times",
      description:
        "How to maintain an unshakeable faith when circumstances are challenging.",
      category: "SUNDAY SERVICE",
      categoryColor: "primary",
      duration: "1h 15m",
      addedDate: "Added 5 days ago",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPhfeh8S_Tu-6aDgt80qy920sg0E1trNoAvowBfQnyZ4P6WScWdm2Gjq5x7_90M3VS82OstPFx6BgtPEsUsH18WjxzmASbdMZSj7giSMyMpkpXxhhU-S7nOyYP85TJs0scy-mDSZcDyoJfdgiT3ia9R-xHwPCsf-r8U_poBKlwg8L-fcMD1j6WexdpISOlTTJenZOATtFOqdurY85SbVWbS3-IIDOg6y5-cinIrvVuMuGEEippX9I0kzvyIqsv8d_6tAl0Y9bufnpn",
    },
    {
      id: 3,
      title: "Building Strong Families",
      description:
        "Practical tools and biblical principles for fostering a healthy home environment.",
      category: "WORKSHOP",
      categoryColor: "accent",
      duration: "45m",
      addedDate: "Added 1 week ago",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPhfeh8S_Tu-6aDgt80qy920sg0E1trNoAvowBfQnyZ4P6WScWdm2Gjq5x7_90M3VS82OstPFx6BgtPEsUsH18WjxzmASbdMZSj7giSMyMpkpXxhhU-S7nOyYP85TJs0scy-mDSZcDyoJfdgiT3ia9R-xHwPCsf-r8U_poBKlwg8L-fcMD1j6WexdpISOlTTJenZOATtFOqdurY85SbVWbS3-IIDOg6y5-cinIrvVuMuGEEippX9I0kzvyIqsv8d_6tAl0Y9bufnpn",
    },
    {
      id: 4,
      title: "The Power of Community",
      description:
        "Pastor Michael explores how authentic fellowship strengthens our spiritual walk.",
      category: "SUNDAY SERVICE",
      categoryColor: "primary",
      duration: "32m left",
      progress: 45,
      addedDate: "Added 2 weeks ago",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAUcCzS24_-eDl9_5i9IbsYtana9dkaYhjLLYF8gh6Ux0q0jPD7R_Gx21nt2f6cRb9xtU081d8jLDDXM-RODGcBcfIIy_NYDkGRrfKIbsX-LNha3P5IHM1qxcuzSGqd-ZjCX5naOCBcMALrdoGpEupV09HSeOpraujDfDE3V901mrcQRZEs409hBFWBmQHGnRheRkslHz2FqTJf7EIm2DjyhOSnm-c7aAL9qrfE0IBMF3mchRd2tlZ-yfQbqq6MYIAlGSs8dpLY0FzJ",
      isInProgress: true,
    },
    {
      id: 5,
      title: "Walking in Wisdom",
      description:
        "Understanding the practical application of Proverbs in daily life decisions.",
      category: "BIBLE STUDY",
      categoryColor: "accent",
      duration: "58m",
      addedDate: "Added 3 weeks ago",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDpPWtXpfbmCVIYsvZC49zIkpPAhbovYiUPVzTQClSjQcXRAA0Qx95y0cTC3JJf3e57b4DDe7YMk_f_PnJJD_4SfNdW1UcxntrgFbMaJd00Gtwsg8Vy9DpwS2O0khZ5sxqLoJsBF3kMkv2VsgYWMce_hvheWSPqYOTeKav3OVupOMJWbEAJJ-wENz8rYtpdxZVBxh-86d9VukGWKpdGK21JmkjhpVS3ZFeOojTvnCGrz-UM7VLyVHI8FFRN_jUpzxxmPcrBdBtPqG2R",
    },
    {
      id: 6,
      title: "Biblical Financial Stewardship",
      description:
        "Learning to manage resources with a kingdom mindset for long-term blessing.",
      category: "FINANCE",
      categoryColor: "slate",
      duration: "1h 05m",
      addedDate: "Added 1 month ago",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBtHUt10NxHDzO1ALQ-RJy6hoXAQW1sAmfZ2UG5_pbedTFg9FSnc-CwpboYjo789ykXRzlmF2qsboNpN2roAn349NSP5mfNgWWL5SSLfRWqEKYs1yQdmhLyAy4WS9XmKBITOPcrDvuQY2z2JZQ8tAqdNyIlzUPtzlGdh0Gz_T38yYfhz5Ch7z3EeuDUI_rkY4qdSMf59XzBklXzwiA6iNGoivcsSxpv58rMUySYc4vwz5dEaRFJPlUrIdfzCWdTF4ijinouvXS9biOn",
    },
  ];

  // State
  const [sermons, setSermons] = useState<Sermon[]>(
    initialSermons || defaultSermons
  );
  const [sortBy, setSortBy] = useState<SortOption>("Date Added");
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  // Get category color classes
  const getCategoryClasses = (color: Sermon["categoryColor"]) => {
    const baseClasses = "text-xs font-bold px-2 py-1 rounded-lg";

    switch (color) {
      case "primary":
        return `${baseClasses} text-primary bg-primary/10`;
      case "accent":
        return `${baseClasses} text-accent bg-accent/10`;
      case "slate":
      default:
        return `${baseClasses} text-slate-500 bg-slate-100 dark:bg-slate-800`;
    }
  };

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as SortOption;
    setSortBy(newSort);

    // Sort sermons based on selected option
    const sortedSermons = [...sermons].sort((a, b) => {
      switch (newSort) {
        case "Title":
          return a.title.localeCompare(b.title);
        case "Duration":
          // Extract numeric part from duration for comparison
          const getMinutes = (duration: string) => {
            const match = duration.match(/(\d+)/);
            return match ? parseInt(match[0]) : 0;
          };
          return getMinutes(a.duration) - getMinutes(b.duration);
        case "Date Added":
        default:
          // For simplicity, using ID as proxy for date added
          // In real app, you'd sort by actual date
          return a.id - b.id;
      }
    });

    setSermons(sortedSermons);
  };

  // Handle remove sermon
  const handleRemoveSermon = (id: number) => {
    setSermons(sermons.filter((sermon) => sermon.id !== id));
  };

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, sermons.length));
  };

  // Get visible sermons
  const visibleSermons = sermons.slice(0, visibleCount);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="text-slate-900 dark:text-white font-semibold mx-1">
            {visibleSermons.length}
          </span>
          saved items
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-transparent border-none text-sm font-semibold text-slate-900 dark:text-white focus:ring-0 cursor-pointer py-0 pl-0 pr-6"
          >
            <option value="Date Added">Date Added</option>
            <option value="Duration">Duration</option>
            <option value="Title">Title</option>
          </select>
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleSermons.map((sermon) => (
          <div
            key={sermon.id}
            className="group bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all flex flex-col"
          >
            {/* Image with overlay */}
            <div className="relative h-48 bg-slate-200 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${sermon.imageUrl}')` }}
              ></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>

              {/* Progress bar for in-progress sermons */}
              {sermon.isInProgress && sermon.progress && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700/30">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${sermon.progress}%` }}
                  ></div>
                </div>
              )}

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-lg cursor-pointer hover:bg-primary hover:border-primary transition-colors">
                  <Play size={32} className="ml-1 text-white" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center gap-1">
                <Clock size={14} />
                {sermon.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <div className="flex justify-between items-start mb-2">
                <span className={getCategoryClasses(sermon.categoryColor)}>
                  {sermon.category}
                </span>
                <span className="text-xs text-slate-400">
                  {sermon.addedDate}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {sermon.title}
              </h4>

              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                {sermon.description}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button className="text-sm font-semibold text-primary hover:text-blue-700 flex items-center gap-1 transition-colors">
                  {sermon.isInProgress ? "Resume" : "Watch Now"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleRemoveSermon(sermon.id)}
                    className="text-primary cursor-pointer"
                    title="Remove from Saved"
                  >
                    <Bookmark size={20} className="fill-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {/* {visibleCount < sermons.length && ( */}
      <div className="flex justify-center pt-8">
        <button
          onClick={handleLoadMore}
          className="px-6 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-gray-700 text-[#111418] dark:text-white font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          Load More
          <ChevronDown size={20} />
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default SavedSermonsGrid;
