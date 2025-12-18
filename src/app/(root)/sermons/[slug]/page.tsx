import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Calendar,
  ClosedCaption,
  Download,
  FileStack,
  Fullscreen,
  Headphones,
  Layers,
  Play,
  PlayCircle,
  Settings,
  Share,
  Share2,
  Tag,
  Volume2,
} from "lucide-react";
import Link from "next/link";

const SermonPage = () => {
  return (
    <div className="container px-4 mx-auto py-5">
      <nav className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        <a
          className="text-text-muted hover:text-primary transition-colors"
          href="#"
        >
          Home
        </a>
        <span className="text-text-muted">/</span>
        <a
          className="text-text-muted hover:text-primary transition-colors"
          href="#"
        >
          Sermons
        </a>
        <span className="text-text-muted">/</span>
        <a
          className="text-text-muted hover:text-primary transition-colors"
          href="#"
        >
          Romans: The Gospel of God
        </a>
        <span className="text-text-muted">/</span>
        <span className="text-primary dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
          Walking in Faith: Romans 8
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-text-main dark:text-white mb-3">
              Walking in Faith: Romans 8
            </h1>
            <p className="text-lg text-text-muted dark:text-gray-400 font-medium">
              Part 4 of the &apos;Romans: The Gospel of God&apos; Series
            </p>
          </div>
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-black aspect-video relative group ring-1 ring-black/5 dark:ring-white/10">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              data-alt="Abstract golden light shining through dark clouds representing hope and faith"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCB2Fh2JdOBR3FBZEvLuzqAVnNBXLTn3cR8Dvl-Y-cKjAhLIT8H42lnQRwL1jxeWRdDODfNecMErQmY6NsUrP85T706SgAKypzO4b_3jDqoyqLYZJkZhYi4rH4g12Ji7H0Ogt-tPwf5KjwQXORQs7V-0KPooBjkxA8kKiC2ok1ORFD4o0brufsCVBLj_Nu2DEwYLH34iD21lFHfU1y3flWsMaqyYAs9KMy99K0IJrqH9k2ktIBOfHJeTDD5C5lGrr3BwzqDiGIwlUq')",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button className="flex items-center justify-center size-20 rounded-full bg-white/20 text-white hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-2xl backdrop-blur-md border border-white/30 group cursor-pointer">
                <Play size={40} className="ml-1" />
              </button>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-6 py-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col gap-2">
                <div className="flex h-1.5 w-full cursor-pointer items-center bg-white/30 rounded-full hover:h-2 transition-all">
                  <div className="h-full w-[35%] rounded-full bg-primary relative">
                    <div className="absolute -right-1.5 -top-[3px] size-3 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-primary transition-colors">
                      <Play />
                    </button>
                    <button className="text-white hover:text-primary transition-colors">
                      <Volume2 />
                    </button>
                    <span className="text-white/90 text-xs font-medium tracking-wide">
                      14:20 / 45:00
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-primary transition-colors">
                      <ClosedCaption />
                    </button>
                    <button className="text-white hover:text-primary transition-colors">
                      <Settings />
                    </button>
                    <button className="text-white hover:text-primary transition-colors">
                      <Fullscreen />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-100 dark:border-white/10">
            <button className="flex items-center gap-2 h-12 px-6 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 cursor-pointer">
              <PlayCircle size={20} />
              <span>Watch Video</span>
            </button>
            <button className="flex items-center gap-2 h-12 px-6 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-text-main dark:text-white border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer">
              <Headphones size={20} />
              <span>Listen Audio</span>
            </button>
            <div className="grow"></div>
            <div className="flex items-center gap-2">
              <button
                className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-muted hover:text-primary transition-all cursor-pointer"
                title="Download Resources"
              >
                <Download size={20} />
              </button>
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
              <button className="pb-3 px-1 border-b-2 border-transparent text-text-muted hover:text-text-main dark:hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap">
                Transcript
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent text-text-muted hover:text-text-main dark:hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap">
                Study Notes
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent text-text-muted hover:text-text-main dark:hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap">
                Discussion
              </button>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-text-main/80 dark:text-gray-300">
              <p className="leading-relaxed">
                In this powerful message from Romans 8, we explore what it truly
                means to walk in the Spirit rather than the flesh. The apostle
                Paul reminds us that there is &apos;no condemnation&apos; for
                those who are in Christ Jesus, setting the stage for a life of
                freedom and purpose.
              </p>
              <p className="leading-relaxed mt-4">
                We&apos;ll dive deep into the theological implications of
                adoption as sons and daughters of God, understanding how the
                Holy Spirit testifies with our spirit. Join us as we uncover the
                transformative power of the Gospel that not only saves us but
                sustains us daily.
              </p>
              <h3 className="text-xl font-bold text-text-main dark:text-white mt-6 mb-3">
                Key Takeaways
              </h3>
              <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                <li>
                  Freedom from guilt and shame through Christ&apos;s sacrifice.
                </li>
                <li>
                  The active role of the Holy Spirit in a believer&apos;s life.
                </li>
                <li>
                  Understanding our new identity as adopted children of God.
                </li>
                <li>Finding hope in the midst of present sufferings.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="size-16 rounded-full bg-cover bg-center shrink-0 border-2 border-primary/20 ring-2 ring-white dark:ring-white/5"
                data-alt="Portrait of Pastor John Doe smiling warmly"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3yz02OO84nXR43NRtP1gDjoFeO6m--CTaVamrhQP9sa9q6-yYiz6cVIOObManSSgJLrhBQ_hChND0_hWhCbg2bCx61n6Mbb21V66UK2mNnQKPXfGJEkWmenWyow-tqtZPC3hKY-qeNhbfSnbU0sJQlGzVIjHlN7aZF2L3S8dEGvVn3jp3B88FXXYMPdO_PGPWanjktoVzqvA8TyS147qE972YZRFLmUbb7diyqWMUsnShPmlPAaa0LQMJNAf0ecusU34M4DH8SAh0')",
                }}
              ></div>
              <div>
                <h3 className="font-bold text-lg text-text-main dark:text-white">
                  Pastor John Doe
                </h3>
                <p className="text-text-muted text-sm">Senior Pastor</p>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-primary dark:text-white text-sm font-bold hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
              View Profile
            </button>
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
                    October 15, 2023
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
                  <a
                    className="text-text-main dark:text-white font-medium hover:text-primary decoration-primary/30 underline underline-offset-4 transition-colors"
                    href="#"
                  >
                    Romans 8:1-17
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-primary dark:text-blue-300">
                  <Layers />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-text-muted mb-1">
                    Series
                  </p>
                  <a
                    className="text-text-main dark:text-white font-medium hover:text-primary transition-colors"
                    href="#"
                  >
                    Romans: The Gospel of God
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="size-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-primary dark:text-blue-300">
                  <Tag />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-text-muted mb-1">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-xs font-medium text-text-main dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                      Faith
                    </span>
                    <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-xs font-medium text-text-main dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                      Salvation
                    </span>
                    <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-xs font-medium text-text-main dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                      Holy Spirit
                    </span>
                  </div>
                </div>
              </div>
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

      <section className="mt-20 border-t border-gray-100 dark:border-white/10 pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-main dark:text-white">
            More from this Series
          </h2>
          <Link
            className="text-sm font-bold text-primary dark:text-primary-light hover:text-primary-hover flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
            href="#"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a className="group flex flex-col gap-3" href="#">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-gray-100 dark:bg-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                data-alt="Open bible on a wooden table with warm lighting"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfqDThRHlIZ_nTY2MJoI1Ifyj3Yc-naWzbw0nYY5vj7YR0M5zDQKK9vBG-kUTsLF-Dt4wZb3_ByamKpCiICGRpB0pX9en0wdaoAVOCCOTr1ArAWCafLujrFKxpFQJ6Lx3UGp1HyGwnWyAuPRQ0q4R7YWxpbdg_32Z4ZbK9Y9IugT6DwJHKwc29iMXHwLUp_u6j_GA7AGPere_TIsWnuHuCcHBJO9cWlVFTkdNVhnkEAI9HZi50tM1kFPtWi7DdmhDYEVxmmeckEKGx')",
                }}
              ></div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                42:15
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium mb-1">
                Part 3 • Oct 08, 2023
              </p>
              <h3 className="text-base font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
                The Law and Sin
              </h3>
              <p className="text-sm text-text-muted mt-1 truncate">
                Understanding the purpose of the law in a believer&apsos;s life.
              </p>
            </div>
          </a>
          <a className="group flex flex-col gap-3" href="#">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-gray-100 dark:bg-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                data-alt="Person raising hands in worship during a church service silhouette"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdF_iwTvdz1d0t_8ife9DHcboRg00rpI8Lfaze_Pa2QhNvC44vx3Z1eVZW3wr_I9lTftd1AA1VlJYEn7r_LBbqEETTQQ1BM05i3ezT1jN2ZY70j-xy3XJvPM_-nd_vnu2J60oUIAJdoWgsy6SoDnAjLZKAhtLgb8H6ivRHgdfErYKTlFbPl3Ca6UDBBKIEu58AToEngIfymODYNyt86t8XwV0QjU24HfnyqKsKF-Ri4KA-_mQL5jarDzdkksDprIOSi-1qfEOTbhbt')",
                }}
              ></div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                38:40
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium mb-1">
                Part 2 • Oct 01, 2023
              </p>
              <h3 className="text-base font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
                Dead to Sin, Alive in Christ
              </h3>
              <p className="text-sm text-text-muted mt-1 truncate">
                Exploring the meaning of baptism and new life.
              </p>
            </div>
          </a>
          <a className="group flex flex-col gap-3" href="#">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-gray-100 dark:bg-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                data-alt="Group of people praying together holding hands"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA347o2ryw7553OdpF0TLGgUI3tDqq1FXgx44Qu1BllIuoyd2SlyxLqdHk3cMn97enUslMFTNyI7GVIWTcg0AJvla1BJh0qVSAyBNBMaPoM_GuqgiP9j1sGOFslKsdjSdGHjZIYmYDmihIE736526X74bvJ5w46DzNfI1udBYy6B9q33d-GJXuUEG1JysVptRSGOAWlX8-LhxBACEeuEf22GxJyaQ7y3dcb2jmInB77a5XtFle-qKj-pSwjCRrBcm97PKrquU43PP6q')",
                }}
              ></div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                45:10
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium mb-1">
                Part 1 • Sep 24, 2023
              </p>
              <h3 className="text-base font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
                Justified by Faith
              </h3>
              <p className="text-sm text-text-muted mt-1 truncate">
                The foundation of our relationship with God.
              </p>
            </div>
          </a>
          <a className="group flex flex-col gap-3" href="#">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-gray-100 dark:bg-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                data-alt="Sunlight streaming through trees in a forest"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbXhyMZWcenZEALtPgq5WUBd_EDFG7w-wNlZ4_yDGpsI_YxQr4RncdAuF7kynyKC9sXhCrZqj5xJMJeKp0mPol8CI3gaDVwDMvqIkwnqJKQlL8cmVYR6DMxvwqP_OfeFL7JUI8CWTyNnpbpbl0o9fSwL9v4pbzYzKnLySAj7wGz0v46o8i-BnLt2D6NbVDpjCmIMBGSXffXVDW5-rWkGO4mb_yjhFxJlxG4rvzwghChX1sQmDUxgpCWW_elukeiTZxiqGDhIk5y1_O')",
                }}
              ></div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"></div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                41:00
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium mb-1">
                Intro • Sep 17, 2023
              </p>
              <h3 className="text-base font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
                Series Introduction: Romans
              </h3>
              <p className="text-sm text-text-muted mt-1 truncate">
                An overview of Paul&apos;s letter to the Romans.
              </p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default SermonPage;
