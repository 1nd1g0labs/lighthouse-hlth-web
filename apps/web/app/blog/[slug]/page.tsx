import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPost } from '@/lib/blog';
import { Section } from '@/components/section';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Section className="bg-white">
      <article className="mx-auto max-w-2xl">
        <p className="text-xs text-neutral-400">{post.date} &middot; {post.readTime}</p>
        <h1 className="mt-2 font-display text-h3 font-bold text-neutral-900">{post.title}</h1>
        <p className="mt-4 text-body text-text-muted">{post.excerpt}</p>

        <div className="mt-8">
          {post.content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return <h2 key={i} className="mt-8 mb-4 text-h5 font-bold text-neutral-900">{block.replace('## ', '')}</h2>;
            }
            if (block.trim() === '') return null;
            return <p key={i} className="mb-4 text-body leading-relaxed text-text-secondary">{block}</p>;
          })}
        </div>
      </article>
    </Section>
  );
}
