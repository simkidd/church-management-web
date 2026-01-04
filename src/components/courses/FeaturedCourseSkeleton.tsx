import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCourseSkeleton = () => {
  return (
    <div className="container px-4 mx-auto">
      <section className="w-full rounded-2xl bg-linear-to-r from-primary/70 to-blue-800/70 p-8 md:p-12 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-4">
            {/* Badge */}
            <Skeleton className="h-6 w-36 rounded-full bg-white/30" />

            {/* Title */}
            <Skeleton className="h-10 w-4/5 rounded-lg bg-white/30" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/25" />
              <Skeleton className="h-4 w-5/6 bg-white/25" />
            </div>

            {/* Meta */}
            <div className="flex gap-6 mt-2">
              <Skeleton className="h-4 w-24 bg-white/25" />
              <Skeleton className="h-4 w-20 bg-white/25" />
            </div>

            {/* CTA */}
            <Skeleton className="h-12 w-40 rounded-xl bg-white/40 mt-4" />
          </div>

          {/* RIGHT (video preview) */}
          <div className="hidden md:flex justify-center">
            <Skeleton className="w-full max-w-sm aspect-video rounded-xl bg-white/30" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedCourseSkeleton