"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { loadYouTubeApi, YT_STATE, type YTPlayer } from "@/lib/youtube";

export type PlaybackStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "error";

/** One interface for both sources, so the UI doesn't care where the sound comes from. */
export interface Playback {
  status: PlaybackStatus;
  /** True when the browser refused a programmatic play (autoplay policy). */
  blocked: boolean;
  play(): void;
  pause(): void;
  /** 0–100 */
  setVolume(volume: number): void;
}

const BLOCKED_AFTER_MS = 1800;

/**
 * Local audio file via HTMLAudioElement. Nothing is fetched until `enabled`
 * (the player was opened at least once); everything is released on unmount.
 */
export function useFilePlayback(src: string | null, enabled: boolean, initialVolume: number): Playback {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(initialVolume);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!enabled || !src) return;
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = volumeRef.current / 100;

    const handlers: Array<[keyof HTMLMediaElementEventMap, () => void]> = [
      ["loadstart", () => setStatus("loading")],
      ["waiting", () => setStatus("loading")],
      ["canplay", () => setStatus((s) => (s === "playing" ? s : audio.paused ? "ready" : "playing"))],
      ["playing", () => setStatus("playing")],
      ["pause", () => setStatus("paused")],
      ["ended", () => setStatus("paused")],
      ["error", () => setStatus("error")],
    ];
    handlers.forEach(([type, fn]) => audio.addEventListener(type, fn));
    audio.src = src;
    audioRef.current = audio;

    return () => {
      handlers.forEach(([type, fn]) => audio.removeEventListener(type, fn));
      audio.pause();
      audio.removeAttribute("src");
      audio.load(); // drops the network connection and decoded buffers
      audioRef.current = null;
    };
  }, [enabled, src]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setBlocked(false);
    audio.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "NotAllowedError") setBlocked(true);
      else setStatus("error");
    });
  }, []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const setVolume = useCallback((volume: number) => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, []);

  return {
    status: enabled && src && status === "idle" ? "loading" : status,
    blocked,
    play,
    pause,
    setVolume,
  };
}

/**
 * Official YouTube video via the IFrame Player API, rendered into `hostRef`.
 * The API script and iframe load only once `enabled`; the player is destroyed on unmount.
 */
export function useYouTubePlayback(
  videoId: string | null,
  enabled: boolean,
  hostRef: RefObject<HTMLDivElement | null>,
  initialVolume: number,
): Playback {
  const playerRef = useRef<YTPlayer | null>(null);
  const volumeRef = useRef(initialVolume);
  const blockTimer = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!enabled || !videoId || !host) return;

    let cancelled = false;
    let player: YTPlayer | undefined;
    // The API replaces this node with an <iframe>, so React must not own it.
    const mount = document.createElement("div");
    host.appendChild(mount);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          videoId,
          width: "100%",
          height: "100%",
          playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
          events: {
            onReady: () => {
              if (cancelled || !player) return;
              player.setVolume(volumeRef.current);
              playerRef.current = player;
              setStatus("ready");
            },
            onStateChange: ({ data }) => {
              if (data === YT_STATE.PLAYING || data === YT_STATE.BUFFERING) {
                window.clearTimeout(blockTimer.current);
                setBlocked(false);
              }
              if (data === YT_STATE.PLAYING) setStatus("playing");
              else if (data === YT_STATE.BUFFERING) setStatus("loading");
              else if (data === YT_STATE.PAUSED || data === YT_STATE.ENDED) setStatus("paused");
              else setStatus("ready");
            },
            onError: () => setStatus("error"),
          },
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(blockTimer.current);
      player?.destroy();
      playerRef.current = null;
      mount.remove();
    };
  }, [enabled, videoId, hostRef]);

  const play = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    setBlocked(false);
    player.playVideo();
    // Mobile browsers may ignore playVideo() from outside the iframe; detect and hint.
    window.clearTimeout(blockTimer.current);
    blockTimer.current = window.setTimeout(() => {
      const state = playerRef.current?.getPlayerState();
      if (state !== YT_STATE.PLAYING && state !== YT_STATE.BUFFERING) setBlocked(true);
    }, BLOCKED_AFTER_MS);
  }, []);

  const pause = useCallback(() => {
    window.clearTimeout(blockTimer.current);
    playerRef.current?.pauseVideo();
  }, []);

  const setVolume = useCallback((volume: number) => {
    volumeRef.current = volume;
    playerRef.current?.setVolume(volume);
  }, []);

  return {
    status: enabled && videoId && status === "idle" ? "loading" : status,
    blocked,
    play,
    pause,
    setVolume,
  };
}
