export default function cloudinaryLoader({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality?: number;
}) {
    const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

    // Check if it's a Cloudinary URL
    if (src.includes("res.cloudinary.com")) {
        // Inject params after /upload/
        // This simple replacement works for standard Cloudinary URLs.
        // We strictly look for '/image/upload/' to ensure we are in the right place.
        return src.replace(
            "/image/upload/",
            `/image/upload/${params.join(",")}/`
        );
    }

    // If not Cloudinary (e.g. local or other source), return as is.
    // Note: When used with 'loader' prop, this means other images won't be resized 
    // by Next.js, but they will still load.
    return src;
}
