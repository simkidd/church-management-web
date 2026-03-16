"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  video?: {
    url: string;
    type?: string;
  };
  audioUrl?: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  duration?: number;
  createdAt?: string;
}

interface VideoPlayerProps {
  media: MediaItem;
  type?: "video" | "audio";
  showTitle?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  onProgress?: (progress: {
    watchTimeSeconds: number;
    lastPositionSeconds: number;
  }) => void;
  onComplete?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
}

// Custom Slider Component
interface CustomSliderProps {
  value: number;
  max?: number;
  onChange: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  showThumb?: boolean;
  height?: "thin" | "normal" | "thick";
}

const CustomSlider = ({
  value,
  max = 100,
  onChange,
  onChangeEnd,
  className,
  trackClassName,
  fillClassName,
  showThumb = true,
  height = "normal",
}: CustomSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const heightClasses = {
    thin: "h-1",
    normal: "h-1.5",
    thick: "h-2",
  };

  const thumbSizes = {
    thin: "w-3 h-3",
    normal: "w-3.5 h-3.5",
    thick: "w-4 h-4",
  };

  const getPercentageFromEvent = (
    e: React.MouseEvent | MouseEvent | TouchEvent,
  ) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const percentage = getPercentageFromEvent(
      e.nativeEvent as MouseEvent | TouchEvent,
    );
    onChange((percentage / 100) * max);
  };

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const percentage = getPercentageFromEvent(e);
      onChange((percentage / 100) * max);
    },
    [isDragging, max, onChange],
  );

  const handleEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onChangeEnd?.(value);
    }
  }, [isDragging, value, onChangeEnd]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
      document.body.style.userSelect = "none";
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMove, handleEnd]);

  const displayValue = (value / max) * 100;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full cursor-pointer touch-none", className)}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* Track */}
      <div
        className={cn(
          "w-full bg-white/30 rounded-full transition-all",
          heightClasses[height],
          "group-hover:h-2",
          trackClassName,
        )}
      >
        {/* Fill */}
        <div
          className={cn(
            "h-full rounded-full relative transition-all duration-75",
            fillClassName,
          )}
          style={{ width: `${displayValue}%` }}
        >
          {/* Thumb - centered on the end of fill */}
          {showThumb && (
            <div
              className={cn(
                "absolute rounded-full bg-white shadow-lg transition-all duration-150",
                thumbSizes[height],
                isDragging ? "scale-125" : "scale-0 group-hover:scale-100",
              )}
              style={{
                top: "50%",
                right: 0,
                transform: "translate(50%, -50%)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({
  media,
  type = "video",
  showTitle = true,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  onProgress,
  onComplete,
  onTimeUpdate,
  className,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(media.duration || 0);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const watchTimeRef = useRef(0);
  const lastReportedRef = useRef(0);
  const wasPlayingRef = useRef(false);
  const lastTapRef = useRef(0);

  const mediaUrl = type === "video" ? media.video?.url : media.audioUrl;
  const isAudioOnly = type === "audio";

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      videoRef.current.loop = loop;
      if (autoplay) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [muted, loop, autoplay]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPlaying]);

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleVideoClick = useCallback(() => {
    const now = Date.now();
    const tapGap = now - lastTapRef.current;

    if (tapGap < 300 && tapGap > 0) {
      // Double tap - seek forward
      skip(10);
    } else {
      // Single tap - toggle play
      togglePlay();
    }
    lastTapRef.current = now;
  }, [togglePlay]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || media.duration || 0;

      setCurrentTime(current);
      setProgress(total > 0 ? (current / total) * 100 : 0);
      onTimeUpdate?.(current);

      if (isPlaying && !isBuffering) {
        watchTimeRef.current += 0.25;

        if (watchTimeRef.current - lastReportedRef.current >= 10) {
          onProgress?.({
            watchTimeSeconds: Math.floor(watchTimeRef.current),
            lastPositionSeconds: Math.floor(current),
          });
          lastReportedRef.current = watchTimeRef.current;
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      const total = videoRef.current.duration || media.duration || 1;
      const time = (value / 100) * total;
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      setProgress(value);
    }
  };

  const handleSeekEnd = (value: number) => {
    if (videoRef.current) {
      const total = videoRef.current.duration || media.duration || 1;
      const time = (value / 100) * total;
      videoRef.current.currentTime = time;
      if (wasPlayingRef.current) {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (value: number) => {
    const newVolume = value / 100;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      setIsMuted(newVolume === 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onProgress?.({
      watchTimeSeconds: Math.floor(watchTimeRef.current),
      lastPositionSeconds: Math.floor(currentTime),
    });
    onComplete?.();
  };

  const handleMouseMove = () => {
    if (!controls) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current || isAudioOnly) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!controls) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowleft":
        case "j":
          e.preventDefault();
          skip(-10);
          break;
        case "arrowright":
        case "l":
          e.preventDefault();
          skip(10);
          break;
        case "arrowup":
          e.preventDefault();
          handleVolumeChange(Math.min(100, volume * 100 + 5));
          break;
        case "arrowdown":
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume * 100 - 5));
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          if (!isAudioOnly) toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [volume, isPlaying, controls, isAudioOnly, togglePlay]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (watchTimeRef.current > 0) {
        onProgress?.({
          watchTimeSeconds: Math.floor(watchTimeRef.current),
          lastPositionSeconds: Math.floor(currentTime),
        });
      }
    };
  }, [currentTime, onProgress]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!mediaUrl) {
    return (
      <div
        className={cn(
          "aspect-video bg-slate-900 flex items-center justify-center text-white rounded-lg",
          className,
        )}
      >
        <div className="text-center">
          <p className="text-lg font-medium">Media not available</p>
          <p className="text-sm text-slate-400">This {type} has no content</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-black group rounded-lg overflow-hidden select-none",
        isAudioOnly ? "h-24" : "aspect-video",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={mediaUrl}
        className={cn("w-full h-full cursor-pointer", isAudioOnly && "hidden")}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        poster={media.thumbnail?.url}
        muted={muted}
        loop={loop}
        playsInline
      />

      {/* Audio-only thumbnail */}
      {isAudioOnly && media.thumbnail?.url && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <Image
            src={media.thumbnail.url}
            alt={media.thumbnail.alt || media.title}
            className="w-full h-full object-cover opacity-50"
            fill
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                {isPlaying ? (
                  <Pause size={32} />
                ) : (
                  <Play size={32} className="ml-1" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Title overlay */}
      {showTitle && (
        <div
          className={cn(
            "absolute top-0 left-0 right-0 p-4 bg-linear-to-b from-black/80 to-transparent transition-opacity duration-300 z-10 pointer-events-none",
            showControls ? "opacity-100" : "opacity-0",
          )}
        >
          <h3 className="text-white font-semibold truncate">{media.title}</h3>
          {media.description && (
            <p className="text-white/70 text-sm truncate mt-1">
              {media.description}
            </p>
          )}
        </div>
      )}

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-10">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* Center Play Button (when paused) - Clickable */}
      {!isPlaying && !isBuffering && controls && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-30"
          onClick={handleVideoClick}
        >
          <div className="size-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 active:scale-95">
            <Play size={34} className="text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Click overlay for playing state */}
      {isPlaying && controls && (
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={handleVideoClick}
        />
      )}

      {/* Controls Overlay */}
      {controls && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end z-40 pointer-events-auto",
            showControls ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {/* Progress Bar */}
          <div className="px-4 pb-2 pt-6 group/progress">
            <CustomSlider
              value={progress}
              max={100}
              onChange={(val) => {
                wasPlayingRef.current = isPlaying;
                if (videoRef.current && isPlaying) {
                  videoRef.current.pause();
                }
                handleSeek(val);
              }}
              onChangeEnd={handleSeekEnd}
              fillClassName="bg-primary"
              trackClassName="bg-white/30"
              height="thick"
            />
          </div>

          {/* Control Buttons */}
          <div className="px-4 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors active:scale-95 hidden sm:inline-flex cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  skip(-10);
                }}
                title="Rewind 10s"
              >
                <SkipBack size={18} />
              </button>

              <button
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors active:scale-95 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors active:scale-95 hidden sm:inline-flex cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  skip(10);
                }}
                title="Forward 10s"
              >
                <SkipForward size={18} />
              </button>

              {/* Volume - Desktop: hover expand, Mobile: tap to toggle */}
              <div
                className={cn(
                  "flex items-center gap-2 ml-2",
                  !isMobile && "group/volume",
                )}
                onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
                onMouseLeave={() => !isMobile && setShowVolumeSlider(false)}
              >
                <button
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors active:scale-95 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    isMobile
                      ? setShowVolumeSlider(!showVolumeSlider)
                      : toggleMute();
                  }}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={18} />
                  ) : (
                    <Volume2 size={18} />
                  )}
                </button>

                {/* Volume Slider */}
                <div
                  className={cn(
                    "transition-all duration-200 ease-out",
                    "w-24 ",
                  )}
                >
                  <CustomSlider
                    value={isMuted ? 0 : volume * 100}
                    max={100}
                    onChange={handleVolumeChange}
                    fillClassName="bg-primary"
                    trackClassName="bg-white/30"
                    height="thin"
                    showThumb={true}
                  />
                </div>
              </div>

              <span className="text-white text-sm font-medium ml-2 select-none ">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {!isAudioOnly && (
                <button
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                >
                  <Maximize size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
