import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { Database, Shield, RefreshCw, Globe, FileSpreadsheet, Search, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CliniCarbon | Healthcare Emission Factor Knowledge Base',
  description: 'Authoritative emission factor corpus for US and Canadian healthcare. 11 EPA datasets, 5,000+ factors, audit-ready provenance. Built for carbon consultants and health systems.',
};

const sources = [
  { name: 'EPA eGRID', detail: 'Scope 2 electricity — 26 US subregions' },
  { name: 'EPA GHG Emission Factors Hub', detail: 'Scope 1+2 combustion, mobile, refrigerants' },
  { name: 'EPA Supply Chain Factors', detail: 'Scope 3 spend-based — 1,016 NAICS commodities' },
  { name: 'EPA WARM', detail: 'Waste emission factors — 61 materials' },
  { name: 'IPCC AR6', detail: 'Anesthetic gases, refrigerant GWPs' },
  { name: 'ENERGY STAR Portfolio Manager', detail: 'Hospital energy benchmarks' },
  { name: 'EIA CBECS', detail: 'Hospital energy consumption survey' },
  { name: 'ECCC National Inventory Report', detail: 'Canadian Scope 1+2' },
  { name: 'CIRAIG OpenIO-Canada', detail: 'Canadian Scope 3 spend-based' },
  { name: 'HealthcareLCA', detail: '3,671 healthcare-specific emission values' },
  { name: 'DEFRA/DESNZ', detail: 'UK factors for gap-fill categories' },
];

const features = [
  { icon: Database, title: '11 authoritative sources', description: 'EPA, IPCC, ENERGY STAR, HealthcareLCA, and more — normalized into one consistent schema.' },
  { icon: Shield, title: 'Full provenance', description: 'Every factor traced to its source dataset, publication date, and methodology. Audit-ready from day one.' },
  { icon: Globe, title: 'US + Canada coverage', description: 'Regional specificity for 26 eGRID subregions plus Canadian national factors.' },
  { icon: Search, title: 'Healthcare-specific', description: 'Categorized by clinical pathway — anesthesia, OR supply chain, HVAC, waste streams, procurement.' },
  { icon: RefreshCw, title: 'Annual updates', description: 'Refreshed each January when EPA publishes new source data. Always current.' },
  { icon: FileSpreadsheet, title: 'Ready to use', description: 'Multi-sheet Excel workbook with All Factors, Healthcare Focus, Regional, Scope 1/2/3, and Provenance tabs.' },
];

const workbookSheets = [
  'All Factors — complete sorted reference',
  'Healthcare Focus — clinical category filtered',
  'Regional — 26 eGRID subregions + geo-specific factors',
  'Anesthetic Gases — desflurane, sevoflurane, N₂O',
  'Scope 1, 2, 3 — sorted by emission scope',
  'Sources & Provenance — full lineage table',
  'About CliniCarbon — metadata, methodology, license',
];

export default function CarbonPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-primary/80 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide">
                Edition 2026.1 — Updated March 2026
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                CliniCarbon
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-2 text-lg font-medium text-white/70">
                Healthcare Emission Factor Knowledge Base
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                11 EPA and government datasets. 5,000+ emission factors. Full provenance and audit trail.
                The definitive reference for healthcare carbon accounting.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
                >
                  View Pricing →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Request Sample
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border-subtle bg-white px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
          <FadeIn>
            <div>
              <p className="text-2xl font-extrabold text-navy">11</p>
              <p className="text-xs font-medium text-gray-400">Data Sources</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <p className="text-2xl font-extrabold text-navy">5,000+</p>
              <p className="text-xs font-medium text-gray-400">Emission Factors</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <p className="text-2xl font-extrabold text-navy">26</p>
              <p className="text-xs font-medium text-gray-400">US Subregions</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div>
              <p className="text-2xl font-extrabold text-navy">3</p>
              <p className="text-xs font-medium text-gray-400">Emission Scopes</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <Section className="bg-canvas">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="text-h4 font-bold text-neutral-900 md:text-h3">Why CliniCarbon</h2>
            <p className="mt-2 text-sm text-text-muted">One corpus. Every factor. Full lineage.</p>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="rounded-xl border border-border-subtle bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <feature.icon className="mb-3 text-primary" size={24} strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* What's Inside */}
      <Section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <h2 className="text-h4 font-bold text-neutral-900">What&apos;s in the workbook</h2>
              <p className="mt-3 text-sm text-text-muted">
                Multi-sheet Excel workbook with 7 curated views of the emission factor corpus.
                Every factor includes source citation, publication year, geographic scope, uncertainty notes, and healthcare category.
              </p>
              <ul className="mt-6 space-y-3">
                {workbookSheets.map((sheet) => (
                  <li key={sheet} className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={16} />
                    {sheet}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} direction="left">
            <div className="rounded-2xl border border-border-subtle bg-canvas p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Data Sources</p>
              <div className="space-y-3">
                {sources.map((source) => (
                  <div key={source.name} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-neutral-900">{source.name}</p>
                    <p className="text-xs text-text-muted">{source.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-canvas">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="text-h4 font-bold text-neutral-900 md:text-h3">Simple, transparent pricing</h2>
            <p className="mt-2 text-sm text-text-muted">Annual subscription. Updated every January. Cancel anytime.</p>
          </div>
        </FadeIn>
        <StaggerChildren className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          <StaggerItem>
            <div className="rounded-2xl border border-border-subtle bg-white p-8 transition-all duration-300 hover:shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Individual</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy">$750</span>
                <span className="text-sm text-text-muted">/year</span>
              </div>
              <p className="mt-3 text-sm text-text-muted">Single user license for consultants and individual practitioners.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Complete .xlsx workbook (7 sheets)
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Methodology PDF with citations
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Annual updates (January refresh)
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Single-user digital download
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 block rounded-md bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-navy/90"
              >
                Get Started →
              </Link>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="relative rounded-2xl border-2 border-primary bg-white p-8 transition-all duration-300 hover:shadow-card">
              <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                Most Popular
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Team</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy">$2,500</span>
                <span className="text-sm text-text-muted">/year</span>
              </div>
              <p className="mt-3 text-sm text-text-muted">Up to 5 seats for sustainability teams and consulting firms.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Everything in Individual
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Up to 5 user seats
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Email support for factor selection
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                  Team distribution rights
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 block rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-soft"
              >
                Get Started →
              </Link>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* CTA */}
      <FadeIn>
        <section className="bg-gradient-to-br from-navy to-primary px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-h4 font-bold md:text-h3">Stop assembling emission factors from scratch.</h2>
            <p className="mt-4 text-sm text-white/70">
              CliniCarbon gives your team the definitive healthcare carbon accounting reference — auditable, complete, and always current.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
              >
                Request a Sample →
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
