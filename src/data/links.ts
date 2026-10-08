import type { ComponentType } from "react";
import { Bot, Globe, GraduationCap } from "lucide-react";
import { TelegramIcon, YouTubeIcon } from "@/components/icons/BrandIcons";

export type IconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  strokeWidth?: number;
}>;

export type LinkId = "website" | "telegram" | "youtube" | "bot" | "teacher";

export interface HubLink {
  id: LinkId;
  title: string;
  description: string;
  url: string;
  icon: IconComponent;
  external: boolean;
  /** Rendered as the primary (dark) card. */
  featured?: boolean;
  /** BCP 47 tag when the title is not German, e.g. "uz". */
  lang?: string;
}

export const links: readonly HubLink[] = [
  {
    id: "website",
    title: "VIZU DEUTSCH — Web Platform",
    description: "Unsere offizielle Lernplattform",
    url: "https://www.vizu-deutsch.com/",
    icon: Globe,
    external: true,
    featured: true,
  },
  {
    id: "telegram",
    title: "Telegram",
    description: "Neuigkeiten, Kurse & Deutsch",
    url: "https://t.me/vizu_deutsch",
    icon: TelegramIcon,
    external: true,
  },
  {
    id: "youtube",
    title: "YouTube",
    description: "Deutsch lernen mit VIZU DEUTSCH",
    url: "http://www.youtube.com/@vizu_deutsch",
    icon: YouTubeIcon,
    external: true,
  },
  {
    id: "bot",
    title: "VIZU Academy Bot",
    description: "Kurse & digitale Lernangebote",
    url: "https://t.me/vizu_academy_bot",
    icon: Bot,
    external: true,
  },
  {
    id: "teacher",
    title: "Ustoz haqida",
    description: "Zayniddinkhuja Makhmudov — CV & Profil",
    url: "https://zayniddinkhuja-makhmudov-cv.vercel.app/",
    icon: GraduationCap,
    external: true,
    lang: "uz",
  },
];

export function getLink(id: LinkId): HubLink {
  const link = links.find((item) => item.id === id);
  if (!link) throw new Error(`Unknown link id: ${id}`);
  return link;
}

export const footerLinks: readonly HubLink[] = (
  ["telegram", "youtube", "website"] as const
).map(getLink);
