import { redirect } from "next/navigation";

// 옛 아임웹 주소(/nanopool, /nanopool/?idx=N) → 새 스토어. idx 번호는 옛 상품 순서.
const LEGACY: Record<string, string> = { "1": "np-wood", "2": "np-glass-ceramic", "3": "np-1k-stone", "4": "np-preclean", "5": "np-metal", "6": "np-plastic", "7": "np-textile" };

export default async function LegacyNanopool({ searchParams }: { searchParams: Promise<{ idx?: string }> }) {
  const { idx } = await searchParams;
  const slug = idx ? LEGACY[idx] : undefined;
  redirect(slug ? `/store/${slug}` : "/store?l=np");
}
