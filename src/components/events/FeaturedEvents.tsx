"use client";
import useFeaturedEvents from "@/hooks/useFeaturedEvents";
import { ArrowRight, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const FeaturedEvents = () => {
  const { featuredEvents } = useFeaturedEvents();

  return (
    <section className="px-4 py-5">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {featuredEvents.map((event) => {
            return (
              <CarouselItem key={event._id}>
                <div className="rounded-2xl overflow-hidden relative shadow-lg group">
                  <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary/30 to-transparent z-10 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent z-10"></div>
                  <div
                    className="h-112.5 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
                    data-alt="A warm gathering of people in a modern church hall celebrating with hands raised"
                    style={{
                      backgroundImage: `url(${event.image?.url})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14 items-start">
                    <div className="bg-accent-warm text-amber-700 dark:bg-amber-900/60 dark:text-amber-100 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <Star
                        size={14}
                        className="fill-amber-700 dark:fill-amber-100"
                      />
                      Featured Event
                    </div>
                    <h1 className="text-white text-3xl md:text-6xl font-black leading-tight mb-4 drop-shadow-md tracking-tight">
                      {event.title}
                    </h1>
                    <p className="text-slate-100 text-lg md:text-xl font-medium max-w-2xl mb-8 drop-shadow-sm leading-relaxed text-opacity-90 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {event.requiresRegistration && (
                        <button className="h-12 px-8 bg-white text-primary font-bold rounded-full text-base shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer">
                          Register Now
                          <ArrowRight size={16} />
                        </button>
                      )}
                      <button className="h-12 px-8 bg-primary/40 hover:bg-primary/50 backdrop-blur-md text-white border border-white/30 rounded-full text-base font-bold transition-all cursor-pointer">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default FeaturedEvents;
