import { getProjects, getBlogs, getServices } from "@/lib/db";
import { FolderKanban, FileText, Briefcase } from "lucide-react";

export default async function AdminDashboard() {
    const [
        { count: projectsCount },
        { count: blogsCount },
        { count: servicesCount }
    ] = await Promise.all([
        getProjects(),
        getBlogs(),
        getServices(),
    ]);

    const stats = [
        {
            label: "Total Projects",
            value: projectsCount,
            icon: FolderKanban,
            color: "blue",
            description: "Active items in portfolio",
        },
        {
            label: "Blog Posts",
            value: blogsCount,
            icon: FileText,
            color: "purple",
            description: "Published articles",
        },
        {
            label: "Services",
            value: servicesCount,
            icon: Briefcase,
            color: "green",
            description: "Service offerings",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif text-gray-900 mb-8">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const colorClasses = {
                        blue: "bg-blue-50 text-[#1560bd]",
                        purple: "bg-purple-50 text-purple-600",
                        green: "bg-green-50 text-green-600",
                    }[stat.color];

                    return (
                        <div
                            key={stat.label}
                            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                                <span className={`p-2 rounded-lg ${colorClasses}`}>
                                    <Icon className="w-5 h-5" />
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-gradient-to-r from-[#1560bd] to-blue-600 rounded-xl p-8 text-white">
                <h2 className="text-xl font-bold mb-2">Welcome to BertAndre Admin</h2>
                <p className="text-blue-100">
                    Manage your projects, blog posts, and services all in one place. All data is stored securely in Supabase.
                </p>
            </div>
        </div>
    );
}
