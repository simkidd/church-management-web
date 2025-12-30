"use client";
import {
  AlertCircle,
  ClosedCaption,
  Loader2,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// types/media-player.types.ts
export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  video?: {
    url: string;
    type?: string; // 'video/mp4', 'video/webm', etc.
  };
  audioUrl?: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  duration?: number; // in seconds
  createdAt?: string;
}

export interface VideoPlayerProps {
  media: MediaItem;
  type?: "sermon" | "lesson" | "generic";
  showTitle?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onError?: (error: Error) => void;
}

const VideoPlayer2: React.FC<VideoPlayerProps> = ({
  media,
  type = "generic",
  showTitle = true,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  className = "",
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onError,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(media.duration || 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(controls);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoUrl = media.video?.url;
  const thumbnailUrl = media.thumbnail?.url;

  // Format time display (HH:MM:SS or MM:SS)
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current || !videoUrl) return;

    if (isPlaying) {
      videoRef.current.pause();
      onPause?.();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        setHasError(true);
        onError?.(error);
      });
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume toggle
  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;

      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(pos * 100);
      onTimeUpdate?.(newTime, duration);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [duration]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-black aspect-video relative group ring-1 ring-black/5 dark:ring-white/10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => controls && isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      {videoUrl && !hasError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          poster={thumbnailUrl}
          preload="metadata"
          onClick={togglePlay}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
        >
          <source src={videoUrl} type={media.video?.type || "video/mp4"} />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Thumbnail fallback
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black">
          {thumbnailUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={thumbnailUrl}
                alt={media.thumbnail?.alt || media.title}
                fill
                className="object-cover opacity-60"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <Play size={64} className="mx-auto mb-4 opacity-70" />
                <p className="text-xl font-semibold mb-2">{media.title}</p>
                <p className="text-white/80">
                  {type === "sermon"
                    ? "Sermon Video"
                    : type === "lesson"
                    ? "Lesson Video"
                    : "Media Content"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-30">
          <AlertCircle size={64} className="text-red-400 mb-4" />
          <h3 className="text-white text-xl font-semibold mb-2">
            Unable to load video
          </h3>
          <p className="text-white/70 text-center max-w-md mb-6">
            The video content could not be loaded. Please check your connection
            or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="relative">
            <Loader2 size={48} className="text-white animate-spin" />
          </div>
        </div>
      )}

      {/* Play button overlay (shows when not playing) */}
      {!isPlaying && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center size-20 rounded-full bg-white/20 text-white hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-2xl backdrop-blur-md border border-white/30 group cursor-pointer"
          >
            <Play size={40} className="ml-0.5" />
          </button>
        </div>
      )}

      {/* Controls */}
      {controls && (
        <div
          className={`absolute inset-x-0 bottom-0 px-6 py-4 z-20 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex flex-col gap-3">
            {/* Progress bar */}
            <div
              className="flex h-1.5 w-full cursor-pointer items-center bg-white/30 rounded-full hover:h-2 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full rounded-full bg-primary relative transition-all duration-150"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -right-1.5 -top-[3px] size-3 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform"></div>
              </div>
              {isLoading && (
                <div className="h-full w-full rounded-full bg-linear-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                  disabled={hasError}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                  disabled={hasError}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>

                {/* Volume slider */}
                <div className="w-24 hidden sm:block">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    disabled={hasError}
                    className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>

                <span className="text-white/90 text-xs font-medium tracking-wide">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                  disabled={hasError}
                >
                  <ClosedCaption size={20} />
                </button>
                <button
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                  disabled={hasError}
                >
                  <Settings size={20} />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-primary transition-colors cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 size={20} />
                  ) : (
                    <Maximize2 size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media title overlay */}
      {showTitle && media.title && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 inline-block max-w-full">
            <div className="flex items-center gap-2">
              <div
                className={`px-2 py-1 rounded text-[10px] font-bold ${
                  type === "sermon"
                    ? "bg-blue-600/80"
                    : type === "lesson"
                    ? "bg-green-600/80"
                    : "bg-purple-600/80"
                } text-white`}
              >
                {type === "sermon"
                  ? "SERMON"
                  : type === "lesson"
                  ? "LESSON"
                  : "VIDEO"}
              </div>
              <h3 className="text-white text-xs font-medium truncate">
                {media.title}
              </h3>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer2;
