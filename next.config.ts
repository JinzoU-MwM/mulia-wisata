import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  serverExternalPackages: [
    "@libsql/client",
    "better-auth",
    "@better-auth/kysely-adapter",
    "kysely",
  ],
};

export default nextConfig;
