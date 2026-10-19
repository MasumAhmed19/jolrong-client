import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getYouTubeEmbedUrl, loadYouTubeApi, type YTPlayer } from "@/lib/youtube";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface HeroBackgroundVideoProps {
  videoId: string;
  title: string;
}

/**
 * Muted, looping, control-free YouTube video that covers its parent.
 * It stays invisible until it is actually playing, so the parent's featured
 * image remains the fallback when the video is unavailable, blocked,
 * still loading, or fails to autoplay.
 */
export const HeroBackgroundVideo = ({ videoId, title }: HeroBackgroundVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [reducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    let player: YTPlayer | null = null;
    let isReady = false;
    let isVisible = true;
    let cancelled = false;

    // The API replaces this node with an iframe; keep it outside React's tree.
    const mountNode = document.createElement("div");
    container.appendChild(mountNode);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(mountNode, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }) => {
              isReady = true;
              target.mute();
              if (isVisible) target.playVideo();
            },
            onStateChange: ({ target, data }) => {
              if (data === YT.PlayerState.PLAYING) setIsPlaying(true);
              // Loop manually so YouTube's end screen never appears.
              if (data === YT.PlayerState.ENDED) {
                target.seekTo(0, true);
                target.playVideo();
              }
            },
            // Unavailable, private, removed, or embedding disabled.
            onError: () => setHasFailed(true),
          },
        });
      })
      .catch(() => {
        if (!cancelled) setHasFailed(true);
      });

    // Pause while the hero is scrolled out of view to save CPU/bandwidth.
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!player || !isReady) return;
      if (isVisible) player.playVideo();
      else player.pauseVideo();
    });
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      player?.destroy();
      mountNode.remove();
    };
  }, [videoId, reducedMotion]);

  if (reducedMotion || hasFailed) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ containerType: "size" }}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        title={`${title} video`}
        className={cn(
          "absolute top-1/2 left-1/2 transition-opacity duration-1000 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0",
          isPlaying ? "opacity-100" : "opacity-0"
        )}
        style={{
          // Cover the hero at 16:9; the scale crops YouTube's title/logo overlays.
          width: "max(100cqw, 177.78cqh)",
          height: "max(100cqh, 56.25cqw)",
          transform: "translate(-50%, -50%) scale(1.2)",
        }}
      />
    </div>
  );
};

interface VideoPreviewProps {
  videoId: string;
  image?: string;
  title: string;
  className?: string;
}

/**
 * Poster image with a play button that opens the YouTube player in a popup.
 * The player is only mounted while the popup is open, so it costs nothing
 * on page load and stops playing as soon as the popup closes.
 */
export const VideoPreview = ({ videoId, image, title, className }: VideoPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn("relative overflow-hidden bg-center bg-no-repeat bg-cover", className)}
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      >
        <DialogPrimitive.Trigger asChild>
          <button
            type="button"
            className="group absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
            aria-label={`Play ${title} video`}
          >
            <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 text-primary shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="w-7 h-7 md:w-8 md:h-8 ml-1 fill-current" />
            </span>
          </button>
        </DialogPrimitive.Trigger>
      </div>

      <DialogPortal>
        {/* Above the sticky site header (z-[100]). */}
        <DialogOverlay className="z-[1100] bg-black/85" />
        <DialogPrimitive.Content
          className="fixed top-1/2 left-1/2 z-[1100] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">{title} video</DialogPrimitive.Title>

          <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black shadow-2xl">
            <iframe
              src={getYouTubeEmbedUrl(videoId, { autoplay: 1 })}
              title={`${title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          <DialogPrimitive.Close
            className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
