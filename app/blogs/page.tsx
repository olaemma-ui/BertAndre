import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import BlogCard from "@/components/BlogCard";
import BlogSidebar from "@/components/BlogSidebar";
import Pagination from "@/components/Pagination";
import { getBlogs, getBlogCategories } from "@/lib/db";

const BLOGS_PER_PAGE = 5;

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { page, category } = await searchParams;
    const currentPage = Number(page) || 1;
    const offset = (currentPage - 1) * BLOGS_PER_PAGE;

    const [{ blogs: blogPosts, count: totalBlogs }, categories] = await Promise.all([
        getBlogs({ limit: BLOGS_PER_PAGE, offset, category }),
        getBlogCategories()
    ]);

    const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="relative -top-21">
                <PageHero
                    title={category ? `Blog: ${category}` : "Our Insights"}
                    description="Exploring the intersection of strategy, design, and technology."
                    breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
                />

                <section className="pt-20 md:pt-28 bg-white">
                    <div className="container mx-auto md:px-6 px-4 pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">
                            {/* BLOG LIST */}
                            <div className="space-y-24">
                                {blogPosts.length > 0 ? (
                                    <>
                                        {blogPosts.map((blog) => (
                                            <BlogCard key={blog.slug || blog.id} blog={blog} />
                                        ))}
                                        {totalPages > 1 && (
                                            <Pagination currentPage={currentPage} totalPages={totalPages} category={category} />
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 font-medium">No blog posts found for this selection.</p>
                                    </div>
                                )}
                            </div>

                            {/* SIDEBAR */}
                            <div className="hidden lg:block">
                                <BlogSidebar categories={categories} currentCategory={category} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
