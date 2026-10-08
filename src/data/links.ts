import type { ComponentType } from "react";
import { Bot, Globe } from "lucide-react";
import { TelegramIcon, YouTubeIcon } from "@/components/icons/BrandIcons";

export type IconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  strokeWidth?: number;
}>;

export type LinkId = "website" | "telegram" | "youtube" | "bot";

/** Titles and descriptions are localized in src/i18n/translations.ts, keyed by `id`. */
export interface HubLink {
  id: LinkId;
  url: string;
  icon: IconComponent;
  external: boolean;
  /** Rendered as the primary (dark) card. */
  featured?: boolean;
}

export const links: readonly HubLink[] = [
  {
    id: "website",
    url: "https://www.vizu-deutsch.com/",
    icon: Globe,
    external: true,
    featured: true,
  },
  {
    id: "telegram",
    url: "https://t.me/vizu_deutsch",
    icon: TelegramIcon,
    external: true,
  },
  {
    id: "youtube",
    url: "http://www.youtube.com/@vizu_deutsch",
    icon: YouTubeIcon,
    external: true,
  },
  {
    id: "bot",
    url: "https://t.me/vizu_academy_bot",
    icon: Bot,
    external: true,
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

export const teacherProfileUrl = "https://zayniddinkhuja-makhmudov-cv.vercel.app/";
