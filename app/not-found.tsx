import type { Metadata } from 'next';
import { Navbar } from '@/components/organisms/navbar';
import { Footer } from '@/components/organisms/footer';
import { NotFoundContent } from '@/components/organisms/not-found-content';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/**
 * 404 for URLs that match no route. It renders in the root layout, outside app/(main)/layout.tsx,
 * so it adds the site header and footer itself.
 */
export default function RootNotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
