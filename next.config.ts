import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error agentRules config option
  agentRules: false,
};

export default nextConfig;
