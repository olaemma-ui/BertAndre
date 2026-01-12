"use client";

import Image, { ImageProps } from "next/image";
import cloudinaryLoader from "@/lib/cloudinary";

export default function CloudinaryImage(props: ImageProps) {
    return <Image {...props} loader={cloudinaryLoader} />;
}
