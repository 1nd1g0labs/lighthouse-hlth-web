import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/section';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { Database, Shield, RefreshCw, Globe, FileSpreadsheet, Tag, Layers, Stethoscope, CheckCircle, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CliniCarbon — Healthcare Emission Factor Reference | Lighthouse HLTH',
  description: '1,413 audit-ready emission factors from EPA eGRID, GHG Emission Factors Hub, and USEEIO Supply Chain Factors — curated, healthcare-tagged, and provenance-documented. Built for carbon consultants and health systems.',
  openGraph: {
    title: 'CliniCarbon — Healthcare Emission Factor Reference',
    description: '1,413 audit-ready emission factors. 11 EPA datasets. Full provenance. Built for healthcare carbon accounting.',
    type: 'website',
  },
};

const coreSources = [
  { name: 'EPA eGRID 2023', detail: 'Scope 2 electricity factors, 26 US subregions', version: 'Rev 2 (Jan 2025)' },
  { name: 'EPA GHG Emission Factors Hub', detail: 'Scope 1 combustion, mobile, refrigerants, GWPs', version: '2025 edition' },
  { name: 'EPA Supply Chain Factors', detail: '1,016 Scope 3 spend-based factors by NAICS-6', version: 'v1.3.0 (2022 data)' },
  { name: 'IPCC AR6 / Andersen et al.', detail: 'Anesthetic gas GWP values', version: 'Current' },
];

const allSources = [
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

const differentiators = [
  { icon: Tag, title: 'Healthcare category mapping', description: '60+ NAICS codes mapped to hospital-relevant categories. Know instantly which factors apply to Pharmaceuticals vs. Surgical Supplies vs. Anesthesia vs. Food Service.' },
  { icon: Shield, title: 'Regulatory framework tags', description: 'Every factor marked with which frameworks accept it: GHG Protocol, Colorado BPS (HB21-1286), California SB 253, Joint Commission, Practice Greenhealth, ENERGY STAR.' },
  { icon: Layers, title: 'Factor hierarchy guidance', description: 'When multiple factors match, we tell you which one to use and why. Geographic specificity beats temporal recency beats data quality tier.' },
  { icon: Stethoscope, title: 'Anesthetic gas quick-reference', description: 'The only emission factor reference with clinical context for desflurane, sevoflurane, isoflurane, and N₂O. Includes worked examples and reduction guidance.' },
  { icon: Database, title: 'Audit-ready provenance', description: 'Every factor traces to a specific source, version, table, and URL. Copy the citation into your inventory report appendix.' },
];

const workbookSheets = [
  { name: 'All Factors', detail: '1,413 emission factors across Scopes 1, 2, and 3' },
  { name: 'Healthcare Focus', detail: '287 factors tagged to healthcare categories (Pharmaceuticals, Medical Devices, Anesthesia, Hospital Operations)' },
  { name: 'Colorado & Regional', detail: 'eGRID subregion factors for location-specific Scope 2' },
  { name: 'Anesthetic Gases', detail: 'Desflurane, Sevoflurane, Isoflurane, N₂O — GWPs with clinical guidance' },
  { name: 'Scope 1 / 2 / 3', detail: 'Pre-filtered by scope for workflow convenience' },
  { name: 'Sources & Provenance', detail: 'Full citation chain: source, version, data year, URL' },
  { name: 'About', detail: 'Edition metadata, publisher, update policy' },
];

const audiences = [
  { label: 'Carbon consultants', detail: 'serving US healthcare systems — stop maintaining your own spreadsheet' },
  { label: 'Hospital sustainability officers', detail: 'verify your consultant\'s factor selection against an independent reference' },
  { label: 'Practice Greenhealth members', detail: 'complement the Climate Impact Checkup with detailed factor provenance' },
  { label: 'Compliance teams', detail: 'document factor selection for Colorado BPS, SB 253, and Joint Commission audits' },
];

const faqs = [
  { q: 'How is this different from downloading EPA data myself?', a: 'You could download eGRID, the GHG Hub, and Supply Chain Factors separately. CliniCarbon saves you that work and adds healthcare category mapping, regulatory framework tags, factor hierarchy guidance, anesthetic gas clinical context, and per-factor provenance metadata that don\'t exist in the raw data.' },
  { q: 'What regulatory frameworks does this support?', a: 'GHG Protocol Corporate Standard, Colorado Building Performance Standards (HB21-1286), California SB 253, Joint Commission Sustainable Healthcare Certification, Practice Greenhealth / Climate Impact Checkup, and ENERGY STAR Portfolio Manager.' },
  { q: 'How often is it updated?', a: 'Annually, aligned with EPA\'s January publication cycle for eGRID and the GHG Emission Factors Hub. Supply Chain Factors are updated when EPA/Cornerstone releases new versions.' },
  { q: 'Can I use this for non-US hospitals?', a: 'The current edition covers US facilities only (EPA sources + eGRID subregions). Canadian and international editions are planned.' },
  { q: 'Is there an API?', a: 'Not yet. An API with semantic search and programmatic access is planned for later in 2026. Reference subscribers will get priority access.' },
  { q: 'Who built this?', a: 'CliniCarbon is published by Lighthouse HLTH, founded by Nicolas Vinson. Nick previously built and exited shadow.eco, a carbon accounting SaaS bootstrapped in France and Quebec.' },
];

const LS_INDIVIDUAL_URL = 'https://lighthousehlth.lemonsqueezy.com/checkout/buy/e18d1771-2464-435d-a082-43009044f595';
const LS_TEAM_URL = 'https://lighthousehlth.lemonsqueezy.com/checkout/buy/6ace11cc-b01a-4dcc-9414-60fb66248eb0';

export default function CarbonPage() {
  return (
    <>
      {/* Lemon Squeezy overlay checkout */}
      <script src="https://assets.lemonsqueezy.com/lemon.js" defer />

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
              <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                The emission factor reference built for healthcare carbon accounting.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                1,413 audit-ready emission factors from EPA eGRID, GHG Emission Factors Hub, and USEEIO Supply Chain Factors — curated, healthcare-tagged, and provenance-documented in a single workbook.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={LS_INDIVIDUAL_URL}
                  className="lemonsqueezy-button inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
                >
                  Get the 2026 Reference — $750/year
                </a>
                <Link
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  See Pricing
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border-subtle bg-white px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
          {[
            { value: '1,413', label: 'Emission Factors' },
            { value: '287', label: 'Healthcare-Specific' },
            { value: '26', label: 'US Subregions' },
            { value: '11', label: 'Data Sources' },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p className="font-display text-2xl font-bold text-navy">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Problem */}
      <Section className="bg-canvas">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">
              You&apos;re assembling emission factors from scratch. Every. Single. Engagement.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-text-muted sm:text-base">
              Healthcare GHG inventories require emission factors from at least 3 EPA datasets, each in a different format, with different update cadences, and no healthcare-specific categorization. You download eGRID for electricity. The GHG Hub for combustion. Supply Chain Factors for Scope 3 procurement. Then you manually reconcile units, match NAICS codes to hospital departments, and pray your factor selection holds up in audit.
            </p>
            <p className="mt-4 text-sm font-medium text-primary sm:text-base">
              CliniCarbon does that work once, rigorously, and delivers it as a single annual reference you can trust.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Differentiators */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">What you get that raw EPA data doesn&apos;t give you.</h2>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <StaggerItem key={d.title}>
              <div className="rounded-xl border border-border-subtle bg-canvas p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <d.icon className="mb-3 text-primary" size={24} strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-neutral-900">{d.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{d.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* What's Inside — Workbook + Sources */}
      <Section className="bg-canvas">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <FadeIn>
            <div>
              <h2 className="font-display text-h4 font-semibold text-neutral-900">One workbook. Nine sheets. Full provenance.</h2>
              <p className="mt-3 text-sm text-text-muted">
                Every factor includes source citation, publication year, geographic scope, uncertainty notes, and healthcare category.
                Plus a 4,400-word methodology document covering source selection rationale, factor hierarchy, unit conventions, and regulatory framework mapping.
              </p>
              <ul className="mt-6 space-y-3">
                {workbookSheets.map((sheet) => (
                  <li key={sheet.name} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={16} />
                    <div>
                      <span className="text-sm font-medium text-neutral-900">{sheet.name}</span>
                      <span className="text-sm text-text-muted"> — {sheet.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} direction="left">
            <div>
              <h3 className="mb-4 text-sm font-bold text-neutral-900">Built on the same EPA data the industry trusts.</h3>
              <p className="mb-6 text-xs leading-relaxed text-text-muted">
                CliniCarbon draws from the same sources cited by the Eckelman et al. (2020) study in Health Affairs that established US healthcare at 8.5% of national emissions, embedded in Practice Greenhealth&apos;s Climate Impact Checkup tool used by 493+ hospitals.
              </p>
              <div className="rounded-2xl border border-border-subtle bg-white p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Core Sources</p>
                <div className="space-y-3">
                  {coreSources.map((source) => (
                    <div key={source.name} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-neutral-900">{source.name}</p>
                        <span className="shrink-0 text-[10px] text-text-muted">{source.version}</span>
                      </div>
                      <p className="text-xs text-text-muted">{source.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-text-muted">
                  + 7 additional sources including EPA WARM, ENERGY STAR, EIA CBECS, ECCC, CIRAIG, HealthcareLCA, and DEFRA/DESNZ.
                  Every factor carries: source dataset, version, data year, publication year, URL, peer review status, and regulatory framework tags.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Who It's For */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-h4 font-semibold text-neutral-900 md:text-h3">
              For consultants who bill by the hour and can&apos;t afford to waste it on data assembly.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {audiences.map((a) => (
                <div key={a.label} className="rounded-lg border border-border-subtle p-5">
                  <p className="text-sm font-semibold text-navy">{a.label}</p>
                  <p className="mt-1 text-sm text-text-muted">{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-canvas">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">Annual reference subscription</h2>
            <p className="mt-2 text-sm text-text-muted">Updated annually when EPA publishes new data. Each edition is versioned. Previous editions remain available for base year recalculation.</p>
          </div>
        </FadeIn>
        <StaggerChildren className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          <StaggerItem>
            <div className="flex h-full flex-col rounded-2xl border border-border-subtle bg-white p-8 transition-all duration-300 hover:shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Individual</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy">$750</span>
                <span className="text-sm text-text-muted">/year</span>
              </div>
              <p className="mt-3 text-sm text-text-muted">Single user license for consultants and individual practitioners.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {['Complete .xlsx workbook (9 sheets)', 'Methodology PDF with citations', 'Annual updates (January refresh)', 'Single-user digital download'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={LS_INDIVIDUAL_URL}
                className="lemonsqueezy-button mt-8 block rounded-md bg-navy px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-navy/90"
              >
                Get Started →
              </a>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="relative flex h-full flex-col rounded-2xl border-2 border-primary bg-white p-8 transition-all duration-300 hover:shadow-card">
              <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                Most Popular
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Team</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy">$2,500</span>
                <span className="text-sm text-text-muted">/year</span>
              </div>
              <p className="mt-3 text-sm text-text-muted">Up to 5 seats for sustainability teams and consulting firms.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {['Everything in Individual', 'Up to 5 user seats', 'Email support for factor selection', 'Team distribution rights'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle className="mt-0.5 shrink-0 text-primary" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={LS_TEAM_URL}
                className="lemonsqueezy-button mt-8 block rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-soft"
              >
                Get Started →
              </a>
            </div>
          </StaggerItem>
        </StaggerChildren>
        <p className="mt-6 text-center text-xs text-text-muted">
          At ~$62/month, CliniCarbon pays for itself with one client engagement. If it saves 2 hours of factor sourcing, you&apos;re ahead.
        </p>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <FadeIn>
          <h2 className="mb-8 text-center font-display text-h4 font-semibold text-neutral-900">Frequently asked questions</h2>
        </FadeIn>
        <div className="mx-auto max-w-2xl divide-y divide-border-subtle">
          {faqs.map((faq) => (
            <FadeIn key={faq.q}>
              <div className="py-5">
                <h3 className="text-sm font-semibold text-neutral-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-text-muted">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <FadeIn>
        <section className="bg-gradient-to-br from-navy to-primary px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-h4 font-semibold md:text-h3">Stop assembling emission factors from scratch.</h2>
            <p className="mt-4 text-sm text-white/70">
              CliniCarbon gives your team the definitive healthcare carbon accounting reference — auditable, complete, and always current.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={LS_INDIVIDUAL_URL}
                className="lemonsqueezy-button inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
              >
                Get the 2026 Reference →
              </a>
              <Link
                href="mailto:nick@lighthousehlth.com"
                className="inline-flex h-12 items-center justify-center text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Questions? nick@lighthousehlth.com
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
