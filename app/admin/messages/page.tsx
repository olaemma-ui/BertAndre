"use client"

import { useState, useEffect } from "react"
import { DataTable } from "@/components/admin/data-table"
import { ContactMessage } from "@/lib/db"
import { toast } from "sonner"
import {
    CheckCircle2,
    Clock,
    Trash2,
    Eye,
    Mail,
    Archive,
    MessageSquare,
    CheckCircle,
    RotateCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/components/ui/confirm-dialog"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

export default function AdminMessagesPage() {
    const { confirm } = useConfirm()
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")

    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const offset = (currentPage - 1) * 10
            const params = new URLSearchParams({
                limit: "10",
                offset: offset.toString(),
            })
            if (searchQuery) params.append("search", searchQuery)

            const res = await fetch(`/api/messages?${params}`)
            const data = await res.json()
            setMessages(data.messages)
            setTotalCount(data.count)
        } catch (error) {
            console.error("Error fetching messages:", error)
            toast.error("Failed to load messages")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [currentPage, searchQuery])

    const handleStatusUpdate = async (id: number, status: ContactMessage['status']) => {
        try {
            const res = await fetch(`/api/messages/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })

            if (res.ok) {
                toast.success(`Message marked as ${status}`)
                fetchMessages()
            } else {
                throw new Error("Failed to update status")
            }
        } catch (error) {
            console.error("Error updating status:", error)
            toast.error("Failed to update status")
        }
    }

    const handleDelete = async (id: number) => {
        if (await confirm("Are you sure you want to delete this message?", {
            title: "Delete Message",
            description: "This action cannot be undone.",
            confirmText: "Delete",
            variant: "danger"
        })) {
            try {
                const res = await fetch(`/api/messages/${id}`, {
                    method: 'DELETE'
                })
                if (res.ok) {
                    toast.success("Message deleted")
                    fetchMessages()
                } else {
                    throw new Error("Failed to delete")
                }
            } catch (error) {
                toast.error("Error deleting message")
            }
        }
    }

    const columns = [
        {
            header: "Sender",
            accessorKey: "name",
            cell: (msg: any) => {
                const item = msg as ContactMessage
                return (
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.email}</span>
                    </div>
                )
            }
        },
        {
            header: "Inquiry Info",
            accessorKey: "service_type",
            cell: (msg: any) => {
                const item = msg as ContactMessage
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">{item.service_type || 'General Inquiry'}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{item.message}</span>
                    </div>
                )
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (msg: any) => {
                const item = msg as ContactMessage
                const styles = {
                    unread: "bg-blue-50 text-blue-700 border-blue-100",
                    read: "bg-gray-50 text-gray-700 border-gray-100",
                    replied: "bg-green-50 text-green-700 border-green-100",
                    archived: "bg-yellow-50 text-yellow-700 border-yellow-100",
                }
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[item.status]}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                )
            }
        },
        {
            header: "Actions",
            accessorKey: "id",
            cell: (msg: any) => {
                const item = msg as ContactMessage
                return (
                    <div className="flex justify-end gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => {
                                setSelectedMessage(item)
                                setIsViewOpen(true)
                                if (item.status === 'unread') handleStatusUpdate(item.id, 'read')
                            }}
                            title="View Message"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>

                        {item.status !== 'replied' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusUpdate(item.id, 'replied')}
                                title="Mark as Replied"
                            >
                                <CheckCircle className="w-4 h-4" />
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            onClick={() => handleStatusUpdate(item.id, item.status === 'archived' ? 'read' : 'archived')}
                            title={item.status === 'archived' ? 'Unarchive' : 'Archive'}
                        >
                            {item.status === 'archived' ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(item.id)}
                            title="Delete Message"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )
            }
        }
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Messages</h1>
                    <p className="text-gray-500 mt-1">Manage contact form inquiries and feedback</p>
                </div>
            </div>

            <DataTable
                data={messages}
                columns={columns as any}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSearch={setSearchQuery}
                emptyMessage="Your contact form submissions will appear here."
            />

            {/* View Message Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl font-serif">
                            <Mail className="w-6 h-6 text-[#1560bd]" />
                            Message from {selectedMessage?.name}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Received on {selectedMessage?.created_at && new Date(selectedMessage.created_at).toLocaleString()}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email Address</span>
                                <p className="text-gray-900 font-medium break-all">{selectedMessage?.email}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Service Interest</span>
                                <p className="text-gray-900 font-medium">{selectedMessage?.service_type || 'General Inquiry'}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-1">Message Content</span>
                            <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[150px] border border-gray-100">
                                {selectedMessage?.message}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button variant="outline" className="rounded-xl px-6" onClick={() => setIsViewOpen(false)}>
                            Close
                        </Button>
                        <Button asChild className="bg-[#1560bd] hover:bg-blue-700 rounded-xl px-6 shadow-lg shadow-blue-500/20">
                            <a href={`mailto:${selectedMessage?.email}`}>
                                <Mail className="w-4 h-4 mr-2" />
                                Reply via Email
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
