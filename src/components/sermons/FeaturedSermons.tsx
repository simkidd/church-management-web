"use client";

import { Calendar, PlayCircle, Plus } from "lucide-react";
import Link from "next/link";

export const FeaturedSermons = () => {
  return (
    <section className="px-4 py-5">
      <div
        className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end shadow-xl shadow-primary/5 fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt="Pastor speaking on stage with warm lighting and a blurred audience background"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5Cxw9BYKayqQqZn06-TsU-dpjCsvl0qEmcPXf0nP47Um9TtQH-LFLh4oBbHaQYVLe9r0IWPRI2PY6QQZcNbsVOMz6pSJtBVpEGGKElCRDVppVdjr4Iw0pEROWgpa_5IMq1rKxkJM3oCV6kn9kLLKlz2lKF6AuSS7ekqlHEcQgtJ7VuLBy5qoxMPOzBpdfuJTx6U6dMvbCiKHeGa1vsC0I4ZZaS0m-HE-YJ97VicmkeGYY_8EMcY_gd6RCvs-31VQ7q8Y0-S5ufqS3')",
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-slate-900/60 to-transparent mix-blend-multiply opacity-90"></div>
        <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-transparent to-transparent"></div>
        <div className="relative z-10 p-6 md:p-10 lg:p-14 w-full max-w-4xl flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="bg-accent-warm-2 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-glow">
              New Release
            </span>
            <span className="text-slate-200 text-sm font-medium flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <Calendar size={14} />
              Oct 15, 2023
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
            Walking in Faith: <br />
            Trusting God in Uncertainty
          </h1>
          <p className="text-slate-100 text-base md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed opacity-95 text-shadow-sm">
            Join Pastor Michael as he explores how to maintain steadfast faith
            during life&apos;s most challenging seasons, drawing wisdom from the
            book of Hebrews.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href={`/sermons/slug`}>
              <button className="bg-white hover:bg-slate-50 text-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                <PlayCircle />
                Watch Sermon
              </button>
            </Link>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all border border-white/20 hover:border-white/40 cursor-pointer">
              <Plus />
              Add to List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
