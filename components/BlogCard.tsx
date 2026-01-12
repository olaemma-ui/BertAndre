import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import CloudinaryImage from "@/components/ui/cloudinary-image";

export default function BlogCard({ blog }: any) {
  return (
    <article className="space-y-6">
      <div className="relative h-[420px] rounded-xl overflow-hidden">
        <CloudinaryImage
          src={blog.imageUrl || "/placeholder.jpg"}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="text-2xl md:text-3xl font-serif text-gray-900">{blog.title}</h2>

      <div className="flex flex-wrap gap-4 text-xs font-black tracking-widest uppercase text-gray-400">
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {blog.date}
        </span>
        <span className="inline-flex items-center gap-1">
          <User className="w-4 h-4" />
          {blog.author}
        </span>
        {blog.category && (
          <span className="inline-flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {blog.category}
          </span>
        )}
      </div>

      <p className="text-gray-600 leading-relaxed line-clamp-3">{blog.excerpt}</p>

      <Link
        href={`/blogs/${blog.slug}`}
        className="group inline-flex items-center gap-2 bg-[#1560bd] text-white px-8 py-3 rounded-full hover:bg-[#1560bd]/90 transition shadow-lg shadow-blue-500/20"
      >
        Read More
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
