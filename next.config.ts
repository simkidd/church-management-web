import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",

  workboxOptions: {
    runtimeCaching: [
      // Pages / App shell
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          expiration: {
            maxEntries: 50,
          },
        },
      },

      // API GET requests
      {
        urlPattern: ({ url, request }) =>
          url.pathname.startsWith("/api") && request.method === "GET",
        handler: "NetworkFirst",
        options: {
          cacheName: "api",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24,
          },
        },
      },

      // Images
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },

      // Audio / Video (sermons, lessons)
      {
        urlPattern: ({ request }) =>
          request.destination === "audio" || request.destination === "video",
        handler: "CacheFirst",
        options: {
          cacheName: "media",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          },
        },
      },
    ],
  },

  fallbacks: {
    document: "/~offline",
  },
});

const nextConfig: NextConfig = withPWA({
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
});

export default nextConfig;
