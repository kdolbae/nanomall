import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { listCourses, listProducts } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, products] = await Promise.all([listCourses(), listProducts()]);
  const fixed = ["", "/education", "/store", "/service", "/cases", "/guide", "/about", "/partner"].map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "weekly" as const }));
  return [
    ...fixed,
    ...courses.map((c) => ({ url: `${SITE.url}/education/${c.slug}`, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ url: `${SITE.url}/store/${p.slug}`, changeFrequency: "weekly" as const })),
  ];
}
