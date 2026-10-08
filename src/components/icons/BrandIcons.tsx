import type { SVGProps } from "react";

type BrandIconProps = Omit<SVGProps<SVGSVGElement>, "ref">;

/** Brand marks that Lucide no longer ships. Same sizing contract as Lucide icons. */
export function TelegramIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="-0.5 0 24 24"
      fill="currentColor"
      width={24}
      height={24}
      className={className}
      {...props}
    >
      <path d="M21.9 4.3 18.6 19.8c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1 .5l.36-5.13 9.34-8.44c.4-.36-.09-.56-.63-.2L5.81 13.3.84 11.75c-1.08-.34-1.1-1.08.23-1.6L20.5 2.66c.9-.33 1.69.21 1.4 1.64Z" />
    </svg>
  );
}

export function YouTubeIcon({ className, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={24}
      height={24}
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2C2 8.9 2 12 2 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM10 15.1V8.9l5.3 3.1L10 15.1Z"
      />
    </svg>
  );
}
