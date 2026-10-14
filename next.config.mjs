/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Image Optimization is switched off (Vercel Hobby image-transformation quota): next/image serves
    // the original files as-is. The settings below stay in place for if it is switched back on.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
