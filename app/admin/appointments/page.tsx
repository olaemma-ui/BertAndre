"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    Calendar,
    Clock,
    Mail,
    Phone,
    User,
    MoreVertical,
    CheckCircle,
    XCircle,
    Eye,
    Trash2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    Check,
    X,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/ui/confirm-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

type Appointment = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    service_type: string;
    appointment_date: string;
    appointment_time: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    created_at: string;
};

export default function AdminAppointmentsPage() {
    const { confirm } = useConfirm();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const offset = (currentPage - 1) * 10;
            const params = new URLSearchParams({
                limit: "10",
                offset: offset.toString(),
            });
            if (searchQuery) params.append("search", searchQuery);

            const res = await fetch(`/api/appointments?${params}`);
            const data = await res.json();

            // Adjusting based on common API return structure
            if (data.appointments) {
                setAppointments(data.appointments);
                setTotalCount(data.count);
            } else {
                setAppointments(data);
                setTotalCount(data.length);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [currentPage, searchQuery]);

    const handleUpdateStatus = async (id: number, status: Appointment["status"]) => {
        try {
            const res = await fetch(`/api/appointments`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });

            if (res.ok) {
                toast.success(`Appointment marked as ${status}`);
                fetchAppointments();
            } else {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: number) => {
        if (await confirm("Are you sure you want to delete this appointment?", {
            title: "Delete Appointment",
            description: "This action cannot be undone.",
            confirmText: "Delete",
            variant: "danger"
        })) {
            try {
                const res = await fetch(`/api/appointments?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    toast.success("Appointment deleted successfully");
                    fetchAppointments();
                } else {
                    throw new Error("Failed to delete appointment");
                }
            } catch (error) {
                console.error("Error deleting appointment:", error);
                toast.error("Failed to delete appointment");
            }
        }
    };

    const columns = [
        {
            header: "Client",
            accessorKey: "full_name",
            cell: (apt: any) => (
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{(apt as Appointment).full_name}</span>
                    <span className="text-xs text-gray-500">{(apt as Appointment).email}</span>
                </div>
            )
        },
        {
            header: "Service",
            accessorKey: "service_type",
            cell: (apt: any) => (
                <span className="text-sm font-medium text-gray-700">{(apt as Appointment).service_type}</span>
            )
        },
        {
            header: "Schedule",
            accessorKey: "appointment_date",
            cell: (apt: any) => {
                const item = apt as Appointment;
                return (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                            <CalendarDays className="w-3 h-3 text-[#1560bd]" />
                            {item.appointment_date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock3 className="w-3 h-3 text-[#fa8128]" />
                            {item.appointment_time}
                        </div>
                    </div>
                )
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (apt: any) => {
                const item = apt as Appointment;
                const styles = {
                    pending: "bg-blue-50 text-blue-700 border-blue-100",
                    confirmed: "bg-green-50 text-green-700 border-green-100",
                    cancelled: "bg-red-50 text-red-700 border-red-100",
                    completed: "bg-gray-50 text-gray-700 border-gray-100",
                };
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[item.status]}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                );
            }
        },
        {
            header: "Actions",
            accessorKey: "id",
            cell: (apt: any) => {
                const item = apt as Appointment;
                return (
                    <div className="flex justify-end gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#1560bd] hover:bg-blue-50"
                            onClick={() => {
                                setSelectedAppointment(item);
                                setIsViewOpen(true);
                            }}
                            title="View Details"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>

                        {item.status === 'pending' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:bg-green-50"
                                onClick={() => handleUpdateStatus(item.id, 'confirmed')}
                                title="Confirm Appointment"
                            >
                                <Check className="w-4 h-4" />
                            </Button>
                        )}

                        {item.status !== 'cancelled' && item.status !== 'completed' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:bg-red-50"
                                onClick={() => handleUpdateStatus(item.id, 'cancelled')}
                                title="Cancel Appointment"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(item.id)}
                            title="Delete Record"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Appointments</h1>
                    <p className="text-gray-500 mt-1">Manage consultation bookings and schedules</p>
                </div>
            </div>

            <DataTable
                data={appointments}
                columns={columns as any}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onSearch={setSearchQuery}
                emptyMessage="No appointments found. New consultation bookings will appear here."
            />

            {/* View Appointment Details Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl font-serif">
                            <Calendar className="w-6 h-6 text-[#1560bd]" />
                            Appointment Details
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Meeting ID: #{selectedAppointment?.id.toString().padStart(6, '0')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-8 mt-6">
                        {/* Client Info Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Client Information</span>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                                        <User className="w-4 h-4 text-[#1560bd]" />
                                        {selectedAppointment?.full_name}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Mail className="w-4 h-4 text-[#fa8128]" />
                                        {selectedAppointment?.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        {selectedAppointment?.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Booking Status</span>
                                <div className="pt-2">
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-white border shadow-sm">
                                        {selectedAppointment?.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Info */}
                        <div className="bg-[#1a1a1a] p-8 rounded-[2.5rem] text-white">
                            <div className="grid grid-cols-2 gap-8 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-white/10 hidden md:block" />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <CalendarDays className="w-5 h-5 text-[#1560bd]" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-white/40 uppercase block">Date</span>
                                            <span className="text-lg font-serif font-bold">{selectedAppointment?.appointment_date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <Clock3 className="w-5 h-5 text-[#fa8128]" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-white/40 uppercase block">Time Slot</span>
                                            <span className="text-lg font-serif font-bold">{selectedAppointment?.appointment_time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Requested Service</p>
                                <div className="text-xl font-serif font-bold text-white flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-[#1560bd]" />
                                    {selectedAppointment?.service_type}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-10">
                        <Button variant="outline" className="rounded-xl px-6 h-12" onClick={() => setIsViewOpen(false)}>
                            Close Detail
                        </Button>

                        {selectedAppointment?.status === 'pending' && (
                            <Button
                                className="bg-[#1560bd] hover:bg-blue-700 text-white rounded-xl px-8 h-12 shadow-lg shadow-blue-500/20"
                                onClick={() => {
                                    handleUpdateStatus(selectedAppointment.id, 'confirmed');
                                    setIsViewOpen(false);
                                }}
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Confirm Booking
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
