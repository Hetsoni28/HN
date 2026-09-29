'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/atoms/fade-in';
import { Button } from '@/components/atoms/button';
import { WhatsAppButton } from '@/components/atoms/whatsapp-button';

// --- ACCURATE PRICING DATA ---
// You can adjust these base rates and feature costs anytime.
// Currently calibrated for professional agency rates in INR.

const PROJECT_BASES = [
  { id: 'website', name: 'Website / Landing Page', min: 25000, max: 50000, desc: 'High-converting static or CMS-backed site.' },
  { id: 'webapp', name: 'Web Application / SaaS', min: 80000, max: 150000, desc: 'Complex logic, databases, and custom workflows.' },
  { id: 'mobile', name: 'Mobile App (iOS & Android)', min: 120000, max: 250000, desc: 'React Native / Flutter cross-platform app.' },
  { id: 'ecommerce', name: 'E-Commerce Store', min: 60000, max: 120000, desc: 'Full shopping cart, inventory, and checkout.' },
];

const FEATURES = [
  { id: 'design', name: 'Custom UI/UX Design', min: 15000, max: 30000, desc: 'Framer/Figma prototyping and branding.' },
  { id: 'auth', name: 'User Accounts & Profiles', min: 10000, max: 20000, desc: 'Authentication, roles, and profile management.' },
  { id: 'payments', name: 'Payment Gateway', min: 8000, max: 15000, desc: 'Razorpay, Stripe, or PayPal integration.' },
  { id: 'admin', name: 'Admin Dashboard / CMS', min: 20000, max: 40000, desc: 'Custom portal to manage your data/users.' },
  { id: 'ai', name: 'AI Integration', min: 30000, max: 60000, desc: 'OpenAI, Claude, or custom GenAI features.' },
  { id: 'api', name: '3rd-Party APIs', min: 15000, max: 30000, desc: 'Connecting external services (CRM, ERP, etc).' },
  { id: 'seo', name: 'Advanced SEO & Analytics', min: 8000, max: 15000, desc: 'Technical SEO, schema, and tracking setup.' },
];

const TIMELINES = [
  { id: 'flexible', name: 'Flexible (Standard)', multiplier: 1, desc: 'Standard development lifecycle.' },
  { id: 'rush', name: 'Rush (Priority)', multiplier: 1.35, desc: 'Fast-tracked delivery. +35% premium.' },
];

const formatINR = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export function CostEstimator() {
  const [selectedBase, setSelectedBase] = useState<string>('webapp');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set(['design', 'auth']));
  const [selectedTimeline, setSelectedTimeline] = useState<string>('flexible');

  const [targetBudget, setTargetBudget] = useState<string>('');

  // Calculate totals
  const totals = useMemo(() => {
    const base = PROJECT_BASES.find(b => b.id === selectedBase);
    const timeline = TIMELINES.find(t => t.id === selectedTimeline);
    
    let min = base?.min ?? 0;
    let max = base?.max ?? 0;

    const activeFeatures = FEATURES.filter(f => selectedFeatures.has(f.id));
    for (const f of activeFeatures) {
      min += f.min;
      max += f.max;
    }

    const mult = timeline?.multiplier ?? 1;
    min = Math.round(min * mult);
    max = Math.round(max * mult);

    return { min, max, base, activeFeatures, timeline };
  }, [selectedBase, selectedFeatures, selectedTimeline]);

  const toggleFeature = (id: string) => {
    const next = new Set(selectedFeatures);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedFeatures(next);
  };

  // Generate a detailed string for the inquiry message
  const inquiryMessage = `Hi HN Studio! I used your Project Estimator. Here are my requirements:

Project Type: ${totals.base?.name}
Features: ${totals.activeFeatures.map(f => f.name).join(', ') || 'None'}
Timeline: ${totals.timeline?.name}
Target Budget: ${targetBudget ? formatINR(Number(targetBudget)) : 'Not specified'}

Estimated Cost: ${formatINR(totals.min)} - ${formatINR(totals.max)}

I'd like to discuss the next steps!`;

  // Budget Validation Logic
  const numericTarget = parseInt(targetBudget || '0', 10);
  const isUnderAbsoluteMinimum = numericTarget > 0 && numericTarget < 25000;
  const isUnderEstimatedMinimum = numericTarget > 0 && numericTarget >= 25000 && numericTarget < totals.min;
  const isBudgetAligned = numericTarget >= totals.min;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
      {/* Left: Options */}
      <div className="space-y-12">
        
        {/* Step 1: Base */}
        <section>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">1. What are we building?</h3>
            <p className="text-sm text-slate-500">Select the core foundation of your project.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECT_BASES.map(base => {
              const isSelected = selectedBase === base.id;
              return (
                <button
                  key={base.id}
                  onClick={() => setSelectedBase(base.id)}
                  className={`flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                    isSelected 
                      ? 'border-[#0051FF] bg-[#0051FF]/5 ring-1 ring-[#0051FF]' 
                      : 'border-[#E2E5F1] bg-white hover:border-[#0051FF]/40'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={`font-bold ${isSelected ? 'text-[#0051FF]' : 'text-slate-900'}`}>{base.name}</span>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected ? 'border-[#0051FF] bg-[#0051FF]' : 'border-slate-300'}`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">{base.desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Features */}
        <section>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">2. What features do you need?</h3>
            <p className="text-sm text-slate-500">Select all the capabilities your project requires.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map(feature => {
              const isSelected = selectedFeatures.has(feature.id);
              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                    isSelected 
                      ? 'border-[#0051FF] bg-[#0051FF]/5 ring-1 ring-[#0051FF]' 
                      : 'border-[#E2E5F1] bg-white hover:border-[#0051FF]/40'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${isSelected ? 'border-[#0051FF] bg-[#0051FF]' : 'border-slate-300'}`}>
                    {isSelected && (
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className={`block font-bold text-sm ${isSelected ? 'text-[#0051FF]' : 'text-slate-900'}`}>{feature.name}</span>
                    <span className="mt-1 block text-xs text-slate-500">{feature.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3: Timeline */}
        <section>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">3. How fast do you need it?</h3>
            <p className="text-sm text-slate-500">Rushed projects require dedicated overtime.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {TIMELINES.map(timeline => {
              const isSelected = selectedTimeline === timeline.id;
              return (
                <button
                  key={timeline.id}
                  onClick={() => setSelectedTimeline(timeline.id)}
                  className={`flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                    isSelected 
                      ? 'border-[#0051FF] bg-[#0051FF]/5 ring-1 ring-[#0051FF]' 
                      : 'border-[#E2E5F1] bg-white hover:border-[#0051FF]/40'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={`font-bold ${isSelected ? 'text-[#0051FF]' : 'text-slate-900'}`}>{timeline.name}</span>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected ? 'border-[#0051FF] bg-[#0051FF]' : 'border-slate-300'}`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="mt-2 text-xs text-slate-500">{timeline.desc}</span>
                </button>
              );
            })}
          </div>
        </section>

      </div>

      {/* Right: Sticky Receipt */}
      <div className="relative">
        <div className="sticky top-28 rounded-3xl border border-[#E2E5F1] bg-white p-6 shadow-sm lg:p-8">
          <h3 className="text-lg font-bold text-slate-900">Estimated Investment</h3>
          <p className="mt-2 text-xs text-slate-500">
            This is a rough estimate based on industry standards. Final cost depends on specific scope and complexity.
          </p>

          <div className="my-6 border-t border-dashed border-[#E2E5F1]" />

          {/* Target Budget Input */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
              Add Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">₹</span>
              <input 
                type="number"
                placeholder="Enter amount"
                value={targetBudget}
                onChange={(e) => setTargetBudget(e.target.value)}
                className="w-full rounded-xl border border-[#E2E5F1] bg-slate-50 py-3 pl-8 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0051FF] focus:bg-white focus:ring-2 focus:ring-[#0051FF]/20"
              />
            </div>
          </div>

          {/* Receipt Lines */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-slate-800">{totals.base?.name}</span>
            </div>
            
            {totals.activeFeatures.length > 0 && (
              <div className="pl-3 space-y-2 border-l-2 border-[#EEF0FF]">
                {totals.activeFeatures.map(f => (
                  <div key={f.id} className="flex justify-between gap-4 text-slate-600">
                    <span>+ {f.name}</span>
                  </div>
                ))}
              </div>
            )}

            {totals.timeline && totals.timeline.multiplier > 1 && (
              <div className="flex justify-between gap-4 text-[#0051FF] font-medium">
                <span>Priority Rush</span>
                <span>+35%</span>
              </div>
            )}
          </div>

          <div className="my-6 border-t border-dashed border-[#E2E5F1]" />

          {/* Total */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Calculated Range (INR)</span>
            <motion.div 
              key={`${totals.min}-${totals.max}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-3xl font-black text-[#0051FF] tracking-tight"
            >
              {formatINR(totals.min)} <span className="text-xl text-slate-400 font-medium mx-1">to</span> {formatINR(totals.max)}
            </motion.div>
          </div>

          {/* Dynamic Budget Alerts */}
          <div className="mb-8">
            {isUnderAbsoluteMinimum && (
              <div className="rounded-lg bg-red-50 p-3 text-xs font-medium leading-5 text-red-600 border border-red-100">
                🔴 <strong>Notice:</strong> HN Studio&apos;s minimum engagement starts at ₹25,000 for standard websites. We may not be able to accommodate this budget.
              </div>
            )}
            {isUnderEstimatedMinimum && (
              <div className="rounded-lg bg-amber-50 p-3 text-xs font-medium leading-5 text-amber-700 border border-amber-100">
                ⚠️ <strong>Budget Mismatch:</strong> Your requirements exceed your target budget. Consider removing some advanced features or increasing your budget.
              </div>
            )}
            {isBudgetAligned && (
              <div className="rounded-lg bg-green-50 p-3 text-xs font-medium leading-5 text-green-700 border border-green-100">
                ✅ <strong>Great news:</strong> Your target budget aligns perfectly with these requirements!
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Button href="/contact" variant="primary" fullWidth>
              Discuss this project →
            </Button>
            <WhatsAppButton 
              label="Send estimate via WhatsApp" 
              message={inquiryMessage} 
              fullWidth 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
