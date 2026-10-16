import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// `next dev` 에서도 Cloudflare 바인딩을 쓸 수 있게 한다(SBWorks 와 같은 방식).
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
