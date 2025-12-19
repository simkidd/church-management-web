import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

// TypeScript Interface
interface Sermon {
  id: number;
  title: string;
  category: string;
  speaker: string;
  date: string;
  duration: string;
  imageUrl: string;
  imageAlt: string;
  showProgressBar?: boolean;
  progressPercentage?: number;
}

// Sermon data
const latestSermons: Sermon[] = [
  {
    id: 1,
    title: "Finding Peace in the Storm",
    category: "Faith",
    speaker: "Pastor Michael",
    date: "Oct 08",
    duration: "45:12",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw3oGmM_TcWLeDr7B-7XrLe_j9Q7_ybZfIkJpI69AXaTAt1uyFjl9bozX1B621Up9Lm6vYaRiHd9S3IpEz6H87AY0yyL2H-ruI17VBEmdVssjLmB-6zOq2G5BS4rU3h5rQ08hjnzbUb_3_rZtjfpGLZf-dltwfdL27fSYAj1q0Bhs6wvzIv3S1V5YX8Kt8r5qHpl5vbA43Uh8yfoLEyQ1waK5wQ3abH1aYG8Cs4ezznYA6cjhiHJxTLGsF41d071hLofFFGWJijhyG",
    imageAlt: "Abstract calm blue water background representing peace",
    showProgressBar: true,
    progressPercentage: 67,
  },
  {
    id: 2,
    title: "The Power of Community",
    category: "Community",
    speaker: "Pastor Sarah",
    date: "Oct 01",
    duration: "38:20",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBH_AZ0gNA6LONYfFvcCUOZZNy1DnSIPyFrgVTze8RIwVHkXUSQJVDAw0KXCamufZg9eqlsIINfii2zSAditnvWgZ_zDmuikESd4wRJvwdbbR0r7xskIw-XJGSTEUtQXH6se07LsZNMidHhGQPF_Yvf6X2OkDYNqerHO1Z-O2Z9Td-_IHH8gr1aGPEog-uhc4MhQlliiNjwaLONBt8RBkJsThtLbhsaHYXKIXEpO6uWiflPQRsTTG7IsxNiAsTVWpDf_MV-EGYdJ85H",
    imageAlt: "Group of people holding hands in a circle in a field",
  },
  {
    id: 3,
    title: "Understanding Scripture",
    category: "Bible Study",
    speaker: "Dr. James Wilson",
    date: "Sep 24",
    duration: "52:10",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDodl1doPztf__XZYN3SCLUnbP82uq8dhqDT7XOpAbchTGMw54Nc_JX2rQcl6TmWzchIbh9ium3P_5JTRSZ9CjRL_A4LbAYvbaedj2pOO4YfkQebsv6eOx98eBCex9M4w6-kxgKokY3YqxNBmpT7vs8W-khPpaF99MGh3IDPIfg6TvbrJUfz15rvlDaMNzfHtr68ru7CXYJQw_4j-bWRFIPbS139pC7CqNZ6_xEz4Qu64_7nGylFhSOySgfsemLMePdrHRB_vdP7iI0",
    imageAlt: "Close up of an open bible on a wooden table",
  },
  {
    id: 4,
    title: "Mountaintop Moments",
    category: "Encouragement",
    speaker: "Pastor Michael",
    date: "Sep 17",
    duration: "41:05",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0nFI7giEKquD0eOAj_oiWrhjIV175NgRyL6tASsZpT_XpEafag-JS68aqfAF_7yDYMabtrbp6FqBLAxXfUkf448-m0W-LsxeU3fMONWDHbf_LJq-kI6geJ6Tz_kuMEvuv4CsFkTKOtz-k8ulU8DlhSRelqdmcz0FsI_DStmqYoI0yKjk7fznkPmK6Did8fGvENncpMh_d-tZFKXRNeYfB4eidZImjwGjtXUr7KuDGPy1sgOyvf-lK5aRhm1OP0LQPoJzI62W-vz9w",
    imageAlt: "Person standing on a mountain peak looking at sunset",
  },
];

// Sermon Card Component
const SermonCard: React.FC<{ sermon: Sermon }> = ({ sermon }) => {
  return (
    <article className="group cursor-pointer flex flex-col gap-3 card-hover-scale">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-soft">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          aria-label={sermon.imageAlt}
          style={{ backgroundImage: `url('${sermon.imageUrl}')` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 backdrop-blur-md p-3.5 rounded-full shadow-lg shadow-black/20 text-white transform scale-90 group-hover:scale-100 transition-transform">
            <Play size={36} />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
          {sermon.duration}
        </div>
        {sermon.showProgressBar && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-accent-warm-2 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              style={{ width: `${sermon.progressPercentage}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="px-1">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
          {sermon.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs font-semibold text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/20 px-2 py-0.5 rounded-md">
            {sermon.category}
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
            {sermon.speaker} • {sermon.date}
          </p>
        </div>
      </div>
    </article>
  );
};

const LatestSermons: React.FC = () => {
  return (
    <section
      className="fade-in-up container px-4 mx-auto"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-accent-warm-2 rounded-full"></div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Latest Sermons
          </h3>
        </div>
        <Link
          className="text-sm font-bold text-primary dark:text-primary-light hover:text-primary-hover flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
          href="/sermons/archive"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {latestSermons.map((sermon) => (
          <SermonCard key={sermon.id} sermon={sermon} />
        ))}
      </div>
    </section>
  );
};

export default LatestSermons;
