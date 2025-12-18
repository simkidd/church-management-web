import { ArrowRight, Star } from "lucide-react";
import React from "react";

const FeaturedEvents = () => {
  return (
    <section className="px-4 py-5">
      <div className="rounded-2xl overflow-hidden relative shadow-lg group">
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary/30 to-transparent z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent z-10"></div>
        <div
          className="h-[450px] bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
          data-alt="A warm gathering of people in a modern church hall celebrating with hands raised"
          style={{
            backgroundImage: `url(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLhwGPnwQm6iY1N4r1nMoJjT8EuYsbcTajYPWRbXauQCFo0UWrVHY7Tza-4zumIxa_4WJ_Xtf6X7pQxVlanu3uDBYnZ7ds8RYak89DHnExJ7NaPtEZClc85Y_rfjibBdwRuTJsd4j-_MxZyGCtfXXn0kMlKpHScZgDU2vpzVPqkImq34jIKY_Rwmx0D3CxQISl9DDdtxZ1jRo31PbMROHiBemIs-r-INnXJ-ncohGr4b9eV4YwOq3t0kMeqKIxp5_FjCvSY9qYkwx8"
          )`,
          }}
        ></div>
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14 items-start">
          <div className="bg-accent-warm text-amber-700 dark:bg-amber-900/60 dark:text-amber-100 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Star size={14} className="fill-amber-700 dark:fill-amber-100" />
            Featured Event
          </div>
          <h1 className="text-white text-3xl md:text-6xl font-black leading-tight mb-4 drop-shadow-md tracking-tight">
            Easter Sunday Celebration
          </h1>
          <p className="text-slate-100 text-lg md:text-xl font-medium max-w-2xl mb-8 drop-shadow-sm leading-relaxed text-opacity-90">
            Join us in fellowship and growth as we celebrate the resurrection
            together. Everyone is welcome to experience the joy.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="h-12 px-8 bg-white text-primary font-bold rounded-full text-base shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer">
              Register Now
              <ArrowRight size={16} />
            </button>
            <button className="h-12 px-8 bg-primary/40 hover:bg-primary/50 backdrop-blur-md text-white border border-white/30 rounded-full text-base font-bold transition-all cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
