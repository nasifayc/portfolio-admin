import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "efwcqjmdgsbsdrhxzqkk.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
