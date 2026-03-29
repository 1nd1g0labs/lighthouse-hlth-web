import Link from 'next/link';
import { Section } from '@/components/section';
import { KpiCard } from '@/components/kpi-card';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';
import { Clock, CheckSquare, DollarSign, Users } from 'lucide-react';

const kpis = [
  { value: '92%', label: 'Anesthetic gas reduction', detail: '$84K saved' },
  { value: '$220K', label: 'HVAC retrofit savings', detail: 'During wildfire events' },
  { value: '47%', label: 'Less hazardous waste', detail: 'Procurement shift' },
  { value: '8.5%', label: 'Hospital emissions share', detail: 'Often invisible to ops' },
];

const products = [
  {
    icon: CarbonIcon,
    tag: 'Carbon',
    title: 'Emission Factor Intelligence',
    description: 'Scientifically credible healthcare emission factors. CliniCarbon knowledge base with full lineage and audit trail.',
    subdomain: 'carbon.lighthousehlth.com',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    title: 'Facility Tracking & Reporting',
    description: 'Connect meters, invoices, and care data. Automated compliance reporting for CMS, Joint Commission, and state mandates.',
    subdomain: 'footprint.lighthousehlth.com',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    title: 'Decision Intelligence',
    description: 'ROI-ranked capital projects with incentive stacking. Surface the top five moves by emissions reduction and financial return.',
    subdomain: 'capital.lighthousehlth.com',
  },
];

const features = [
  { icon: Clock, title: 'End-to-end carbon accounting', description: 'Connect environmental and patient data for strategic insights.' },
  { icon: CheckSquare, title: 'Automated compliance generation', description: 'CMS, Joint Commission, state mandates — report-ready.' },
  { icon: DollarSign, title: 'Financial alignment', description: 'Sustainability efforts mapped to cost savings and ROI.' },
  { icon: Users, title: 'Cross-departmental collaboration', description: 'Facilities, clinical, finance — one shared view.' },
];

const expertiseTags = [
  'Healthcare carbon accounting architecture',
  'Pharmaceutical emissions (ECOVAMED)',
  '100+ hospital deployments',
  'Award-winning platform',
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            Healthcare Sustainability Platform
          </p>
          <h1 className="text-h3 font-bold md:text-h2">
            Your hospital&apos;s climate impact — now clinically actionable
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-body text-white/80">
            Reduce emissions, improve patient care, and save money — all from one integrated platform.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-md bg-primary-soft px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary">
              Schedule a Call
            </Link>
            <Link href="#whitepaper" className="rounded-md border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10">
              Download White Paper
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <Section className="bg-canvas">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
          Proven Results
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.value} {...kpi} />
          ))}
        </div>
      </Section>

      {/* Platform Products */}
      <Section id="platform" className="bg-white">
        <div className="mb-10 text-center">
          <h2 className="text-h4 font-bold text-neutral-900 md:text-h3">One platform. Three pillars.</h2>
          <p className="mt-2 text-body-sm text-text-muted">Full lifecycle sustainability intelligence for health systems.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.tag} className="rounded-xl border border-border-subtle p-6 text-center transition-shadow hover:shadow-card">
              <product.icon className="mx-auto mb-3 text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{product.tag}</p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">{product.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{product.description}</p>
              <p className="mt-4 text-xs font-semibold text-primary">{product.subdomain}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-canvas">
        <h2 className="mb-10 text-center text-h4 font-bold text-neutral-900 md:text-h3">
          Transforming climate data into actionable healthcare insights
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg bg-white p-6 text-center shadow-sm">
              <feature.icon className="mx-auto mb-3 text-primary" size={28} strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-primary">{feature.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Traction / Origin Story */}
      <Section className="border-t border-border-subtle bg-white">
        <div className="mb-8 grid text-center md:grid-cols-3">
          {['Trusted roots.', 'Proven experience.', 'A new chapter for US healthcare.'].map((text) => (
            <p key={text} className="py-2 text-xs font-bold uppercase tracking-widest text-primary">{text}</p>
          ))}
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-body-sm leading-relaxed text-neutral-700">
            Lighthouse HLTH evolves the foundation of an award-winning sustainability platform founded and architected by a team serving over 100 hospitals across Europe and Canada.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            From that experience, an opportunity was born — to bring the same precision, transparency, and ROI-driven sustainability tools to the U.S. healthcare system, where environmental and operational health are deeply intertwined.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {expertiseTags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary">{tag}</span>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <section className="bg-primary px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <blockquote className="text-lg italic leading-relaxed">
            &ldquo;Connecting climate metrics to patient care has revolutionized our sustainability strategy. The insights are clear and actionable.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-white/70">— Alex Morgan, Chief Environmental Officer</p>
        </div>
      </section>

      {/* Blog Preview */}
      <Section className="bg-canvas">
        <h2 className="mb-8 text-center text-h5 font-bold text-neutral-900">Latest Insights</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { slug: 'climate-and-health', title: 'Climate and Health', excerpt: 'The impact of climate on healthcare systems' },
            { slug: 'cutting-emissions', title: 'Cutting Emissions in Healthcare', excerpt: 'Methods to reduce emissions while enhancing care quality' },
            { slug: 'data-integration', title: 'Merging Environmental and Clinical Data', excerpt: 'Integrating environmental insights with healthcare data' },
          ].map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-lg border border-border-subtle bg-white transition-shadow hover:shadow-card">
              <div className="h-32 bg-neutral-200" />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-primary group-hover:text-primary-soft">{post.title}</h3>
                <p className="mt-1 text-xs text-text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h4 font-bold md:text-h3">Ready for clinically actionable sustainability?</h2>
          <p className="mt-4 text-body-sm text-white/80">
            Connect your meters, invoices, and care data — then surface the top five moves by ROI.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-neutral-100">
            Schedule a Call
          </Link>
        </div>
      </section>
    </>
  );
}
