const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extracts the video id from common YouTube link formats:
 * watch?v=, youtu.be/, /embed/, /shorts/, /live/ — or a bare 11-char id.
 */
export const getYouTubeId = (url?: string | null): string | null => {
  const value = url?.trim();
  if (!value) return null;
  if (YOUTUBE_ID_PATTERN.test(value)) return value;

  try {
    const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
    let id: string | null = null;

    if (host === "youtu.be") {
      id = parsed.pathname.split("/")[1];
    } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      id = parsed.searchParams.get("v");
      if (!id) {
        const [, section, pathId] = parsed.pathname.split("/");
        if (["embed", "shorts", "live", "v"].includes(section)) id = pathId;
      }
    }

    return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
};

/* ---------- Minimal YouTube IFrame Player API typings ---------- */

export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTPlayerOptions {
  videoId: string;
  host?: string;
  width?: string | number;
  height?: string | number;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
    onError?: (event: YTPlayerEvent) => void;
  };
}

interface YTNamespace {
  Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

/** Loads the YouTube IFrame API once, on demand. */
export const loadYouTubeApi = (): Promise<YTNamespace> => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      if (window.YT) resolve(window.YT);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      script.remove();
      reject(new Error("Failed to load the YouTube player"));
    };
    document.head.appendChild(script);
  });

  return apiPromise;
};

export const getYouTubeEmbedUrl = (
  id: string,
  params: Record<string, string | number> = {}
) => {
  const query = new URLSearchParams(
    Object.entries({ rel: 0, modestbranding: 1, playsinline: 1, ...params }).map(
      ([key, val]) => [key, String(val)]
    )
  );
  return `https://www.youtube-nocookie.com/embed/${id}?${query.toString()}`;
};
