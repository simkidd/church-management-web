import {
  Bookmark,
  Calendar,
  Clock,
  Download,
  Headphones,
  History,
  Play,
  Search,
} from "lucide-react";

// Interface for sermon data
interface Sermon {
  id: number;
  title: string;
  description: string;
  speaker: string;
  date: string;
  duration: string;
  series: string;
  mediaType: "Video" | "Audio Only";
  imageUrl: string;
  speakerImageUrl: string;
  hasAudioDownload: boolean;
  hasVideoDownload: boolean;
}

// Sermon data
const sermonsData: Sermon[] = [
  {
    id: 1,
    title: "Understanding the Covenant",
    description:
      "Discover the biblical foundations of the covenant and how to walk in it daily.",
    speaker: "Rev. David Ogbueli",
    date: "Oct 24, 2023",
    duration: "54:20",
    series: "Faith Series",
    mediaType: "Video",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Rq8PNq6bojKqpFU2WMNXxtTl_wFUNrnxnBgU0uy5BW9DKr2rJOPTbst8Qh0Nm8QJ1lVSS81Sp8qE7uL0qrIwkt7Kkl-kvjlQ56Mg7c7O2DguHbOFzB-3b-CkfbYA7pEoO7Koy_trAEwvGO8bfj-tsHuivfcwiZ669PsT8MTNsfIu7GA_jhDBWnrViUD-cMHinxoctQgm8DYOi8SQ6C9t8jDYq1dEn54c-I1xhQ_vPwmr1Rnh_NbwqOn_IouL5GCK498voffP6B17",
    speakerImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmzLKdYE7pgHT-WyPkRchLbKNFQOnW2h-Y3NZlHw7R6WrmEgshDRx2UPXPGVA1SBKZBnRkXGxlA_ludPk8hl1FQCn9E8kbKLPZ_wnhpdCvmE7inJ7Qt7ba-Skq-ohVEun79MrGfLADA16OnNYZ-kJd3IFZ6lM4o9qtQlUs1fkcmJevo5eSmU8kAcBey_Ez3KUYkbu51X33RBYx-VC2JI0dKD-5s6H3fOFQ_xXIy_BAGMmwT8ZYo8GV4sdLu0XkxHP3ieT0tpxiVjat",
    hasAudioDownload: true,
    hasVideoDownload: true,
  },
  {
    id: 2,
    title: "Kingdom Finance",
    description:
      "Breaking free from lack and stepping into God's provision for your life.",
    speaker: "Pastor Alex",
    date: "Oct 18, 2023",
    duration: "1:12:05",
    series: "Prosperity",
    mediaType: "Audio Only",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfhglpvTqPVyjK7dXouxqbY4Ht9n0HWizWAhmUHA9fiXE7P9amNah8eIzNG_S-BlPYCZZ0Whgw8yNJYASIGOSdD5QvYuCQ0qiyO_iTznasM1_M12Bx-HAik4Mfpf3Gzt_5vC5-KWulk2lrct1h068xkqOrcAsixlRc7Fi3ZdRiHlGrNfgvlqu51RZ7lSlfBXsBu0FHf3W8nXAjpABggchIllYesNbeLZI4kI_vL2cX7iukbYk0N2Ba7ekcCh6DKYlRDvxoB6OsYaJw",
    speakerImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDP2YxvnNQ_u91WIToz_5TfppH9xt2ZI2wFyRQexgAv0EsMxFuPY7ecdiIpqtjG4N96U-1I5_r2Ww9JRcd_pPLguVRBipYtTCJWb4eLYO9PZcmJlLnb6KomsES4wDcO0ZzJ-GxvYgFMa_qeFUxymDR-NGD0sU0aFfzUrp6yuD4hAUUjmyMFBpM_SUPT_j1xP9TZGVeguxdSwBlk8BmrwIvlf6Ype5xmf_pP3-y0pVN0ZZOjnPDBXWKE5yyq3Q50Cj6yIFpHx4yvhThQ",
    hasAudioDownload: true,
    hasVideoDownload: false,
  },
  {
    id: 3,
    title: "Deep Worship Experience",
    description:
      "A compilation of powerful worship sessions to ignite your spirit.",
    speaker: "DC Worship Team",
    date: "Oct 15, 2023",
    duration: "48:15",
    series: "Worship",
    mediaType: "Video",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPD0PwKqwMbhtqg3-68wr-AA9HPQbuqHpB0k0hxyD13_mfP_mb7ODw4dc7Fu-cyNY8QftMWkHzlUhq1disjWEyxxbe3u9VmEZUD4ALyKyrk05zfvdsGooJfCxlpwPvhmT9msqGp7WJqx6zoeKu6a7Y9weiL8XSsZjfIn5m61sBQcjwOzm9uPUK2J_cxpZAZU7F4Oz3nmaBVD7HW6nLfRQnSI5214Jv0Q9l6L79Xe40fafNDyE3cm6QaXpCjRmVz7cklYvZQncXHut",
    speakerImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGfjdltW3TCQqAzWC4mkk-oR49bKqJa5giwahOU1EY_tejxmzdOIgBB7HhozmOQ3DsF8czvHe9nAvR2I9k2KZz7VLIRewswPUCSTYDc3sRds519Vk3-ZZ8AxMPMtg20DlZyLn0qUZEtpwHRxgGcdPDN7guoLRaSa4B7EXcYhK2IVAzp3v0kv7o9PME_4NBFT3yUV1J9looax2jsZCPJR25zl1waBMCQure043RPJQgLvZfAmv_ilHLkIUJfDqhAfFOm6xNxu-vbPCq",
    hasAudioDownload: true,
    hasVideoDownload: true,
  },
  {
    id: 4,
    title: "Walking in Divine Health",
    description:
      "Learn how to appropriate the healing power of Jesus in your physical body.",
    speaker: "Rev. David Ogbueli",
    date: "Oct 10, 2023",
    duration: "1:05:30",
    series: "Healing",
    mediaType: "Video",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2tKjqHvNKwCvc1zBqzWfCtqDl8OoxPy48Zzse1qihjLJgLIxaoABpjGkP0oZAiiVCIUdM3V3U5dIVZonGMO1WnDLdPdsFt0GWbrKGanUVGVDupcCPsgrH2is84ecT8kQwkTRwSN8KyYSD098jgYtQGLKBtG8OE2b3Qdl9QChD-jfJ6Hodu5mPEfmkVWsJvG9uCGfq5Gk0KPep_7fgDe2hGX039c6HZJxqRNQBDOlkp4qnj4ZR3Ve-I1coAeEHzpq3NYpMcJvDqnkY",
    speakerImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqwKNo-hD2kAh0KjEDPmwyAn6r_ngcFxDofz7N9sOuCyZiHo4pBXDjdf6FcDj2XOn9j9CCVl_DBgFkojvpYF2bTAD32-oxrtBK7wa7iaar-3951JrGrOz5BwiUFZRCzYhprO0mJO363YmSVFNs11PzDSedVfkn0mWmZBhRthvQHug7NFEfKeQEWcJpzFmtMyA-fRferSiHFPsBL-OWvEbN3utJPYMUXknQ-WqJdvycnaXMAwnf4m1MXguNypkHgmLIy9MBhIvy8rK7",
    hasAudioDownload: true,
    hasVideoDownload: true,
  },
  {
    id: 5,
    title: "The Heart of a Leader",
    description:
      "Developing character and integrity in your leadership journey.",
    speaker: "Dr. Miles",
    date: "Sep 28, 2023",
    duration: "35:40",
    series: "Leadership",
    mediaType: "Audio Only",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrjlt20cVz-YLheGuvq0ZWu0NYieW1SXKHT9ut-65x7gMZAsr7vs4pNLJwCpOnwSklgLNt-Xp1Jw8eUh7jfygUf-DyD0jexvw-hwiIbrecFT7Tul2PKV_JL8JIrgzMQnB2k4FQXuArlCfHRBit14NDF5mfXz5xZsNbTefMVIozI3S1W6R_NFkTAQ4TCHn1LagAfS8k0Rhwu9exblLlaVLxDTkJGagUYPVGWS1v5iX9fQTU8s4xmEHM5LHumQolcChrq9I2cwCrbQJW",
    speakerImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2AsIXIMJK8OhOImshYIVkUpZrK_bgAsFXHI3wBc8gl2Tckmjzy2ssUSnRRIIXDs7oZzlM3y6Ez4icfUvit1u8ZE9FfVntIqTiXVSS3oIpNTc5-CYUTKBHK2N7W-FzyO_5Nzq_nTV1k28A7VJ4Lj1iwfHkpLU6Or5CKVRLjOQt8rq7r-AmsvMivkerVxSyU7xaJ8ALnbRsPVz3D7zqwgOqEaZWBhYynPmHDP9K8PNE7nLPhuH02SNtRUAKvA1VFDIQ0-LD4wvv7SQ_",
    hasAudioDownload: true,
    hasVideoDownload: false,
  },
  {
    id: 6,
    title: "Building a Godly Home",
    description:
      "Practical steps to raising children and maintaining a healthy marriage.",
    speaker: "Pastor Alex",
    date: "Sep 21, 2023",
    duration: "42:10",
    series: "Family",
    mediaType: "Video",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxBg4sq5NZN1CRUverCbazPPrTi5RCs2ddRisEzNNG7_Am0Kfpgx-Mqn65nUiEsAqMMqEAGdbPOBuD_OExPuYL_0azfezN3Ob8I-g8yjjS_ME_XgqeqbyLpjbpJEUuotzWikxfalsb_bU32T4v925Vji3c-5OoctoThKQeHIMdsxNwZKNEtA4DOHubuTd4c6qD83Z8pnkToCSutdRUFwnEV6-BTx0K583DiIsiOjadbhz2WDAxXevc2gusK8WrDbOtImqCXmDLaGio",
    speakerImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCh5SeXZ1PpW2iUnMBtvzM4INPQ-Z29WLJ8-p7IVJu2cQSvQBv-6vib5jamfksSHfkiOjkLE3ITL1LD9BGZQpokB5G2J45tujgajwtVvEb3PNGdailmNegHXvV94k-twU2ypIRzSFVuCs3UHp6spNvIyrQzKhHKzdvoTrkyMB8Znmq9yYU8qlmLEaLnqewYOx2Z4int-1huqEhTXdOQiBdR8M1gXDBw-zTuGOiJ99JD2tU9PSLbB2ggnXTu9bY1kyNcSR6Pto0eQC19",
    hasAudioDownload: true,
    hasVideoDownload: true,
  },
];

const SermonsArchiveContent = () => {
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
          {sermonsData.map((sermon) => (
            <div
              key={sermon.id}
              className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-video overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${sermon.imageUrl}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1">
                  <Clock size={14} />
                  {sermon.duration}
                </div>
                <div
                  className={`absolute top-3 left-3 ${
                    sermon.mediaType === "Video"
                      ? "bg-primary text-white"
                      : "bg-white/20 backdrop-blur-md text-white border border-white/20"
                  } px-2 py-1 rounded text-xs font-bold shadow-md`}
                >
                  {sermon.mediaType}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-primary/90 text-white rounded-full p-3 shadow-lg scale-90 hover:scale-100 transition-transform cursor-pointer">
                    <Play size={36} />
                  </button>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {sermon.series}
                  </span>
                  <button className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    <Bookmark />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-[#111418] dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-4 line-clamp-2">
                  {sermon.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-8 rounded-full bg-slate-200 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${sermon.speakerImageUrl}')`,
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#111418] dark:text-gray-200">
                        {sermon.speaker}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {sermon.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {sermon.hasAudioDownload && (
                      <button
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="Download Audio"
                      >
                        <Headphones size={20} />
                      </button>
                    )}
                    {sermon.hasVideoDownload && (
                      <button
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="Download Video"
                      >
                        <Download size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
