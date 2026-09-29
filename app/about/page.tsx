import type { Metadata } from 'next';
import { getTeamMembers } from '@/lib/content';
import { AboutHero, AboutIntro, AboutVision } from '@/components/organisms/about-hero';
import { AboutValues, AboutTeam } from '@/components/organisms/about-values';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';

export const metadata: Metadata = {
  title: 'About — HN',
  description: 'HN is a two-person digital product studio founded by Het Soni and Neel Patel. We build websites, web apps, SaaS platforms, mobile apps, and AI solutions.',
};

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutVision />
      <AboutValues />
      <AboutTeam members={team} />

      {/* CTA */}
      <section className="section bg-[#0051FF]">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Want to work with us?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              We take on a small number of projects at a time so every client gets our full focus. Let&apos;s talk about your idea.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                className="bg-white px-10 py-4 text-base font-bold text-[#0051FF] hover:bg-blue-50"
              >
                Get in Touch →
              </Button>
              <Button
                href="/work"
                className="border border-white/30 bg-transparent px-10 py-4 text-base text-white hover:bg-white/10"
              >
                See Our Work
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
