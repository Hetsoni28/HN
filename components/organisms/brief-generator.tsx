'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';

// --- Types & Data ---
type QuestionId = 'type' | 'goal' | 'audience' | 'features' | 'timeline';

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
      
      // Dynamically import to avoid Next.js SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Temporarily hide the 'no-print' elements during capture
      const noPrintElements = element.querySelectorAll('.no-print');
      noPrintElements.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      // Restore the 'no-print' elements
      noPrintElements.forEach((el) => {
        (el as HTMLElement).style.display = '';
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('HN-Studio-Project-Brief.pdf');
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // --- Dynamic Generation Logic ---
  const generateDynamicContent = () => {
    // 1. Architecture Map
    let techStack = 'Next.js 15, React, TypeScript, and Tailwind CSS';
    if (answers.type.includes('Mobile')) techStack = 'React Native (Expo), TypeScript, and a scalable API backend';
    
    // 2. Strategy Map
    let strategy = '';
    if (answers.goal.includes('Revenue')) strategy = 'Focus heavily on conversion rate optimization (CRO) and frictionless onboarding to maximize MRR.';
    if (answers.goal.includes('Automate')) strategy = 'Prioritize system stability, clean data architecture, and intuitive workflows to reduce manual hours.';
    if (answers.goal.includes('Authority')) strategy = 'Implement high-end animations, typography, and flawless performance to build immediate trust.';
    
    // 3. Features Map
    const featureDetails = answers.features.map(f => {
      if (f.includes('Auth')) return 'Secure, scalable user authentication (JWT/OAuth) with session management.';
      if (f.includes('Payments')) return 'PCI-compliant payment processing via Stripe for subscriptions and one-off charges.';
      if (f.includes('Dashboard')) return 'Role-based access control (RBAC) admin dashboard with real-time analytics.';
      if (f.includes('AI')) return 'Integration with OpenAI/Anthropic APIs for intelligent, context-aware user experiences.';
      if (f.includes('Chat')) return 'WebSocket-based real-time messaging architecture for instant communication.';
      return f;
    });

    return { techStack, strategy, featureDetails };
  };

  const dynamic = generateDynamicContent();

  if (isGenerating) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#0051FF] opacity-20"></div>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0051FF] border-t-transparent"></div>
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900">Synthesizing Requirements...</h3>
        <p className="mt-2 text-sm text-slate-500">Mapping architecture and technical strategy.</p>
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
        {/* Printable Area */}
        <div id="brief-pdf-content" className="printable-brief rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-12">
          
          <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0051FF]">Generated via HN Studio</div>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Project Strategy Brief</h2>
            </div>
            <div className="text-right text-sm font-semibold text-slate-400">
              {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Executive Summary</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                This project aims to build a <strong className="text-[#0051FF]">{answers.type}</strong> targeted at <strong className="text-[#0051FF]">{answers.audience}</strong>. 
                The primary objective is to {answers.goal.toLowerCase()}. {dynamic.strategy}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Target Timeline</h3>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#EEF0FF] px-4 py-2 text-sm font-bold text-[#0051FF]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {answers.timeline}
              </div>
            </section>

            <section className="sm:col-span-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Recommended Architecture</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Based on scale requirements, we recommend building on a modern stack utilizing <strong>{dynamic.techStack}</strong>. This ensures high performance, security, and long-term maintainability.
              </p>
            </section>

            <section className="sm:col-span-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Core Technical Requirements</h3>
              <ul className="mt-4 space-y-3">
                {dynamic.featureDetails.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0051FF]/10 text-[#0051FF]">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-slate-700">{feat}</span>
                  </li>
                ))}
                {answers.features.length === 0 && (
                  <li className="text-slate-500 italic">No specific advanced features selected. Standard architecture applies.</li>
                )}
              </ul>
            </section>

          </div>

          <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-center border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Ready to build this?</h4>
            <p className="mt-1 text-sm text-slate-500">Send this brief to HN Studio to get an exact quote.</p>
            <div className="mt-4 flex justify-center gap-3 no-print">
              <Button href="/contact" variant="primary" className="text-sm">
                Discuss Project
              </Button>
            </div>
          </div>

        </div>

        {/* Action Bar */}
        <div className="mt-6 flex justify-center gap-4 no-print">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Save as PDF
          </button>
          <button 
            onClick={() => { setStep(0); setIsDone(false); setAnswers({type:'', goal:'', audience:'', features:[], timeline:''}) }}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
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
