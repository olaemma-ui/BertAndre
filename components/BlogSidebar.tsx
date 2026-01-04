import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogCategory } from "@/lib/db";

interface BlogSidebarProps {
  categories: BlogCategory[];
  currentCategory?: string;
}

export default function BlogSidebar({ categories, currentCategory }: BlogSidebarProps) {
  return (
    <aside className="space-y-10">
      {/* SEARCH */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Search Here</h3>

        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 border px-4 py-3 rounded-l-md text-sm"
          />
          <button className="bg-amber-300 px-4 rounded-r-md">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6">Category</h3>

        <ul className="space-y-4">
          <li>
            <Link
              href="/blogs"
              className={`flex justify-between items-center text-sm ${!currentCategory ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-black'} cursor-pointer`}
            >
              All Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/blogs?category=${encodeURIComponent(cat.name)}`}
                className={`flex justify-between items-center text-sm ${currentCategory === cat.name ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-black'} cursor-pointer`}
              >
                {cat.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
