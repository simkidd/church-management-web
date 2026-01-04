"use client";
import useCourses from "@/hooks/use-courses";
import { ArrowRight, BookOpen, Clock, Play, Star } from "lucide-react";
import React from "react";
import FeaturedCourseSkeleton from "./FeaturedCourseSkeleton";
import Link from "next/link";

const FeaturedCourse = () => {
  const { courses, isPending } = useCourses({
    page: 1,
    limit: 1,
    isFeatured: true,
  });

  const featuredCourse = courses[0];

  if (isPending) {
    return <FeaturedCourseSkeleton />;
  }

  if (!featuredCourse) return null;

  const isEnrolled = featuredCourse.enrollment?.isEnrolled === true;

  return (
    <div className="container px-4 mx-auto">
      <section className="w-full rounded-2xl bg-linear-to-r from-primary to-blue-800 text-white p-8 md:p-12 relative overflow-hidden shadow-lg ">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-warm/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-wider w-fit border border-white/20">
              <Star
                size={14}
                className="text-accent-warm-2 fill-accent-warm-2"
              />
              Featured Course
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {featuredCourse.title}
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-2 line-clamp-2">
              {featuredCourse.description}
            </p>
            <div className="flex items-center gap-6 text-sm font-medium text-blue-100">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                {featuredCourse.duration}
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href={`/courses/${featuredCourse._id}`}>
                <button className="bg-white text-primary hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer">
                  {isEnrolled ? "Continue" : " Enroll Now"}

                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${featuredCourse.thumbnail?.url}')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <Play size={36} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedCourse;
