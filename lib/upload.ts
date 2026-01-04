import { toast } from "sonner";

export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
    }

    const data = await res.json();
    return data.url;
}

export async function uploadMultipleFiles(files: (File | null)[]): Promise<(string | null)[]> {
    const uploadPromises = files.map(file => {
        if (!file) return Promise.resolve(null);
        return uploadToCloudinary(file);
    });

    return Promise.all(uploadPromises);
}
