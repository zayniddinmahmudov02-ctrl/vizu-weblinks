import { AboutTeacher } from "@/components/AboutTeacher";
import { Background } from "@/components/Background";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProfileCard } from "@/components/ProfileCard";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <a
        href="#links"
        className="sr-only z-50 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Zu den Links springen
      </a>

      <Background />

      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-8 px-4 pt-8 pb-6 sm:max-w-[500px] sm:px-6 sm:pt-12 lg:pt-16">
        <Hero />
        <main className="flex flex-col gap-8">
          <ProfileCard />
          <SocialLinks />
          <AboutTeacher />
        </main>
        <Footer />
      </div>
    </>
  );
}
