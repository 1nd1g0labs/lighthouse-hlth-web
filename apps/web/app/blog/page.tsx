import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Editorial',
  description: 'Research, analysis, and perspectives on healthcare carbon accounting and sustainability.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Section className="bg-white">
      <h1 className="font-display text-h3 font-bold text-neutral-900">Editorial</h1>
      <p className="mt-2 text-body-sm text-text-muted">
        Research, analysis, and perspectives on healthcare carbon accounting and sustainability.
      </p>

      <div className="mt-10 divide-y divide-border-subtle">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-6">
            <p className="text-xs text-neutral-400">{post.date} &middot; {post.readTime}</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-neutral-900 group-hover:text-primary">{post.title}</h2>
            <p className="mt-1 text-sm text-text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
