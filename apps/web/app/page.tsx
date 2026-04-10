import Link from 'next/link';
import { Section } from '@/components/section';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';
import { Database, Shield, Layers, Stethoscope } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';

const cliniCarbonStats = [
  { value: '1,413', label: 'Emission Factors' },
  { value: '11', label: 'EPA Sources' },
  { value: '287', label: 'Healthcare-Specific' },
  { value: '2026.1', label: 'Edition' },
];

const differentiators = [
  {
    icon: Layers,
    title: 'Healthcare category mapping',
    description: '60+ NAICS codes mapped to hospital-relevant categories — Pharmaceuticals, Surgical Supplies, Anesthesia, Food Service.',
  },
  {
    icon: Shield,
    title: 'Regulatory framework tags',
    description: 'Every factor marked for GHG Protocol, Colorado HB21-1286, SB 253, Joint Commission, Practice Greenhealth.',
  },
  {
    icon: Database,
    title: 'Audit-ready provenance',
    description: 'Every factor traces to a specific source, version, table, and URL. Copy the citation into your inventory report appendix.',
  },
  {
    icon: Stethoscope,
    title: 'Anesthetic gas quick-reference',
    description: 'The only emission factor reference with clinical context for desflurane, sevoflurane, isoflurane, and N\u2082O.',
  },
];

const products = [
  {
    icon: CarbonIcon,
    tag: 'CliniCarbon',
    title: 'Emission Factor Intelligence',
    status: 'Live',
    statusColor: 'bg-emerald-500',
    description: '1,413 audit-ready healthcare emission factors. Full provenance, healthcare-tagged, regulatory framework mapping.',
    href: '/carbon',
    color: 'text-product-carbon',
    borderColor: 'border-product-carbon/20',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    title: 'Facility Tracking & Reporting',
    status: 'In development',
    statusColor: 'bg-product-footprint',
    description: 'Connect meters, invoices, and care data. Automated compliance reporting for CMS, Joint Commission, and state mandates.',
    href: '/#platform',
    color: 'text-product-footprint',
    borderColor: 'border-product-footprint/20',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    title: 'Decision Intelligence',
    status: 'Coming',
    statusColor: 'bg-product-capital',
    description: 'ROI-ranked capital projects with incentive stacking. Surface the top five moves by emissions reduction and financial return.',
    href: '/#platform',
    color: 'text-product-capital',
    borderColor: 'border-product-capital/20',
  },
];

const LS_INDIVIDUAL_URL = 'https://lighthousehlth.lemonsqueezy.com/checkout/buy/e18d1771-2464-435d-a082-43009044f595';

export default function Home() {
  return (
    <>
      {/* Hero — lead with CliniCarbon */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-primary/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80">
                Edition 2026.1 — Updated March 2026
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                The definitive emission factor reference for healthcare carbon accounting.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                1,413 audit-ready factors from 11 EPA datasets — curated, healthcare-tagged, and provenance-documented. Built on the same data foundation as the Eckelman et al. study that established US healthcare at 8.5% of national emissions.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={LS_INDIVIDUAL_URL}
                  className="lemonsqueezy-button inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
                >
                  Get CliniCarbon — $750/year
                </a>
                <Link
                  href="/#platform"
                  className="inline-flex h-12 items-center text-sm font-medium text-white/60 underline underline-offset-4 transition-colors hover:text-white"
                >
                  See what we're building →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Lemon Squeezy overlay checkout */}
      <script src="https://assets.lemonsqueezy.com/lemon.js" defer />

      {/* Stats bar */}
      <section className="border-b border-border-subtle bg-white px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
          {cliniCarbonStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p className="font-display text-2xl font-bold text-navy">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What's Inside — CliniCarbon differentiators */}
      <Section className="bg-canvas">
        <FadeIn>
          <div className="mb-10">
            <h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">
              What you get that raw EPA data doesn&apos;t give you.
            </h2>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <StaggerItem key={d.title}>
              <div
                className={`rounded-xl border border-border-subtle p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  i === 0 ? 'bg-navy text-white' : 'bg-white'
                }`}
              >
                <d.icon
                  className={i === 0 ? 'mb-3 text-primary-soft' : 'mb-3 text-primary'}
                  size={24}
                  strokeWidth={1.5}
                />
                <h3 className={`text-sm font-semibold ${i === 0 ? 'text-white' : 'text-neutral-900'}`}>
                  {d.title}
                </h3>
                <p className={`mt-2 text-sm ${i === 0 ? 'text-white/70' : 'text-text-muted'}`}>
                  {d.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/carbon"
              className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-soft"
            >
              See full workbook contents and pricing →
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Building the Full Stack — platform roadmap */}
      <Section id="platform" className="bg-white">
        <FadeIn>
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Building the full stack</p>
            <h2 className="mt-2 font-display text-h4 font-semibold text-neutral-900 md:text-h3">
              From emission factors to funded capital projects.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-text-muted">
              CliniCarbon is the data foundation. Facility tracking and capital decision support are next — a complete sustainability intelligence stack for health systems.
            </p>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.tag}>
              <Link
                href={product.href}
                className={`block rounded-xl border ${product.borderColor} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <product.icon className={product.color} size={28} />
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${product.statusColor}`}>
                    {product.status}
                  </span>
                </div>
                <p className={`mt-4 text-xs font-bold uppercase tracking-widest ${product.color}`}>
                  {product.tag}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-neutral-900">{product.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{product.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Credibility — Eckelman citation + founder origin */}
      <FadeIn>
        <section className="bg-navy px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <blockquote className="font-display text-lg font-semibold leading-relaxed sm:text-xl">
              US healthcare is responsible for 8.5% of national greenhouse gas emissions — more than the entire agriculture sector.
            </blockquote>
            <p className="mt-4 text-xs text-white/50">
              Eckelman et al., <em>Health Affairs</em>, 2020
            </p>
            <div className="mx-auto mt-8 h-px w-12 bg-white/20" />
            <p className="mt-8 text-sm leading-relaxed text-white/60">
              &ldquo;Lighthouse HLTH exists to give the people reducing that number better tools.&rdquo;
            </p>
            <p className="mt-2 text-xs text-white/40">
              — Nicolas Vinson, Founder
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Origin story */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Trusted roots</p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Founded by Nicolas Vinson, who bootstrapped shadow.eco to 100+ hospitals across Europe and Canada. Lighthouse HLTH brings that operational depth to US healthcare, starting with the data layer.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Blog Preview */}
      <Section className="bg-canvas">
        <FadeIn>
          <h2 className="mb-8 font-display text-h5 font-semibold text-neutral-900">
            Latest from the editorial
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {getAllPosts().slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-border-subtle bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="p-5">
                  <p className="text-[10px] font-medium text-text-muted">{post.date}</p>
                  <h3 className="mt-1 text-sm font-semibold text-neutral-900 group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Final CTA */}
      <FadeIn>
        <section className="bg-gradient-to-br from-navy to-primary/80 px-6 py-20 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-h4 font-semibold md:text-h3">
              Stop assembling emission factors from scratch.
            </h2>
            <p className="mt-4 text-sm text-white/60">
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
                href="/contact"
                className="inline-flex h-12 items-center text-sm font-medium text-white/60 transition-colors hover:text-white"
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
