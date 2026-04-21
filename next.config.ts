import type { NextConfig } from "next";

// Vercel expects the default Next.js output. Standalone is only for Docker (see Dockerfile).
const nextConfig: NextConfig = {
  ...(process.env.DOCKER_BUILD === "1" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
