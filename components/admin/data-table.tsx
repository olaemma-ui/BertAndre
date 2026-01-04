"use client"

import * as React from "react"
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    X,
    Loader2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface DataTableProps<T> {
    data: T[]
    columns: {
        header: string
        accessorKey: keyof T | string
        cell?: (item: T) => React.ReactNode
    }[]
    loading?: boolean
    totalCount: number
    currentPage: number
    onPageChange: (page: number) => void
    onSearch?: (value: string) => void
    onDateFilter?: (start: string, end: string) => void
    emptyMessage?: string
}

export function DataTable<T>({
    data,
    columns,
    loading,
    totalCount,
    currentPage,
    onPageChange,
    onSearch,
    onDateFilter,
    emptyMessage = "No data found."
}: DataTableProps<T>) {
    const [searchValue, setSearchValue] = React.useState("")
    const itemsPerPage = 10
    const totalPages = Math.ceil(totalCount / itemsPerPage)

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch?.(searchValue)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pl-11"
                    />
                    {searchValue && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchValue("")
                                onSearch?.("")
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </form>

                <div className="flex items-center gap-2">
                    {/* Date filter could go here or as a separate component */}
                    <Button variant="outline" size="sm" className="h-12 rounded-xl">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        {columns.map((_, j) => (
                                            <td key={j} className="px-6 py-4">
                                                <Skeleton className="h-4 w-3/4" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {data.map((item, idx) => (
                                        <motion.tr
                                            key={(item as any).id || (item as any).slug || idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                                            className="hover:bg-gray-50/50 transition-colors group"
                                        >
                                            {columns.map((col, j) => (
                                                <td key={j} className="px-6 py-4 text-sm text-gray-600">
                                                    {col.cell ? col.cell(item) : (item[col.accessorKey as keyof T] as any)}
                                                </td>
                                            ))}
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                            {!loading && data.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-20 text-center">
                                        <p className="text-gray-400 font-medium">{emptyMessage}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{Math.min((currentPage - 1) * itemsPerPage + 1, totalCount)}</span> to{" "}
                        <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, totalCount)}</span> of{" "}
                        <span className="font-semibold text-gray-900">{totalCount}</span> results
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className="rounded-lg h-9 w-9"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "ghost"}
                                size="sm"
                                onClick={() => onPageChange(page)}
                                className={`h-9 w-9 rounded-lg ${currentPage === page ? "shadow-md" : ""}`}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="rounded-lg h-9 w-9"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
