export const track = {
  title: "Hell N Back",
  artist: "Bakar",
  /** Local audio (AAC in MP4). Used instead of YouTube whenever this file exists in /public. */
  localSrc: "/music/hell-n-back.m4a",
  /** "Bakar - Hell N Back (Official Video)" on the official BakarVEVO channel. */
  youtubeId: "BdrNvQ4YCng",
} as const;

export type TrackSource =
  | { kind: "file"; src: string }
  | { kind: "youtube"; videoId: string };
