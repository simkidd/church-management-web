import Logo from "@/components/shared/Logo";
import { config } from "@/utils/config";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex w-full flex-row relative">
      <div className="flex flex-col w-full lg:w-[40%] bg-white dark:bg-background-dark relative z-10 px-6 py-8 lg:p-12 xl:p-24 min-h-svh h-svh overflow-y-auto">
        <div className="flex-none mb-10 lg:mb-0 lg:absolute lg:top-6 lg:left-12">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo className="h-8" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-3">
                {config.SITE_NAME}
              </span>
              <span className="text-xs font-medium">{config.BRANCH_NAME}</span>
            </div>
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          {children}
        </div>
      </div>

      {/* background image */}
      <div className="hidden lg:block lg:w-[60%] relative bg-[#f0f2f4] dark:bg-[#1a222d] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#111821] via-[#111821]/40 to-transparent opacity-90 flex flex-col justify-end p-16 xl:p-24"></div>
        <div className="absolute bottom-0 left-0 w-full p-16 flex flex-col gap-4  z-10">
          <div className="h-1 w-12 bg-primary rounded-full mb-2"></div>
          <blockquote className="text-white text-2xl font-medium leading-normal drop-shadow-md max-w-lg">
            &apos;For where two or three gather in my name, there am I with
            them.&apos;
          </blockquote>
          <cite className="text-white/80 text-sm font-semibold tracking-wider uppercase not-italic">
            Matthew 18:20
          </cite>
        </div>
      </div>
    </div>
  );
}
