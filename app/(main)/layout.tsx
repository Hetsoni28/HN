import { Navbar } from '@/components/organisms/navbar';
import { Footer } from '@/components/organisms/footer';
import { AnnouncementBar } from '@/components/molecules/announcement-bar';
import { FloatingEstimator } from '@/components/molecules/floating-estimator';
import { CookieBanner } from '@/components/molecules/cookie-banner';
import { WhatsAppButton } from '@/components/molecules/whatsapp-button';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <FloatingEstimator />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
