"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// TypeScript Interface
interface SermonSeries {
  id: number;
  title: string;
  description: string;
  parts: string;
  imageUrl: string;
  imageAlt: string;
}

// Sermon Series data
const sermonSeriesData: SermonSeries[] = [
  {
    id: 1,
    title: "The Book of John",
    description:
      "A deep dive into the gospel of John, exploring the divinity of Christ and his love for humanity.",
    parts: "6 Part Series",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqLuU3SV76M_JnNSyvNIRBtLt1sdzsnW8UIGp17AeFRbiB-yde-BfjnH6YgEVMkIEsGCHY38O8_E48CRXbR0Gtf4K863R6z4EVFmJ6btuMRhTfIIWmjniA4rZ6d_dzjkPORuZNrTwFaWsk9IXhe1FiT3QLuzbIcM-5bmyUk67BWHEvA9iGYSUbuYAXoewH1-iQVsmgSh_LFmwPIapvkiZF2cyTbKYDjm55s_ak4CPp0G6G1xWhAJci_ORZSq2RZECWwpydtkh6eXqK",
    imageAlt: "Abstract golden light texture representing the book of John",
  },
  {
    id: 2,
    title: "Kingdom Family",
    description:
      "Building a home that honors God through marriage, parenting, and legacy.",
    parts: "4 Part Series",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAwJrUDROaYDUSd7Ts3H84siqrDMiIhTLDrJE0jlJTx1LMUSbSA15caWmSEfwVzTda92ufH0eqvOoCkvfJblE9XQxWb9bQ81YTYkK2r4LgNw2QKQ2OGY7PEdeJ5bglqscQJhcywo5RxZJWaPQEexV8hookKMFZjig3ZqYO4Z262rDL7uPJOX6P8jTYAdx_NVtdzP4owmx_YE_fSMR4WMw7kVYVyajKIDAgX-JZoJantruf8KzJ2IABjcojndEPV1dTB9LBxKPQ42uZ",
    imageAlt: "Family walking on a beach at sunset",
  },
  {
    id: 4,
    title: "Foundations of Faith",
    description:
      "Revisiting the core beliefs that ground us as followers of Christ.",
    parts: "8 Part Series",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFycm6Klhp3dWqKSY4_lq_SfCo8ZBjlITb3a4lbd3u0mCS9JNGlcIrxk7UAmV57NsVO1rIYFNNhFbg2bFrfpl0djGoBY_Zj6_UNh8_LcnA3eN6e4fHR3MbWgJY7Uhp6YTb2tCg8WoBvq4ntSIyNnz64SsEPj-KVTtJxrrkxapWCtaixgV3Pd0wqYyROAhGrMDB7Sgsi-3aR4C4vN5sfh4FlVgKc5okLEyQqzw94GB4yp9SwlHWsa3uvQu4O_OVMXeLN8oOXB_cqN_",
    imageAlt: "Minimalist geometric shapes with a modern aesthetic",
  },
  {
    id: 5,
    title: "Foundations of Faith",
    description:
      "Revisiting the core beliefs that ground us as followers of Christ.",
    parts: "8 Part Series",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFycm6Klhp3dWqKSY4_lq_SfCo8ZBjlITb3a4lbd3u0mCS9JNGlcIrxk7UAmV57NsVO1rIYFNNhFbg2bFrfpl0djGoBY_Zj6_UNh8_LcnA3eN6e4fHR3MbWgJY7Uhp6YTb2tCg8WoBvq4ntSIyNnz64SsEPj-KVTtJxrrkxapWCtaixgV3Pd0wqYyROAhGrMDB7Sgsi-3aR4C4vN5sfh4FlVgKc5okLEyQqzw94GB4yp9SwlHWsa3uvQu4O_OVMXeLN8oOXB_cqN_",
    imageAlt: "Minimalist geometric shapes with a modern aesthetic",
  },
  {
    id: 3,
    title: "Foundations of Faith",
    description:
      "Revisiting the core beliefs that ground us as followers of Christ.",
    parts: "8 Part Series",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFycm6Klhp3dWqKSY4_lq_SfCo8ZBjlITb3a4lbd3u0mCS9JNGlcIrxk7UAmV57NsVO1rIYFNNhFbg2bFrfpl0djGoBY_Zj6_UNh8_LcnA3eN6e4fHR3MbWgJY7Uhp6YTb2tCg8WoBvq4ntSIyNnz64SsEPj-KVTtJxrrkxapWCtaixgV3Pd0wqYyROAhGrMDB7Sgsi-3aR4C4vN5sfh4FlVgKc5okLEyQqzw94GB4yp9SwlHWsa3uvQu4O_OVMXeLN8oOXB_cqN_",
    imageAlt: "Minimalist geometric shapes with a modern aesthetic",
  },
];

// Sermon Series Card Component
const SermonSeriesCard: React.FC<{ series: SermonSeries }> = ({ series }) => {
  return (
    <Link href="#">
      <div className="group relative overflow-hidden rounded-2xl aspect-4/3 md:aspect-3/2 shadow-md hover:shadow-xl transition-all border border-slate-200/50 dark:border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          aria-label={series.imageAlt}
          style={{ backgroundImage: `url('${series.imageUrl}')` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent-warm-2 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              {series.parts}
            </span>
          </div>
          <h4 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-sm group-hover:text-accent-warm transition-colors">
            {series.title}
          </h4>
          <p className="text-slate-200 text-sm line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
            {series.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const SermonSeries: React.FC = () => {
  return (
    <section
      className="fade-in-up container px-4 mx-auto"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-accent-warm-2 rounded-full"></div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Sermon Series
          </h3>
        </div>
        <div className="flex gap-2"></div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {sermonSeriesData.map((series) => (
            <CarouselItem
              key={series.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <SermonSeriesCard series={series} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-0 right-0 flex gap-2 z-10">
          <CarouselPrevious className="-top-10 -left-24 size-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm cursor-pointer" />
          <CarouselNext className="-top-10 right-0 size-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm cursor-pointer" />
        </div>
      </Carousel>
    </section>
  );
};

export default SermonSeries;
