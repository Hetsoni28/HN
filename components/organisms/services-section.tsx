import { FadeIn } from '@/components/atoms/fade-in';
import { SectionHeading } from '@/components/molecules/section-heading';
import { Button } from '@/components/atoms/button';
import { ServiceIcon } from '@/components/atoms/service-icon';

const services = [
  { slug: 'websites',           title: 'Enterprise Web Portals',         desc: 'Scalable corporate & B2B platforms' },
  { slug: 'e-commerce',         title: 'Scalable E-commerce',       desc: 'High-volume transaction architectures' },
  { slug: 'web-applications',   title: 'Custom Cloud Applications',          desc: 'Cloud-native multi-tenant platforms' },
  { slug: 'dashboards-admin',   title: 'Internal Ops Platforms',        desc: 'Secure data & workflow management' },
  { slug: 'apis-integrations',  title: 'Enterprise Integration',          desc: 'Complex system & API orchestration' },
  { slug: 'ui-ux-design',       title: 'Product Design',             desc: 'Data-driven UX architecture' },
  { slug: 'custom-software',    title: 'Cloud Infrastructure',       desc: 'Secure & highly scalable architecture' },
  { slug: 'maintenance-support',title: 'Enterprise Support & SLAs',    desc: '24/7 dedicated engineering support' },
];

export function ServicesSection() {
  return (
    <section className="section bg-slate-50">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="Solutions"
            title="End-to-End Enterprise Solutions."
            description="End-to-end — strategy, design, engineering, and support."
          />
        </FadeIn>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#E2E5F1] bg-[#E2E5F1] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FadeIn key={s.slug} delay={i * 0.05}>
              <div className="flex h-full flex-col bg-white p-6 transition duration-200 hover:bg-slate-50">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[#0051FF]">
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
