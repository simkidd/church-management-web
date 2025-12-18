import React from "react";
import EventCard from "./EventCard";
import { ChevronDown, Lightbulb, Quote, Users2 } from "lucide-react";

interface IEvent {
  id: number;
  month: string;
  day: string;
  title: string;
  category: string;
  time: string;
  location: string;
  image: string;
  isOpenToAll: boolean;
}

// Data structures
const mainEvents: IEvent[] = [
  {
    id: 1,
    month: "APR",
    day: "14",
    title: "Romans: A Deep Dive",
    category: "Bible Study",
    time: "Wednesday, 7:00 PM - 8:30 PM",
    location: "Fellowship Hall B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqJKs5yGK4rpRULxKJ14YiLr8Ohz1SWEo28A6N_cHBTN0Ulm_1b59f81ejfvTtF7MzZFiScLplgq3UTeAkFwall35F3fr67oDX5DrCwBn3_gShuUfDYX2-gfl--E34rxBkYmd8pwxdNqK6SkiZ78eJmMbkcbOD5XseivHgdQnxHGF9uW_uhmxyNpwXvKgmikQPpIni_Wt6uEIpl9HiuPxpJuF-PbG9WRJd6tlc89Kw0KqjSvD1yvTqwpJtlTip1GLjmOfbjQdUKA4Q",
    isOpenToAll: false,
  },
  {
    id: 2,
    month: "APR",
    day: "16",
    title: "Pizza & Praise Night",
    category: "Youth",
    time: "Friday, 6:30 PM - 9:00 PM",
    location: "Youth Center",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiTiiYr9zpgBM5IGlMqN2rTZrk-NuSCmK5mX0KPVrRnRSOi-hClgWXuAoOg1jKqETMQ1UvbbXD8CnhtpTCAhWeVlvpDDwI9cw3XbRxwKu9J-O77HGEw4Mlx684i-TKM_p38dGxeSgeDY-SCn7Hc8Lk7betrml786iUp2SPJiwmJemyuIhitxkN8fJg3BqlFgWXwVFEa89a9YMnvTTZ8CIw4WupSm7fxXpN4eMX6AVu0X8GvB0xgiCMC0f9nCJ9rd84fEBBACA3FzdF",
    isOpenToAll: false,
  },
  {
    id: 3,
    month: "APR",
    day: "20",
    title: "Community Food Drive",
    category: "Outreach",
    time: "Saturday, 9:00 AM - 1:00 PM",
    location: "Main Parking Lot",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnA0VHhMe84ReaX0p1CLwb2bIGB96AQHgJNC_w82j8VRjlT5n03lanJfyG6RhKTGX_4BKp5dB2PUn8XldRjMja9EYrfIYWNMgD6YwHH4ynJHI6RFBT8Dx_LQVCXX8jBlwXyFbc_dIl-Cvys2E_mUTySc1-fksLnwKID2mjO8-_wRmgF9uUoHIMQhO43uARvX5dKVxJqswnFbRUMQPLiWqDd-Dc_uwl-OjCdt_gW7NQjCirkGdDdyD5pFSAsuFkmwh2ZI2isTUykyK9",
    isOpenToAll: false,
  },
  {
    id: 4,
    month: "APR",
    day: "21",
    title: "Sunday Service",
    category: "Worship",
    time: "Sunday, 10:00 AM - 11:30 AM",
    location: "Main Sanctuary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe_qiftCghtsP2_feAugGAI88XmYYHEQYMX9NGXtM2YH_QRLheRMHaO_gurhw7olJiXjHrKWqedhD1LX7DIa0eayCASAYFPe23Mqo4ft3h6kLmAEqNZIZkmxg3P2MN22AirksnMe2D0hdi3RdjryK1MXPbI1iQoC6xxoOR8evj74c5EWiymjIpRybS2aiJ36UhuXpg9krnOiE69vtU0cJ-RE0w7Wi6v6f8hIyCUWghiCL87pHWb09JFkw5Z3aFTonIYaxBf3wIXG6a",
    isOpenToAll: true,
  },
];

const weeklyHighlights: {
  id: number;
  day: string;
  title: string;
  time: string;
}[] = [
  {
    id: 1,
    day: "M",
    title: "Men's Prayer Breakfast",
    time: "6:00 AM • Dining Hall",
  },
  {
    id: 2,
    day: "T",
    title: "Women's Choir Rehearsal",
    time: "7:30 PM • Sanctuary",
  },
  {
    id: 3,
    day: "F",
    title: "Young Adults Mixer",
    time: "8:00 PM • Coffee Shop",
  },
];

// Event Card Component

// Weekly Highlight Item Component
const HighlightItem = ({
  highlight,
}: {
  highlight: {
    id: number;
    day: string;
    title: string;
    time: string;
  };
}) => (
  <li className="flex gap-4 items-center group cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-xl transition-colors">
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl h-12 w-12 shrink-0 flex items-center justify-center text-primary font-bold shadow-sm group-hover:border-primary/30 transition-colors">
      {highlight.day}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-primary transition-colors">
        {highlight.title}
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {highlight.time}
      </p>
    </div>
  </li>
);

const EventsGridContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 container px-4 mx-auto">
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm hover:shadow-md cursor-pointer">
            Load More Events
            <ChevronDown />
          </button>
        </div>
      </div>
      <aside className="lg:col-span-4 space-y-8">
        <div className="bg-accent-warm dark:bg-surface-dark rounded-2xl p-6 border border-amber-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="size-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
              <Lightbulb size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              This Week&apos;s Highlights
            </h3>
          </div>
          <ul className="space-y-4 relative z-10">
            {weeklyHighlights.map((highlight) => (
              <HighlightItem key={highlight.id} highlight={highlight} />
            ))}
          </ul>
        </div>

        {/* verse of the day */}
        <div className="bg-linear-to-br from-primary to-primary-dark rounded-2xl p-6 shadow-lg shadow-primary/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Quote size={60} />
          </div>
          <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">
            Verse of the Day
          </h3>
          <p className="text-white italic font-serif text-xl leading-relaxed mb-6 relative z-10">
            &apos;For where two or three are gathered in my name, there am I
            among them.&apos;
          </p>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-blue-300/50"></div>
            <p className="text-sm font-bold text-white">— Matthew 18:20</p>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-soft">
          <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4">
            <Users2 />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Get Involved
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Discover your purpose by joining one of our ministries. There is a
            place for everyone in Dominion City.
          </p>
          <button className="w-full py-3 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-light font-bold text-sm transition-all bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
            Browse Ministries
          </button>
        </div>
      </aside>
    </div>
  );
};

export default EventsGridContent;
