import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Colorado Playbook',
  description: 'Sustainability intelligence for Colorado health systems — regulatory compliance, wildfire resilience, and incentive stacking.',
};

const pressures = [
  {
    title: 'Regulatory Mandate',
    color: 'border-t-critical',
    textColor: 'text-critical',
    description: 'HB21-1266 GHG reporting requirements. State-level climate accountability for large emitters including health systems.',
  },
  {
    title: 'Wildfire & Climate Risk',
    color: 'border-t-amber',
    textColor: 'text-amber',
    description: 'Increasing operational disruption. HVAC, air quality, and facility resilience under growing pressure from wildfire seasons.',
  },
  {
    title: 'Incentive Landscape',
    color: 'border-t-sustainability',
    textColor: 'text-sustainability',
    description: 'Federal IRA credits and Colorado state rebates create significant capital project incentive stacking opportunities.',
  },
];

const coloradoProducts = [
  {
    icon: CarbonIcon,
    tag: 'Carbon',
    description: 'HB21-1266 compliant emission factors. Audit-ready GHG inventory with full data lineage.',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    description: 'Automated facility tracking. CMS and Joint Commission compliance reporting.',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    description: 'IRA + Colorado state rebate stacking. ROI-ranked project prioritization.',
  },
];

const faqs = [
  {
    q: 'How does Lighthouse HLTH handle HB21-1266 reporting?',
    a: 'Our Carbon module provides emission factors aligned with Colorado state requirements. The Footprint module automates data collection and generates audit-ready reports in the format regulators expect.',
  },
  {
    q: 'What kind of savings can Colorado health systems expect?',
    a: 'Results vary by facility size and current efficiency. Across our 100+ hospital deployments, we have seen 15-20% operational cost reduction in the first year through energy optimization, waste reduction, and procurement improvements.',
  },
  {
    q: 'How do you handle incentive stacking?',
    a: 'The Capital module identifies all applicable federal (IRA) and Colorado state incentives for each capital project, then ranks projects by combined ROI from emissions reduction, cost savings, and incentive capture.',
  },
  {
    q: 'What data do you need to get started?',
    a: '12-24 months of utility bills, waste hauling invoices, and basic facility data. We handle the data integration — most health systems are operational within 30 days.',
  },
];

export default function ColoradoPlaybook() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">Colorado Healthcare</p>
          <h1 className="text-h3 font-bold md:text-h2">Sustainability Intelligence for Colorado Health Systems</h1>
          <p className="mx-auto mt-4 max-w-xl text-body text-white/80">
            Colorado&apos;s regulatory landscape demands action. Our platform gives you the tools to comply, reduce costs, and lead.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-neutral-100">Start Free Assessment</Link>
            <Link href="#" className="rounded-md border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10">Download CFO&apos;s Guide</Link>
          </div>
        </div>
      </section>

      {/* Why Colorado, Why Now */}
      <Section className="bg-canvas">
        <h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">Why Colorado, Why Now</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pressures.map((item) => (
            <div key={item.title} className={`rounded-lg border-t-2 ${item.color} bg-white p-6 text-center shadow-sm`}>
              <p className={`text-sm font-semibold ${item.textColor}`}>{item.title}</p>
              <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Platform for Colorado */}
      <Section className="bg-white">
        <h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">The Lighthouse Platform for Colorado</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {coloradoProducts.map((product) => (
            <div key={product.tag} className="rounded-xl border border-border-subtle p-6 text-center">
              <product.icon className="mx-auto mb-3 text-primary" size={28} />
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{product.tag}</p>
              <p className="mt-3 text-sm text-text-muted">{product.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-canvas">
        <h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-2xl divide-y divide-border-subtle">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <h3 className="text-sm font-semibold text-neutral-900">{faq.q}</h3>
              <p className="mt-2 text-sm text-text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h4 font-bold">Ready to lead Colorado&apos;s healthcare sustainability transformation?</h2>
          <Link href="/contact" className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-neutral-100">Schedule Discovery Call</Link>
        </div>
      </section>
    </>
  );
}
