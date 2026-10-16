import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 공개 사이트라 대부분 정적이거나 revalidate 로 충분하다. 캐시가 더 필요해지면 R2 incremental cache 를 붙인다.
export default defineCloudflareConfig();
