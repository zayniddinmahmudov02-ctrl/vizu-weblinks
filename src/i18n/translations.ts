import type { LinkId } from "@/data/links";
import type { Locale } from "./config";

export interface Dictionary {
  header: { hubLabel: string; languageLabel: string };
  skipToLinks: string;
  tagline: string;
  profile: {
    eyebrow: string;
    meta: string;
    intro: string;
    highlightsLabel: string;
    highlights: readonly string[];
  };
  links: {
    heading: string;
    count: (n: number) => string;
    opensInNewTab: string;
    items: Record<LinkId, { title: string; description: string }>;
  };
  teacher: {
    eyebrow: string;
    bio: string;
    focusLabel: string;
    focus: readonly string[];
    cta: string;
  };
  levels: { label: string };
  music: {
    nowPlaying: string;
    open: (track: string) => string;
    close: string;
    play: string;
    pause: string;
    volume: string;
    mute: string;
    unmute: string;
    loading: string;
    error: string;
    tapToStart: string;
    openExternally: string;
    youtubeNote: string;
  };
  footer: { socialLabel: string; websiteLabel: string };
}

const uz: Dictionary = {
  header: { hubLabel: "Rasmiy havolalar", languageLabel: "Tilni tanlash" },
  skipToLinks: "Havolalarga o‘tish",
  tagline: "Nemis tilini o‘rganing. Yangi imkoniyatlar yarating.",
  profile: {
    eyebrow: "Ta’lim platformasi",
    meta: "Nemis tili · Online",
    intro: "Zamonaviy, raqamli ta’lim tizimi bilan nemis tilini o‘rganing.",
    highlightsLabel: "Imkoniyatlar",
    highlights: ["Online kurslar", "Video darslar", "Hamjamiyat"],
  },
  links: {
    heading: "Rasmiy kanallar",
    count: (n) => `${String(n).padStart(2, "0")} ta havola`,
    opensInNewTab: "(yangi oynada ochiladi)",
    items: {
      website: { title: "VIZU DEUTSCH", description: "Rasmiy ta’lim platformamiz" },
      telegram: { title: "Telegram", description: "Yangiliklar, kurslar va nemis tili" },
      youtube: { title: "YouTube", description: "VIZU DEUTSCH bilan nemis tilini o‘rganing" },
      instagram: { title: "Instagram", description: "VIZU DEUTSCH — Instagram sahifamiz" },
      bot: { title: "VIZU Academy Bot", description: "Raqamli kurslar va ta’lim imkoniyatlari" },
    },
  },
  teacher: {
    eyebrow: "Ustoz haqida",
    bio: "Nemis tili va germanistika yo‘nalishida zamonaviy, raqamli ta’lim metodlari bilan ishlovchi ustoz.",
    focusLabel: "Yo‘nalishlar",
    focus: ["Nemis tili", "Germanistika", "Zamonaviy ta’lim"],
    cta: "Profilni ko‘rish",
  },
  levels: { label: "Til darajalari A1 dan C1 gacha" },
  music: {
    nowPlaying: "Musiqa",
    open: (track) => `Musiqa pleyerini ochish: ${track}`,
    close: "Pleyerni yopish",
    play: "Ijro etish",
    pause: "Pauza",
    volume: "Ovoz balandligi",
    mute: "Ovozni o‘chirish",
    unmute: "Ovozni yoqish",
    loading: "Yuklanmoqda…",
    error: "Musiqani yuklab bo‘lmadi.",
    tapToStart: "Brauzer bloklagan bo‘lsa, videoning o‘zini bosing.",
    openExternally: "YouTube’da ochish",
    youtubeNote: "Rasmiy video · YouTube",
  },
  footer: { socialLabel: "Ijtimoiy tarmoqlar", websiteLabel: "Veb-sayt" },
};

const de: Dictionary = {
  header: { hubLabel: "Offizieller Link Hub", languageLabel: "Sprache wählen" },
  skipToLinks: "Zu den Links springen",
  tagline: "Deutsch lernen. Neue Perspektiven schaffen.",
  profile: {
    eyebrow: "Sprachplattform",
    meta: "Deutsch · Online",
    intro: "Deutsch lernen mit einem modernen, digitalen Bildungssystem.",
    highlightsLabel: "Angebote",
    highlights: ["Online-Kurse", "Video-Lektionen", "Community"],
  },
  links: {
    heading: "Offizielle Kanäle",
    count: (n) => `${String(n).padStart(2, "0")} Links`,
    opensInNewTab: "(öffnet in neuem Tab)",
    items: {
      website: { title: "VIZU DEUTSCH", description: "Unsere offizielle Lernplattform" },
      telegram: { title: "Telegram", description: "Deutsch lernen, Neuigkeiten & Kurse" },
      youtube: { title: "YouTube", description: "Deutsch lernen mit VIZU DEUTSCH" },
      instagram: { title: "Instagram", description: "VIZU DEUTSCH — unsere Instagram-Seite" },
      bot: { title: "VIZU Academy Bot", description: "Digitale Lernangebote & Kurse" },
    },
  },
  teacher: {
    eyebrow: "Über den Dozenten",
    bio: "Dozent für Deutsch und Germanistik. Verbindet fundierte Sprachvermittlung mit modernen, digitalen Lernmethoden.",
    focusLabel: "Schwerpunkte",
    focus: ["Deutsch", "Germanistik", "Moderne Bildung"],
    cta: "Profil ansehen",
  },
  levels: { label: "Sprachniveaus von A1 bis C1" },
  music: {
    nowPlaying: "Musik",
    open: (track) => `Musikplayer öffnen: ${track}`,
    close: "Player schließen",
    play: "Abspielen",
    pause: "Pausieren",
    volume: "Lautstärke",
    mute: "Stummschalten",
    unmute: "Ton einschalten",
    loading: "Wird geladen…",
    error: "Musik konnte nicht geladen werden.",
    tapToStart: "Falls der Browser blockiert, tippe direkt auf das Video.",
    openExternally: "Auf YouTube öffnen",
    youtubeNote: "Offizielles Video · YouTube",
  },
  footer: { socialLabel: "Soziale Kanäle", websiteLabel: "Website" },
};

const en: Dictionary = {
  header: { hubLabel: "Official link hub", languageLabel: "Choose language" },
  skipToLinks: "Skip to links",
  tagline: "Learn German. Create new perspectives.",
  profile: {
    eyebrow: "Learning platform",
    meta: "German · Online",
    intro: "Learn German with a modern, digital education system.",
    highlightsLabel: "Offerings",
    highlights: ["Online courses", "Video lessons", "Community"],
  },
  links: {
    heading: "Official channels",
    count: (n) => `${String(n).padStart(2, "0")} links`,
    opensInNewTab: "(opens in a new tab)",
    items: {
      website: { title: "VIZU DEUTSCH", description: "Our official learning platform" },
      telegram: { title: "Telegram", description: "News, courses & German" },
      youtube: { title: "YouTube", description: "Learn German with VIZU DEUTSCH" },
      instagram: { title: "Instagram", description: "VIZU DEUTSCH — our Instagram page" },
      bot: { title: "VIZU Academy Bot", description: "Digital courses & learning offers" },
    },
  },
  teacher: {
    eyebrow: "About the Teacher",
    bio: "German language and German studies educator focused on modern and digital learning methods.",
    focusLabel: "Focus areas",
    focus: ["German", "German Studies", "Modern Education"],
    cta: "View profile",
  },
  levels: { label: "Language levels from A1 to C1" },
  music: {
    nowPlaying: "Music",
    open: (track) => `Open music player: ${track}`,
    close: "Close player",
    play: "Play",
    pause: "Pause",
    volume: "Volume",
    mute: "Mute",
    unmute: "Unmute",
    loading: "Loading…",
    error: "The music could not be loaded.",
    tapToStart: "If your browser blocks playback, tap the video itself.",
    openExternally: "Open on YouTube",
    youtubeNote: "Official video · YouTube",
  },
  footer: { socialLabel: "Social channels", websiteLabel: "Website" },
};

export const translations: Record<Locale, Dictionary> = { uz, de, en };
