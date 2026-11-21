'use client';

import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { WhatsAppButton } from '@/components/atoms/whatsapp-button';
import { PROJECT_BASES, FEATURES, TIMELINES, COMMON_INCLUDES, formatINR, calculateEstimate } from '@/lib/estimator';
import { trackEvent } from '@/lib/analytics';
import { EstimateEmailForm } from './estimate-email-form';


export function CostEstimator() {
  const [selectedBase, setSelectedBase] = useState<string>('webapp');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set(['design', 'auth']));
  const [selectedTimeline, setSelectedTimeline] = useState<string>('flexible');

  const [targetBudget, setTargetBudget] = useState<string>('');

  const started = useRef(false);
  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('estimator_start');
  };

  const totals = useMemo(
    () => calculateEstimate(selectedBase, selectedFeatures, selectedTimeline),
    [selectedBase, selectedFeatures, selectedTimeline],
  );

  const toggleFeature = (id: string) => {
    const next = new Set(selectedFeatures);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedFeatures(next);
  };

  // Generate a detailed string for the inquiry message
  const inquiryMessage = `Hi HN Tech! I used your Project Estimator. Here are my requirements:

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
                  onClick={() => { markStarted(); setSelectedBase(base.id); }}
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
                  onClick={() => { markStarted(); toggleFeature(feature.id); }}
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
                  onClick={() => { markStarted(); setSelectedTimeline(timeline.id); }}
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

        {/* Step 4: Email */}
        <section id="email-estimate" className="scroll-mt-28">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">4. Get this estimate by email</h3>
            <p className="text-sm text-slate-500">Keep a copy and get a reply from our team.</p>
          </div>
          <EstimateEmailForm
            base={selectedBase}
            features={[...selectedFeatures]}
            timeline={selectedTimeline}
            budget={targetBudget}
            rangeLabel={`${formatINR(totals.min)} – ${formatINR(totals.max)}`}
          />
        </section>

      </div>

      {/* Right: Sticky Receipt */}
      <div className="relative">
        <div className="sticky top-28 rounded-3xl border border-[#E2E5F1] bg-white p-6 shadow-sm lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-8">
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

            {/* What the base price covers */}
            <div className="rounded-xl bg-[#F5F6FF] p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0041CC]">Included in this price</p>
              <ul className="mt-3 space-y-2">
                {[...(totals.base?.includes ?? []), ...COMMON_INCLUDES].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] leading-5 text-slate-700">
                    <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0051FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {totals.activeFeatures.length > 0 && (
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Add-ons</p>
            )}
            
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
                🔴 <strong>Notice:</strong> HN Tech&apos;s minimum engagement starts at ₹25,000 for standard websites. We may not be able to accommodate this budget.
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
            <a href="#email-estimate" className="block pt-1 text-center text-sm font-semibold text-[#0041CC] hover:underline">
              Email me this estimate ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
