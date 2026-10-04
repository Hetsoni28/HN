import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getPosts, getRelatedPosts } from '@/lib/content';
import { ArticleHero, ArticleBody } from '@/components/organisms/article-sections';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/molecules/structured-data';

/* ── Static params ── */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug.current }));
}

/* ── SEO ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
  };
}

/* ── Page ── */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post._id, post.category);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hntech.in';

  return (
    <article>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${SITE_URL}/insights/${post.slug.current}`}
        publishedAt={post.publishedAt}
        authorName={post.author?.name}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Insights', url: `${SITE_URL}/insights` },
        { name: post.title, url: `${SITE_URL}/insights/${post.slug.current}` },
      ]} />
      <ArticleHero post={post} />
      <ArticleBody post={post} related={related} />
    </article>
  );
}
