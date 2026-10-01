'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { FadeIn } from '@/components/atoms/fade-in';

export function ROICalculator() {
  const [visitors, setVisitors] = useState<number>(5000);
  const [conversionRate, setConversionRate] = useState<number>(1.5);
  const [aov, setAov] = useState<number>(5000); // Average Order Value in INR

  // Calculations
  const currentMonthlyOrders = visitors * (conversionRate / 100);
  const currentMonthlyRevenue = currentMonthlyOrders * aov;
  const currentYearlyRevenue = currentMonthlyRevenue * 12;

  // Assume a 35% relative increase in conversion rate with a better, faster website
  const conversionBoost = 1.35;
  const newConversionRate = conversionRate * conversionBoost;
  
  const newMonthlyOrders = visitors * (newConversionRate / 100);
  const newMonthlyRevenue = newMonthlyOrders * aov;
  const newYearlyRevenue = newMonthlyRevenue * 12;

  const extraYearlyRevenue = newYearlyRevenue - currentYearlyRevenue;
  const extraMonthlyRevenue = newMonthlyRevenue - currentMonthlyRevenue;

  // Formatting helper
  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-10">
      <div className="grid gap-12 lg:grid-cols-2">
        
        {/* Left Side: Inputs */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Your Current Metrics</h3>
            <p className="mt-2 text-sm text-slate-500">
              Adjust the sliders below to match your business. We&apos;ll calculate how much revenue you&apos;re losing to a slow or confusing website.
            </p>
          </div>

          {/* Visitors Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Monthly Website Visitors</label>
              <span className="rounded-lg bg-[#EEF0FF] px-3 py-1 text-sm font-bold text-[#0051FF]">
                {visitors.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0051FF]"
            />
          </div>

          {/* Conversion Rate Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Current Conversion Rate (%)</label>
              <span className="rounded-lg bg-[#EEF0FF] px-3 py-1 text-sm font-bold text-[#0051FF]">
                {conversionRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0051FF]"
            />
          </div>

          {/* Average Order Value Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Average Order Value (₹)</label>
              <span className="rounded-lg bg-[#EEF0FF] px-3 py-1 text-sm font-bold text-[#0051FF]">
                {formatINR(aov)}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0051FF]"
            />
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B111E] to-[#1a2333] p-8 text-white sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0051FF] opacity-20 blur-3xl" />
          
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#00D2FF]">The HN Studio Impact</p>
              <h4 className="mt-4 text-3xl font-extrabold leading-tight">
                Stop leaving money <br /> on the table.
              </h4>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                A premium, high-performance website built by us typically increases conversion rates by at least 35% through better UX, faster load times, and stronger trust signals.
              </p>
            </div>

            <div className="mt-10 space-y-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-slate-400">Extra Monthly Revenue</span>
                <motion.span
                  key={extraMonthlyRevenue}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold text-white"
                >
                  +{formatINR(extraMonthlyRevenue)}
                </motion.span>
              </div>
              <div className="flex flex-col items-center justify-center pt-2">
                <span className="text-sm font-semibold text-slate-400">Potential Extra Yearly Revenue</span>
                <motion.span
                  key={extraYearlyRevenue}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 text-4xl font-extrabold text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                >
                  {formatINR(extraYearlyRevenue)}
                </motion.span>
              </div>
            </div>

            <div className="mt-10">
              <Button href="/contact" variant="primary" className="w-full justify-center py-4 text-base">
                Claim Your Revenue →
              </Button>
              <p className="mt-4 text-center text-xs text-slate-400">
                Based on a 35% relative conversion rate increase. Your actual results may vary.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
