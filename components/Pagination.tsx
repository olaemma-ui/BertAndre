import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  category,
}: {
  currentPage: number;
  totalPages: number;
  category?: string;
}) {
  return (
    <div className="flex justify-center gap-3 pt-10">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;

        const query = new URLSearchParams({ page: page.toString() });
        if (category) query.set("category", category);

        return (
          <Link
            key={page}
            href={`/blogs?${query.toString()}`}
            className={`h-10 w-10 flex items-center justify-center rounded-full text-sm ${currentPage === page
                ? "bg-[#1560bd] text-white"
                : "border hover:bg-gray-100"
              }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
