"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onFileChange?: (file: File | null) => void;
    label?: string;
    deferred?: boolean;
    file?: File | null;
}

export function ImageUpload({ value, onChange, onFileChange, label, deferred = false, file }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (value) {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [file, value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Notify parent of file change
        onFileChange?.(selectedFile);

        // Local preview is handled by useEffect via the file prop if passed.
        // But for immediate feedback if parent internal state update is slow (unlikely),
        // we can set it here too, but let's rely on useEffect if possible.
        // Actually, if we set it here, useEffect might override it or vice versa.
        // Let's just set it here to be responsive.
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // If deferred, don't upload to Cloudinary yet
        if (deferred) {
            return;
        }

        // Upload
        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        const promise = fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        toast.promise(promise, {
            loading: 'Uploading image to Cloudinary...',
            success: async (res) => {
                const data = await res.json();
                if (data.url) {
                    onChange(data.url);
                    setPreview(data.url);
                    return 'Image uploaded successfully!';
                }
                throw new Error(data.error || 'Upload failed');
            },
            error: (err) => `Upload failed: ${err.message}`,
        });

        try {
            const res = await promise;
            if (!res.ok) throw new Error("Upload failed");
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onChange("");
        onFileChange?.(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            {label && <label className="block text-sm font-semibold text-gray-700">{label}</label>}

            <div className="relative group">
                {preview ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-xl hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <p className="text-white text-sm font-medium">Change Image</p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`
              flex flex-col items-center justify-center aspect-video w-full 
              border-2 border-dashed border-gray-300 rounded-2xl 
              bg-gray-50 hover:bg-gray-100 hover:border-[#1560bd] 
              transition-all cursor-pointer group px-6
            `}
                    >
                        {loading ? (
                            <Loader2 className="w-10 h-10 animate-spin text-[#1560bd]" />
                        ) : (
                            <>
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-[#1560bd]" />
                                </div>
                                <p className="text-lg font-semibold text-gray-900 mb-1">Upload Featured Image</p>
                                <p className="text-sm text-gray-500">PNG, JPG, or WEBP (max. 5MB)</p>
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
