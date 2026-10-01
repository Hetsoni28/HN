import { Metadata } from 'next';
import { ShowreelPlayer } from '@/components/organisms/showreel-player';
import { FadeIn } from '@/components/atoms/fade-in';

export const metadata: Metadata = {
  title: 'Our Vision & Work | HN Showreel',
  description: 'See how HN transforms messy ideas into world-class software. A 40-second cinematic overview of our work, process, and vision.',
};

export default function ShowreelPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Our Vision in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">40 Seconds</span>.
            </h1>
            <p className="text-xl text-slate-500">
              Experience the HN difference. We don't just write code—we engineer growth. 
              Turn up your volume and hit play.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ShowreelPlayer />
        </FadeIn>
      </div>
    </main>
  );
}
