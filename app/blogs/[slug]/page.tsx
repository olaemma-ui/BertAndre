import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { getBlogBySlug, getBlogs } from "@/lib/db";
import { format } from "date-fns";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogPost = await getBlogBySlug(slug);

  if (!blogPost) {
    return {
      title: "Post Not Found | BertAndre",
    };
  }

  return {
    title: blogPost.seo_title || `${blogPost.title} | BertAndre Blog`,
    description: blogPost.seo_description || blogPost.excerpt,
  };
}

export async function generateStaticParams() {
  const { blogs } = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogPost = await getBlogBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative -top-21">
        <PageHero
          title="Blog"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blogs" },
            { label: blogPost.title },
          ]}
        />

        <section className="pt-20 md:pt-28 bg-white">
          <div className="container mx-auto md:px-6 px-4 pb-20">
            <article className="max-w-3xl mx-auto">
              {blogPost.imageUrl && (
                <div className="mb-8 relative aspect-video overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                  <img
                    src={blogPost.imageUrl}
                    alt={blogPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}

              <div className="flex items-center gap-4 text-xs font-black tracking-[0.2em] uppercase text-[#1560bd] mb-6">
                <span>{format(new Date(blogPost.date), "MMMM dd, yyyy")}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>By {blogPost.author}</span>
                {blogPost.category && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{blogPost.category}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-gray-900 leading-tight">
                {blogPost.title}
              </h1>

              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-2 text-[#1560bd] font-black tracking-widest uppercase text-[10px] hover:translate-x-[-4px] transition-all"
                >
                  <span className="text-lg">←</span> Back to Blog
                </Link>

                <div className="flex gap-4">
                  {/* Placeholder for social share if needed */}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
