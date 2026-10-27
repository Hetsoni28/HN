import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { BriefGenerator } from '@/components/organisms/brief-generator';
import { FadeIn } from '@/components/atoms/fade-in';

export const metadata: Metadata = pageMetadata({
  title: 'Free Software Project Brief Generator',
  description:
    'Answer 5 quick questions and get a free project brief for your website or app: scope, features, recommended tech stack and timeline, ready to share.',
  path: '/brief',
});

export default function BriefPage() {
  return (
    <div className="min-h-[90svh] bg-[#F5F6FF] py-16 sm:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center no-print">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Project Brief Generator
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
              Answer 5 quick questions and we&apos;ll instantly generate a comprehensive architectural and strategy brief for your digital product.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <BriefGenerator />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
