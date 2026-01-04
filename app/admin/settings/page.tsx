"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({
        contact_email: "",
        contact_phone: "",
        contact_address_ng: "",
        contact_address_us: "",
        office_hours: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            if (res.ok) {
                const data = await res.json();
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                toast.success("Settings updated successfully");
            } else {
                throw new Error("Failed to update settings");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Error saving settings");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#1560bd]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">Site Settings</h1>
                <p className="text-gray-500 mt-1">Manage global configuration and contact information.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Contact Email */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#1560bd]">
                            <Mail className="w-5 h-5" />
                            <h2 className="font-bold text-lg">Contact Email</h2>
                        </div>
                        <Input
                            value={settings.contact_email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("contact_email", e.target.value)}
                            placeholder="info@bertandreconsulting.com"
                            className="rounded-xl"
                        />
                    </div>

                    {/* Contact Phone */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#1560bd]">
                            <Phone className="w-5 h-5" />
                            <h2 className="font-bold text-lg">Phone Number</h2>
                        </div>
                        <Input
                            value={settings.contact_phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("contact_phone", e.target.value)}
                            placeholder="0201 330 0667"
                            className="rounded-xl"
                        />
                    </div>

                    {/* Office Hours */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#1560bd]">
                            <Clock className="w-5 h-5" />
                            <h2 className="font-bold text-lg">Office Hours</h2>
                        </div>
                        <Input
                            value={settings.office_hours}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("office_hours", e.target.value)}
                            placeholder="Mon–Fri | 8AM – 4PM (WAT)"
                            className="rounded-xl"
                        />
                    </div>

                    {/* Address Nigeria */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#1560bd]">
                            <MapPin className="w-5 h-5" />
                            <h2 className="font-bold text-lg">Nigeria Office Address</h2>
                        </div>
                        <Textarea
                            value={settings.contact_address_ng}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("contact_address_ng", e.target.value)}
                            placeholder="20 Awudu epheka, Lekki Phase 1, Lagos, Nigeria"
                            className="rounded-xl min-h-[100px]"
                        />
                    </div>

                    {/* Address US */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#1560bd]">
                            <MapPin className="w-5 h-5" />
                            <h2 className="font-bold text-lg">US Office Address</h2>
                        </div>
                        <Textarea
                            value={settings.contact_address_us}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("contact_address_us", e.target.value)}
                            placeholder="US: 8 The Green Suite 4000 Dover, DE 19901"
                            className="rounded-xl min-h-[100px]"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        disabled={saving}
                        className="bg-[#1560bd] hover:bg-blue-700 text-white rounded-xl px-8 h-12 shadow-lg shadow-blue-500/20"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Settings
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
