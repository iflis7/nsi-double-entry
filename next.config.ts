import type { NextConfig } from "next";

// Standalone output is only for the local Docker image (Dockerfile sets NEXT_STANDALONE=1).
// Cloud deploys (e.g. Vercel with VERCEL=1) must use the default Next output; standalone
// breaks routing there. Also skip standalone if VERCEL is set so a mistaken env var never
// enables it on the platform.
const useStandalone =
  process.env.VERCEL !== "1" && process.env.NEXT_STANDALONE === "1";

const nextConfig: NextConfig = {
  ...(useStandalone ? { output: "standalone" as const } : {}),
};

export default nextConfig;
