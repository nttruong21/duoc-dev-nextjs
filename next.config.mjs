/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.benhhen.vn",
      },
    ],
  },
};

export default nextConfig;
