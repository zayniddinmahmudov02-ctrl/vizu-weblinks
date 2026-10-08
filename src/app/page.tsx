import { Footer } from "@/components/Footer";
import { GermanyBackground } from "@/components/GermanyBackground";
import { Hero } from "@/components/Hero";
import { LevelStaircase } from "@/components/LevelStaircase";
import { ProfileCard } from "@/components/ProfileCard";
import { SocialLinks } from "@/components/SocialLinks";
import { TeacherSection } from "@/components/TeacherSection";

export default function Home() {
  return (
    <>
      <GermanyBackground />

      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-8 px-4 pt-6 pb-6 sm:max-w-[500px] sm:px-6 sm:pt-10 lg:pt-14">
        <Hero />
        <main className="flex flex-col gap-8">
          <ProfileCard />
          <SocialLinks />
          {/* In the flow on phones/tablets; pinned bottom-left on wide screens. */}
          <div className="flex h-[132px] justify-center xl:fixed xl:bottom-10 xl:left-10 xl:h-auto">
            <LevelStaircase className="origin-top scale-[0.8] xl:scale-100" />
          </div>
          <TeacherSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
