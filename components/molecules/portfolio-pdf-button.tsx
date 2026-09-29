'use client';

import { useState } from 'react';

interface Project {
  title: string;
  category?: string;
  industry?: string;
  shortDescription?: string;
  technology?: string[];
  timeline?: string;
  role?: string;
  resultsText?: string;
}

interface PortfolioPDFButtonProps {
  projects: Project[];
}

export function PortfolioPDFButton({ projects }: PortfolioPDFButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const contentW = pageW - margin * 2;

      // ── Color Palette ──
      const BLUE = [0, 81, 255] as const;
      const NAVY = [11, 17, 30] as const;
      const SLATE = [100, 116, 139] as const;
      const WHITE: [number, number, number] = [255, 255, 255];
      const LIGHT_BG: [number, number, number] = [238, 240, 255];

      // ── COVER PAGE ──
      pdf.setFillColor(...NAVY);
      pdf.rect(0, 0, pageW, pageH, 'F');

      // Blue accent bar on left
      pdf.setFillColor(...BLUE);
      pdf.rect(0, 0, 6, pageH, 'F');

      // HN Studio logo text
      pdf.setTextColor(...BLUE);
      pdf.setFontSize(36);
      pdf.setFont('helvetica', 'bold');
      pdf.text('HN', margin + 6, 52);
      pdf.setTextColor(...WHITE);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('STUDIO', margin + 6, 60);

      // Divider
      pdf.setDrawColor(...BLUE);
      pdf.setLineWidth(0.5);
      pdf.line(margin + 6, 68, pageW - margin, 68);

      // Portfolio title
      pdf.setTextColor(...WHITE);
      pdf.setFontSize(34);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Portfolio', margin + 6, 92);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(150, 165, 200);
      pdf.text('Selected Work · ' + new Date().getFullYear(), margin + 6, 104);

      // Tagline
      pdf.setFontSize(11);
      pdf.setTextColor(150, 165, 200);
      const taglines = [
        'Full-stack engineering studio building world-class',
        'web applications, mobile apps, SaaS platforms,',
        'and AI-powered digital products.',
      ];
      taglines.forEach((line, i) => {
        pdf.text(line, margin + 6, 125 + i * 8);
      });

      // Stats bar
      const stats = [
        { value: `${projects.length}+`, label: 'Projects Shipped' },
        { value: '100%', label: 'On-Time Delivery' },
        { value: '3+', label: 'Years Building' },
      ];
      const statW = contentW / stats.length;
      stats.forEach((stat, i) => {
        const x = margin + 6 + i * statW;
        const y = 168;
        pdf.setFillColor(255, 255, 255, 0.05);
        pdf.setFillColor(30, 40, 60);
        pdf.roundedRect(x, y, statW - 8, 26, 4, 4, 'F');
        pdf.setTextColor(...BLUE);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(stat.value, x + 8, y + 11);
        pdf.setTextColor(150, 165, 200);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(stat.label, x + 8, y + 20);
      });

      // Contact info at bottom
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139);
      pdf.text('contact.hnsolutions@gmail.com  ·  hnsolutions.in  ·  India · Available worldwide', margin + 6, pageH - 18);

      // ── PROJECT PAGES ──
      const topProjects = projects.slice(0, 6);

      topProjects.forEach((project, idx) => {
        pdf.addPage();

        // Light background
        pdf.setFillColor(249, 250, 255);
        pdf.rect(0, 0, pageW, pageH, 'F');

        // Blue left accent
        pdf.setFillColor(...BLUE);
        pdf.rect(0, 0, 6, pageH, 'F');

        // Top bar with project number
        pdf.setFillColor(11, 17, 30);
        pdf.rect(0, 0, pageW, 36, 'F');

        // Project number tag
        pdf.setFillColor(...BLUE);
        pdf.roundedRect(margin + 6, 8, 22, 10, 2, 2, 'F');
        pdf.setTextColor(...WHITE);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`0${idx + 1}`, margin + 6 + 4, 14.5);

        // Project title in header
        pdf.setTextColor(...WHITE);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(project.title, margin + 35, 17.5);

        // Category badge in header
        if (project.category) {
          const catWidth = pdf.getTextWidth(project.category) + 10;
          pdf.setFillColor(0, 81, 255, 0.3);
          pdf.setFillColor(30, 50, 100);
          pdf.roundedRect(pageW - margin - catWidth - 4, 8, catWidth + 4, 10, 2, 2, 'F');
          pdf.setTextColor(150, 190, 255);
          pdf.setFontSize(8);
          pdf.text(project.category, pageW - margin - catWidth, 14.5);
        }

        // HN Studio branding bottom-right of header
        pdf.setTextColor(60, 80, 120);
        pdf.setFontSize(8);
        pdf.text('HN Studio', pageW - margin - 2, 14.5, { align: 'right' });

        let y = 52;

        // Short description
        if (project.shortDescription) {
          pdf.setFontSize(13);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(...NAVY);
          const descLines = pdf.splitTextToSize(project.shortDescription, contentW - 12);
          pdf.text(descLines, margin + 6, y);
          y += descLines.length * 8 + 6;
        }

        // Meta pills row
        const metas = [
          project.industry ? `Industry: ${project.industry}` : null,
          project.timeline ? `Timeline: ${project.timeline}` : null,
          project.role ? `Role: ${project.role}` : null,
        ].filter(Boolean) as string[];

        let pillX = margin + 6;
        metas.forEach((meta) => {
          const pillW = pdf.getTextWidth(meta) + 12;
          pdf.setFillColor(...LIGHT_BG);
          pdf.roundedRect(pillX, y, pillW, 9, 2, 2, 'F');
          pdf.setTextColor(...BLUE);
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'normal');
          pdf.text(meta, pillX + 6, y + 6);
          pillX += pillW + 5;
        });
        y += 18;

        // Divider
        pdf.setDrawColor(225, 230, 245);
        pdf.setLineWidth(0.3);
        pdf.line(margin + 6, y, pageW - margin, y);
        y += 10;

        // Results section (most important for trust)
        if (project.resultsText) {
          // Section label
          pdf.setFillColor(...BLUE);
          pdf.rect(margin + 6, y, 3, 16, 'F');
          pdf.setTextColor(...NAVY);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Key Results', margin + 14, y + 6);
          y += 8;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9.5);
          pdf.setTextColor(50, 60, 80);
          const resultLines = pdf.splitTextToSize(project.resultsText, contentW - 20);
          pdf.text(resultLines, margin + 14, y + 4);
          y += resultLines.length * 6 + 14;
        }

        // Technology stack
        if (project.technology?.length) {
          pdf.setDrawColor(225, 230, 245);
          pdf.setLineWidth(0.3);
          pdf.line(margin + 6, y, pageW - margin, y);
          y += 10;

          pdf.setFillColor(...BLUE);
          pdf.rect(margin + 6, y, 3, 16, 'F');
          pdf.setTextColor(...NAVY);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Technology Stack', margin + 14, y + 6);
          y += 12;

          // Tech tags
          let tagX = margin + 14;
          let tagY = y;
          project.technology.forEach((tech) => {
            const tagW = pdf.getTextWidth(tech) + 10;
            if (tagX + tagW > pageW - margin) {
              tagX = margin + 14;
              tagY += 12;
            }
            pdf.setFillColor(11, 17, 30);
            pdf.roundedRect(tagX, tagY - 4, tagW, 9, 2, 2, 'F');
            pdf.setTextColor(200, 215, 255);
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.text(tech, tagX + 5, tagY + 2);
            tagX += tagW + 5;
          });
        }

        // Footer with page number
        pdf.setFillColor(11, 17, 30);
        pdf.rect(0, pageH - 14, pageW, 14, 'F');
        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(8);
        pdf.text('HN Studio  ·  contact.hnsolutions@gmail.com', margin + 6, pageH - 5);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`${idx + 2} / ${topProjects.length + 1}`, pageW - margin, pageH - 5, { align: 'right' });
      });

      pdf.save('HN-Studio-Portfolio.pdf');
    } catch (err: any) {
      console.error('PDF generation failed', err);
      alert('PDF generation failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="group inline-flex items-center gap-3 rounded-2xl bg-[#0051FF] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0051FF]/25 transition-all hover:-translate-y-0.5 hover:bg-[#003ED9] hover:shadow-[#0051FF]/40 active:scale-95 disabled:cursor-wait disabled:opacity-60"
    >
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Generating PDF…</span>
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span>Download Portfolio PDF</span>
        </>
      )}
    </button>
  );
}
