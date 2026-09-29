import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';
import { Button } from '@/components/atoms/button';
import { ServiceIcon } from '@/components/atoms/service-icon';

const services = [
  { slug: 'websites',           title: 'Business Website',         desc: 'Corporate, Portfolio, Real Estate & More' },
  { slug: 'e-commerce',         title: 'E-commerce Website',       desc: 'Complete Online Store with Payment Integration' },
  { slug: 'web-applications',   title: 'Web Application',          desc: 'Custom Web Apps for Your Business Needs' },
  { slug: 'dashboards-admin',   title: 'Admin Panel / CRM',        desc: 'Manage Your Data with Easy Admin Panel' },
  { slug: 'apis-integrations',  title: 'API Integration',          desc: 'Third-party API, Payment, Maps, and More' },
  { slug: 'ui-ux-design',       title: 'UI/UX Design',             desc: 'Modern, Clean & User-Friendly Design' },
  { slug: 'custom-software',    title: 'Database & Backend',       desc: 'Secure & Scalable Architecture' },
  { slug: 'maintenance-support',title: 'Maintenance & Support',    desc: 'Ongoing Support & Feature Updates' },
];

export function ServicesSection() {
  return (
    <section className="section bg-[#EEF0FF]">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to go from idea to launch."
            description="End-to-end — strategy, design, engineering, and support."
          />
        </FadeIn>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#E2E5F1] bg-[#E2E5F1] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FadeIn key={s.slug} delay={i * 0.05}>
              <div className="flex h-full flex-col bg-white p-6 transition duration-200 hover:bg-[#EEF0FF]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#0051FF]">
                  <ServiceIcon slug={s.slug} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <Button href="/services" variant="secondary">
            Full capabilities →
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
