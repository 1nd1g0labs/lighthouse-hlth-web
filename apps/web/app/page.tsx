import Link from 'next/link';
import { Section } from '@/components/section';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';
import { Clock, CheckSquare, DollarSign, Users } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { CapitalCard } from '@/components/capital-card';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';

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
  'Pharmaceutical emissions expertise',
  '100+ hospital deployments',
  'Award-winning platform',
];

const heroStats = [
  { value: '$67K', label: 'Avg savings (CAH)', aria: '67 thousand dollars average annual savings for critical access hospitals' },
  { value: '18 mo', label: 'ROI payback', aria: '18 month return on investment payback period' },
  { value: '1-click', label: 'HB21-1286', aria: 'One click H B 21 1286 compliance reporting' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-teal-50/30 to-teal-100/20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          {/* Left: Copy */}
          <div>
            <FadeIn>
              <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Colorado Healthcare Sustainability
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                15–20% margin improvement.{' '}
                <span className="text-primary">Compliance built in.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 lg:text-base">
                Platform access included. Audit-ready reporting. Outcome-based pricing that shares your risk.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-soft"
                >
                  Calculate Your ROI →
                </Link>
                <Link
                  href="/colorado-playbook"
                  className="inline-flex h-11 items-center text-sm font-medium text-navy underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Colorado Playbook ↗
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap items-start gap-x-6 gap-y-4" role="list" aria-label="Key performance metrics">
                {heroStats.map((stat, i) => (
                  <div key={stat.value} className="flex items-start gap-6" role="listitem" aria-label={stat.aria}>
                    {i > 0 && <div className="hidden h-10 w-px bg-gray-200 sm:block" aria-hidden="true" />}
                    <div>
                      <p className="text-lg font-extrabold text-navy sm:text-xl">{stat.value}</p>
                      <p className="text-[10px] font-medium text-gray-400 sm:text-xs">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Product Card */}
          <FadeIn delay={0.2} direction="left" className="lg:pl-4">
            <CapitalCard />
          </FadeIn>
        </div>
      </section>

      {/* Platform Products */}
      <Section id="platform" className="bg-white">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="text-h4 font-bold text-neutral-900 md:text-h3">One platform. Three pillars.</h2>
            <p className="mt-2 text-body-sm text-text-muted">Full lifecycle sustainability intelligence for health systems.</p>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.tag}>
              <div className="rounded-xl border border-border-subtle p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <product.icon className="mx-auto mb-3 text-primary" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{product.tag}</p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{product.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{product.description}</p>
                <p className="mt-4 text-xs font-semibold text-primary">{product.subdomain}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Features */}
      <Section className="bg-canvas">
        <FadeIn>
          <h2 className="mb-10 text-center text-h4 font-bold text-neutral-900 md:text-h3">
            Transforming climate data into actionable healthcare insights
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <feature.icon className="mx-auto mb-3 text-primary" size={28} strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-primary">{feature.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Traction / Origin Story */}
      <Section className="border-t border-border-subtle bg-white">
        <FadeIn>
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
        </FadeIn>
      </Section>

      {/* Testimonial */}
      <FadeIn>
        <section className="bg-primary px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <blockquote className="text-lg italic leading-relaxed">
              &ldquo;Connecting climate metrics to patient care has revolutionized our sustainability strategy. The insights are clear and actionable.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-white/70">— Alex Morgan, Chief Environmental Officer</p>
          </div>
        </section>
      </FadeIn>

      {/* Blog Preview */}
      <Section className="bg-canvas">
        <FadeIn>
          <h2 className="mb-8 text-center text-h5 font-bold text-neutral-900">Latest Insights</h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {getAllPosts().slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-lg border border-border-subtle bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="h-32 bg-neutral-200" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-primary group-hover:text-primary-soft">{post.title}</h3>
                  <p className="mt-1 text-xs text-text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Final CTA */}
      <FadeIn>
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
      </FadeIn>
    </>
  );
}
