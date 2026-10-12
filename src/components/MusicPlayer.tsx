"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ExternalLink, LoaderCircle, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useFilePlayback, useYouTubePlayback } from "@/components/music/usePlayback";
import { Vinyl } from "@/components/music/Vinyl";
import { track, type TrackSource } from "@/data/music";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

const DEFAULT_VOLUME = 70;
const INTERACTIVE = "a, button, input, select, textarea, [role='button']";

/**
 * True while the record's resting spot sits on top of another control (e.g. a link
 * card scrolled under it on a phone). The record then tucks into the screen edge.
 */
function useCoversControls(anchorRef: RefObject<HTMLElement | null>, rootRef: RefObject<HTMLElement | null>) {
  const [covers, setCovers] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const anchor = anchorRef.current;
      const root = rootRef.current;
      if (!anchor || !root) return;
      const r = anchor.getBoundingClientRect();
      const points: Array<[number, number]> = [
        [r.left + 2, r.top + 2],
        [r.left + 2, r.top + r.height / 2],
        [r.left + 2, r.bottom - 2],
        [r.left + r.width / 2, r.top + 2],
        [r.left + r.width / 2, r.top + r.height / 2],
      ];
      const hit = points.some(([x, y]) =>
        document.elementsFromPoint(x, y).some((el) => !root.contains(el) && el.closest(INTERACTIVE)),
      );
      setCovers(hit);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Entrance animations shift content after load; re-check once they settle.
    const settle = window.setTimeout(schedule, 2000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [anchorRef, rootRef]);

  return covers;
}

export function MusicPlayer({ source }: { source: TrackSource }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  /** Resources (audio file / YouTube API) load on first open, never on page load. */
  const [activated, setActivated] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const youtubeHost = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const coversControls = useCoversControls(anchorRef, rootRef);
  const tucked = coversControls && !open;

  const isYouTube = source.kind === "youtube";
  const fileSrc = source.kind === "file" ? source.src : null;
  const videoId = source.kind === "youtube" ? source.videoId : null;
  const file = useFilePlayback(fileSrc, activated, DEFAULT_VOLUME);
  const youtube = useYouTubePlayback(videoId, activated, youtubeHost, DEFAULT_VOLUME);
  const playback = isYouTube ? youtube : file;

  const { status } = playback;
  const playing = status === "playing";
  const canControl = status === "ready" || status === "playing" || status === "paused";
  const trackLabel = `${track.artist} — ${track.title}`;
  const externalUrl = `https://www.youtube.com/watch?v=${track.youtubeId}`;

  function openPlayer() {
    setActivated(true);
    setOpen(true);
    requestAnimationFrame(() => playRef.current?.focus());
  }

  function closePlayer() {
    setOpen(false);
    // YouTube must stay visible while it plays, so collapsing pauses it.
    if (isYouTube) playback.pause();
    toggleRef.current?.focus();
  }

  function togglePlay() {
    if (playing) playback.pause();
    else playback.play();
  }

  function changeVolume(next: number) {
    setVolume(next);
    setMuted(next === 0);
    playback.setVolume(next);
  }

  function toggleMute() {
    const nextMuted = !muted;
    setMuted(nextMuted);
    playback.setVolume(nextMuted ? 0 : volume || DEFAULT_VOLUME);
    if (!nextMuted && volume === 0) setVolume(DEFAULT_VOLUME);
  }

  function onPanelKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") closePlayer();
  }

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: EASE_OUT }}
      className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end sm:right-6 sm:bottom-6"
    >
      {activated && (
        <motion.section
          role="dialog"
          aria-label={trackLabel}
          aria-hidden={!open}
          inert={!open}
          onKeyDown={onPanelKeyDown}
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={{
            open: { opacity: 1, scale: 1, y: 0, visibility: "visible" },
            closed: { opacity: 0, scale: 0.6, y: 16, transitionEnd: { visibility: "hidden" } },
          }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          style={{ originX: 1, originY: 1 }}
          className="mb-3 w-[min(20rem,calc(100vw-1.5rem))] rounded-3xl border border-white bg-[linear-gradient(180deg,rgb(255_255_255/0.97),rgb(241_242_244/0.95))] p-4 shadow-[inset_0_1px_0_#fff,0_24px_60px_-20px_rgb(11_21_48/0.45)] backdrop-blur-xl"
        >
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              {/* Opening flourish: the record turns once as the panel unfolds */}
              <motion.div
                animate={{ rotate: open && !reduceMotion ? 360 : 0 }}
                transition={{ duration: open ? 0.9 : 0, ease: EASE_OUT }}
              >
                <Vinyl spinning={playing} className="size-[88px] shadow-[0_14px_28px_-14px_rgb(11_21_48/0.8)]">
                  <span className="size-1.5 rounded-full bg-silver-100" />
                </Vinyl>
              </motion.div>
              {/* Tonearm swings onto the record while playing */}
              <svg
                aria-hidden="true"
                viewBox="0 0 40 60"
                className={cn(
                  "absolute -top-1 -right-3 h-14 w-9 origin-[30px_8px] text-silver-500 transition-transform duration-700 ease-out",
                  playing ? "rotate-[18deg]" : "rotate-0",
                )}
              >
                <circle cx="30" cy="8" r="5" fill="currentColor" />
                <path d="M30 8 26 44l-8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="13" y="49" width="9" height="6" rx="1.5" transform="rotate(-40 17 52)" fill="var(--color-navy-800)" />
              </svg>
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-accent-blue uppercase">
                  {t.music.nowPlaying}
                </p>
                <button
                  type="button"
                  onClick={closePlayer}
                  aria-label={t.music.close}
                  className="-mt-1.5 -mr-1.5 grid size-8 place-items-center rounded-full text-navy-800/60 outline-none transition-colors hover:bg-navy-900/5 hover:text-navy-900 focus-visible:ring-2 focus-visible:ring-navy-900"
                >
                  <X aria-hidden className="size-4" />
                </button>
              </div>
              <p className="truncate text-base leading-tight font-bold tracking-tight text-navy-900">{track.title}</p>
              <p className="truncate text-sm text-slate-ink">{track.artist}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              ref={playRef}
              type="button"
              onClick={togglePlay}
              disabled={!canControl}
              aria-label={playing ? t.music.pause : t.music.play}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 text-white shadow-[0_10px_20px_-10px_rgb(11_21_48/0.8)] outline-none transition-[background-color,transform,opacity] duration-200 hover:bg-accent-blue focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? (
                <LoaderCircle aria-hidden className="size-5 animate-spin" />
              ) : playing ? (
                <Pause aria-hidden className="size-5" fill="currentColor" />
              ) : (
                <Play aria-hidden className="ml-0.5 size-5" fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? t.music.unmute : t.music.mute}
              className="grid size-9 shrink-0 place-items-center rounded-full text-navy-800 outline-none hover:bg-navy-900/5 focus-visible:ring-2 focus-visible:ring-navy-900"
            >
              {muted ? <VolumeX aria-hidden className="size-[18px]" /> : <Volume2 aria-hidden className="size-[18px]" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={muted ? 0 : volume}
              onChange={(event) => changeVolume(Number(event.target.value))}
              aria-label={t.music.volume}
              className="h-1.5 min-w-0 flex-1 cursor-pointer accent-accent-blue"
            />
          </div>

          {isYouTube && (
            <div className={cn("mt-4", status === "error" && "hidden")}>
              {/* YouTube's terms require a visible player of at least 200×200 px. */}
              <div ref={youtubeHost} className="h-[200px] min-w-[200px] overflow-hidden rounded-2xl bg-navy-950 [&>iframe]:size-full" />
              <p className="mt-2 text-[11px] text-navy-800/60">{t.music.youtubeNote}</p>
            </div>
          )}

          <div aria-live="polite" className="text-xs">
            {status === "loading" && <p className="mt-3 text-navy-800/70">{t.music.loading}</p>}
            {playback.blocked && <p className="mt-3 text-navy-800/80">{t.music.tapToStart}</p>}
            {status === "error" && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-de-red/8 p-2.5 text-navy-900">
                <AlertCircle aria-hidden className="mt-px size-4 shrink-0 text-de-red" />
                <p>
                  {t.music.error}{" "}
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                  >
                    {t.music.openExternally}
                    <ExternalLink aria-hidden className="size-3" />
                  </a>
                </p>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* The anchor marks the record's resting spot; only the button inside slides. */}
      <span ref={anchorRef} className="block">
        <motion.button
          ref={toggleRef}
          type="button"
          onClick={open ? closePlayer : openPlayer}
          aria-expanded={open}
          aria-label={open ? t.music.close : t.music.open(trackLabel)}
          animate={{ x: tucked ? "88%" : "0%", opacity: tucked ? 0.9 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="rounded-full p-[3px] outline-none bg-[conic-gradient(from_210deg,#ffffff,#c3c8d0,#f4f5f7,#a9b0bb,#ffffff)] shadow-[0_14px_30px_-12px_rgb(11_21_48/0.7)] focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
        >
          <Vinyl spinning={playing} className="size-[46px] sm:size-[54px]">
            {playing ? (
              <Pause aria-hidden className="size-3.5" fill="currentColor" />
            ) : (
              <Play aria-hidden className="ml-px size-3.5" fill="currentColor" />
            )}
          </Vinyl>
        </motion.button>
      </span>
    </motion.div>
  );
}
