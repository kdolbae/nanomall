import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/lib/supabase";
import { LINES, MATERIALS, USES } from "@/lib/site";
import { ProductCard, Section } from "@/components/ui";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "코팅제 스토어 — 독일 나노폴 NP · NANOLAB · UV코팅제",
  description: "재질별로 고르는 전문가용·가정용 나노코팅제. 전문가 회원은 회원가로 구매.",
};

function Chip({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`rounded-full border px-3 py-1 text-sm ${active ? "border-accent bg-accent text-accent-ink" : "border-border-strong hover:bg-bg-2"}`}>
      {children}
    </Link>
  );
}

export default async function StorePage({ searchParams }: { searchParams: Promise<{ m?: string; u?: string; l?: string }> }) {
  const { m, u, l } = await searchParams;
  const all = await listProducts();
  const shown = all.filter((p) => (!m || p.material_tags.includes(m)) && (!u || p.use_tags.includes(u)) && (!l || p.line === l));
  const q = (next: Partial<{ m: string; u: string; l: string }>) => {
    const sp = new URLSearchParams();
    const v = { m, u, l, ...next };
    for (const [k, val] of Object.entries(v)) if (val) sp.set(k, val);
    const s = sp.toString();
    return `/store${s ? `?${s}` : ""}`;
  };
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">코팅제 스토어</h1>
          <p className="mt-3 max-w-2xl text-muted">재질을 먼저 고르세요. 어떤 제품을 써야 할지 모르겠으면 카카오톡으로 사진을 보내 주시면 골라 드립니다.</p>
          <p className="mt-2 text-sm"><span className="badge-soft">전문가 회원이면 회원가</span> <Link href="/partner" className="ml-2 underline">전문가 회원 신청</Link></p>
        </div>
      </section>
      <Section>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="grid h-fit gap-6 text-sm">
            <div>
              <div className="mb-2 font-semibold">재질</div>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                <Chip active={!m} href={q({ m: "" })}>전체</Chip>
                {MATERIALS.map((x) => <Chip key={x} active={m === x} href={q({ m: x })}>{x}</Chip>)}
              </div>
            </div>
            <div>
              <div className="mb-2 font-semibold">용도</div>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                <Chip active={!u} href={q({ u: "" })}>전체</Chip>
                {USES.map((x) => <Chip key={x} active={u === x} href={q({ u: x })}>{x}</Chip>)}
              </div>
            </div>
            <div>
              <div className="mb-2 font-semibold">라인</div>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                <Chip active={!l} href={q({ l: "" })}>전체</Chip>
                {Object.entries(LINES).map(([k, v]) => <Chip key={k} active={l === k} href={q({ l: k })}>{v}</Chip>)}
              </div>
            </div>
          </aside>
          <div>
            <div className="mb-4 text-sm text-muted">{shown.length}개 상품</div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {shown.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
            {shown.length === 0 && <p className="text-muted">조건에 맞는 상품이 없습니다.</p>}
          </div>
        </div>
      </Section>
    </>
  );
}
