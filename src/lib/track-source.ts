import { existsSync } from "node:fs";
import { join } from "node:path";
import { track, type TrackSource } from "@/data/music";

/**
 * Server-only, evaluated at build time: prefer the local audio file when it has
 * been added to /public, otherwise fall back to the official YouTube video.
 */
export function resolveTrackSource(): TrackSource {
  const localPath = join(process.cwd(), "public", ...track.localSrc.split("/").filter(Boolean));
  return existsSync(localPath)
    ? { kind: "file", src: track.localSrc }
    : { kind: "youtube", videoId: track.youtubeId };
}
