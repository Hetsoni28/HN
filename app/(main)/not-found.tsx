import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/organisms/not-found-content';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/** Shown when a page in the main site calls notFound() (e.g. an unknown case study or article). */
export default function NotFound() {
  return <NotFoundContent />;
}
