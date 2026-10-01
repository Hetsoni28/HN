import { Navbar } from '@/components/organisms/navbar';
import { Footer } from '@/components/organisms/footer';
import { AnnouncementBar } from '@/components/molecules/announcement-bar';
import { FloatingEstimator } from '@/components/molecules/floating-estimator';
import { CookieBanner } from '@/components/molecules/cookie-banner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
      <FloatingEstimator />
      <CookieBanner />
    </>
  );
}
