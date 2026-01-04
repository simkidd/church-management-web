import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { config } from "@/utils/config";
import { Suspense } from "react";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: config.SITE_NAME,
    template: `%s | ${config.SITE_NAME}`,
  },
  description: config.SITE_DESCRIPTION,
  metadataBase: new URL(config.SITE_URL),
  keywords: [],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: {
      default: config.SITE_NAME,
      template: `%s | ${config.SITE_NAME}`,
    },
    description: config.SITE_DESCRIPTION,
    url: config.SITE_URL,
    siteName: config.SITE_NAME,
    images: [
      {
        url: `/icons/android-launchericon-512-512.png`, // OpenGraph image
        width: 1200,
        height: 630,
        alt: config.SITE_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: config.SITE_NAME,
      template: `%s | ${config.SITE_NAME}`,
    },
    description: config.SITE_DESCRIPTION,
    images: ["/icons/android-launchericon-512-512.png"],
    creator: "@onidev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light dark:bg-background-dark`}
      >
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster position="top-right" expand={false} richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
