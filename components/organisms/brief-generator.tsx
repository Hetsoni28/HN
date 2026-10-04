'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';

import { Logo } from '@/components/atoms/logo';

// --- Types & Data ---
interface AnswerState {
  type: string;
  goal: string;
  audience: string;
  features: string[];
  timeline: string;
}

const QUESTIONS = [
  {
    id: 'type',
    title: 'What are you looking to build?',
    options: ['Web Application / SaaS', 'Mobile App (iOS & Android)', 'Corporate Website', 'Internal Business Tool'],
    multi: false,
  },
  {
    id: 'goal',
    title: 'What is the primary goal of this project?',
    options: ['Generate Revenue / Subscriptions', 'Automate Operations', 'Establish Brand Authority', 'Acquire Users / Leads'],
    multi: false,
  },
  {
    id: 'audience',
    title: 'Who is your target audience?',
    options: ['B2B (Other Businesses)', 'B2C (Everyday Consumers)', 'Internal Employees', 'Enterprise Clients'],
    multi: false,
  },
  {
    id: 'features',
    title: 'Select the core features you need (Pick up to 3):',
    options: ['User Authentication', 'Payments / Subscriptions', 'Admin Dashboard', 'AI Integration', 'Real-time Chat / Messaging'],
    multi: true,
  },
  {
    id: 'timeline',
    title: 'What is your target launch timeline?',
    options: ['ASAP (Rushed)', '1 - 3 Months', '3 - 6 Months', 'Flexible'],
    multi: false,
  },
];

export function BriefGenerator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({
    type: '',
    goal: '',
    audience: '',
    features: [],
    timeline: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const currentQ = QUESTIONS[step];

  const handleSelect = (option: string) => {
    if (currentQ.multi) {
      setAnswers((prev) => {
        const has = prev.features.includes(option);
        if (has) return { ...prev, features: prev.features.filter((f) => f !== option) };
        if (prev.features.length >= 3) return prev;
        return { ...prev, features: [...prev.features, option] };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
      // Auto-advance for single select
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Generate brief
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setIsDone(true);
      }, 2000); // Fake loading for premium effect
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('brief-pdf-content');
      if (!element) return;
      
      // Dynamically import html-to-image and jspdf to avoid SSR/modern CSS issues
      const htmlToImage = await import('html-to-image');
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

      // Temporarily hide the 'no-print' elements during capture
      const noPrintElements = element.querySelectorAll('.no-print');
      noPrintElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      // html-to-image uses the browser's native rendering, so it handles oklch/lab colors perfectly
      const imgData = await htmlToImage.toPng(element, { 
        backgroundColor: '#ffffff',
        pixelRatio: 2 // High quality
      });
      
      // Restore the 'no-print' elements
      noPrintElements.forEach((el) => {
        (el as HTMLElement).style.display = '';
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculate height maintaining aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('HN-Tech-Project-Brief.pdf');
    } catch (error: unknown) {
      console.error('Failed to generate PDF', error);
      const msg = error instanceof Error ? error.message : 'Unknown error. Check console.';
      alert('Failed to generate PDF: ' + msg);
    }
  };

  // --- Dynamic Generation Logic ---
  const generateDynamicContent = () => {
    // 1. Architecture Map (Detailed & Professional)
    let techStack = '';
    let infrastructure = '';
    if (answers.type.includes('Mobile')) {
      techStack = 'React Native (Expo), TypeScript, Node.js (Express/NestJS), PostgreSQL';
      infrastructure = 'Cross-platform mobile architecture communicating with a scalable REST/GraphQL backend. Features biometric auth support, encrypted local storage (MMKV), and automated App Store / Google Play deployment pipelines.';
    } else if (answers.type.includes('Website')) {
      techStack = 'Next.js 15, React, TypeScript, Tailwind CSS, Headless CMS (Sanity)';
      infrastructure = 'High-performance, statically generated (SSG) architecture. Optimized for sub-second LCP (Largest Contentful Paint), pristine Technical SEO, and dynamic edge-network caching via Vercel.';
    } else {
      techStack = 'Next.js 15, React, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL';
      infrastructure = 'Cloud-native serverless architecture. Database layer leverages connection pooling and strict type-safe queries. Global edge network distribution ensures minimal latency and high availability.';
    }
    
    // 2. Strategy Map (Business Focus)
    let strategy = '';
    if (answers.goal.includes('Revenue')) strategy = 'Drive aggressive conversion rate optimization (CRO), frictionless user onboarding, and seamless payment flows to maximize MRR and reduce checkout abandonment.';
    if (answers.goal.includes('Automate')) strategy = 'Eliminate operational bottlenecks through automated workflows, clean data architecture, and intuitive internal dashboards to drastically reduce manual labor hours.';
    if (answers.goal.includes('Authority')) strategy = 'Command industry presence through award-winning UI/UX design, bespoke micro-interactions, and flawless typography that builds immediate, unwavering trust with enterprise stakeholders.';
    if (answers.goal.includes('Acquire')) strategy = 'Implement viral growth loops, optimized landing pages, and robust A/B testing infrastructure to rapidly drive down Customer Acquisition Cost (CAC) while scaling traffic.';
    
    // 3. Features Map (Technical Deep Dive)
    const featureDetails = answers.features.map(f => {
      if (f.includes('Auth')) return { title: 'Identity & Access Management', desc: 'Enterprise-grade user authentication (JWT/OAuth2.0) featuring Multi-Factor Authentication (MFA), secure session management, and granular Role-Based Access Control (RBAC).' };
      if (f.includes('Payments')) return { title: 'Revenue & Billing Infrastructure', desc: 'PCI-compliant payment processing integration (Stripe/LemonSqueezy) supporting multi-tier subscriptions, dynamic pricing logic, and webhook-driven invoice generation.' };
      if (f.includes('Dashboard')) return { title: 'Analytics & Command Center', desc: 'Real-time administrative dashboard featuring rich data visualization (Chart.js/Recharts), advanced filtering, and CSV/PDF export capabilities for business intelligence.' };
      if (f.includes('AI')) return { title: 'Artificial Intelligence Engine', desc: 'Deep integration with LLM APIs (OpenAI/Anthropic) using streaming architectures (Server-Sent Events) for context-aware NLP interactions and automated data processing.' };
      if (f.includes('Chat')) return { title: 'Real-Time Communication', desc: 'Low-latency, bi-directional WebSocket infrastructure utilizing Socket.io or Pusher for instant messaging, presence indicators, and unread receipt tracking.' };
      return { title: f, desc: 'Custom engineered module built exactly to your business logic specifications.' };
    });

    return { techStack, infrastructure, strategy, featureDetails };
  };

  const dynamic = generateDynamicContent();

  if (isGenerating) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#0051FF] opacity-20"></div>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0051FF] border-t-transparent"></div>
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900">Synthesizing Architecture...</h3>
        <p className="mt-2 text-sm text-slate-500">Mapping infrastructure, technical strategy, and UX milestones.</p>
      </div>
    );
  }

  if (isDone) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        {/* Printable Area - The World Class PDF */}
        <div id="brief-pdf-content" className="printable-brief relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-8 py-6 sm:px-12">
            <Logo />
            <div className="text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0051FF]">Technical Strategy Brief</div>
              <div className="mt-1 text-xs font-semibold text-slate-400">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            {/* Title Section */}
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Architectural Proposal for <span className="text-[#0051FF]">{answers.type}</span></h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                A custom-engineered digital product solution explicitly designed for <strong className="text-slate-900">{answers.audience}</strong> to <strong className="text-slate-900">{answers.goal.toLowerCase()}</strong>.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
              
              {/* Left Column: Core Details */}
              <div className="space-y-10 lg:col-span-2">
                <section>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0051FF]"></span>
                    Strategic Objective
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-700">
                    {dynamic.strategy}
                  </p>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0051FF]"></span>
                    Infrastructure & Stack
                  </h3>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">{dynamic.techStack}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{dynamic.infrastructure}</p>
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0051FF]"></span>
                    Core Module Engineering
                  </h3>
                  <div className="mt-4 space-y-4">
                    {dynamic.featureDetails.map((feat, i) => (
                      <div key={i} className="flex gap-4 rounded-xl border border-slate-100 p-5 shadow-sm">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0051FF]/10 text-[#0051FF]">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                    {answers.features.length === 0 && (
                      <div className="rounded-xl border border-slate-100 p-5 italic text-slate-500 shadow-sm">
                        Standard highly-optimized architecture applies. No custom intensive modules selected.
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column: Metadata */}
              <div className="space-y-8 rounded-2xl bg-slate-50 p-6 border border-slate-100 h-fit">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Type</h4>
                  <p className="mt-2 font-bold text-slate-900">{answers.type}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Audience</h4>
                  <p className="mt-2 font-bold text-slate-900">{answers.audience}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Timeline</h4>
                  <p className="mt-2 font-bold text-[#0051FF]">{answers.timeline}</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quality Guarantee</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Built by senior engineers at HN ensuring scalable code, flawless UX, and extreme performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer / CTA inside PDF */}
            <div className="mt-12 rounded-2xl bg-[#0051FF] p-8 text-center text-white">
              <h4 className="text-lg font-bold">Ready to build this architecture?</h4>
              <p className="mt-2 text-sm text-white/80">Contact us at contact@hn.studio to get an exact technical quote.</p>
              <div className="mt-5 no-print">
                <Button href="/contact" variant="secondary" className="border-transparent bg-white text-[#0051FF] hover:bg-slate-50">
                  Discuss This Project
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Action Bar (Outside PDF) */}
        <div className="mt-8 flex justify-center gap-4 no-print">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-xl bg-[#0051FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0051FF]/25 transition-all hover:bg-[#003ED9] hover:shadow-[#0051FF]/40 active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download High-Res PDF
          </button>
          <button 
            onClick={() => { setStep(0); setIsDone(false); setAnswers({type:'', goal:'', audience:'', features:[], timeline:''}) }}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Start Over
          </button>
        </div>
      </motion.div>
    );
  }

  // --- Wizard UI ---
  const isMulti = currentQ.multi;
  const currentAnswer = isMulti ? answers[currentQ.id as keyof AnswerState] as string[] : answers[currentQ.id as keyof AnswerState] as string;
  const canProceed = isMulti ? (currentAnswer.length > 0) : (currentAnswer !== '');

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0051FF]">
          Step {step + 1} of {QUESTIONS.length}
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          {currentQ.title}
        </h2>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {currentQ.options.map((opt) => {
              const isSelected = isMulti ? currentAnswer.includes(opt) : currentAnswer === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`flex w-full items-center justify-between rounded-xl border p-5 text-left font-semibold transition-all ${
                    isSelected 
                      ? 'border-[#0051FF] bg-[#0051FF]/5 text-[#0051FF] shadow-[0_0_0_1px_#0051FF]' 
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                  {isSelected && (
                    <svg className="h-5 w-5 text-[#0051FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {isMulti && (
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNext} 
            disabled={!canProceed}
            variant={canProceed ? 'primary' : 'secondary'}
          >
            Next Step &rarr;
          </Button>
        </div>
      )}
    </div>
  );
}
