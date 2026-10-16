import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, listProducts } from "@/lib/supabase";
import { LINES, won } from "@/lib/site";
import { ProductCard } from "@/components/ui";
import { KakaoLink } from "@/components/kakao";
import { InquiryForm } from "@/components/inquiry-form";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.material_tags.join("·")} 코팅제`, description: p.summary };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const all = await listProducts();
  const related = all.filter((x) => p.related_slugs.includes(x.slug));
  const d = p.details ?? {};
  const rows: [string, string | undefined][] = [
    ["적용 재질", d.materials?.join(", ")],
    ["시공 가능 면적", d.coverage_m2],
    ["경화·사용 가능 시간", d.cure],
    ["전처리", d.pretreat],
    ["도포 방법", d.usage],
    ["주의사항", d.caution],
  ];
  const stock = { in_stock: null, low: <span className="badge-line">재고 적음</span>, out: <span className="badge-line">일시 품절</span> }[p.stock_status];

  return (
    <div className="container-x py-10">
      <nav className="text-sm text-muted" aria-label="경로">
        <Link href="/store">스토어</Link> › {LINES[p.line]}
      </nav>
      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-bg-2">
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-muted">제품 사진 준비 중</div>
          )}
        </div>
        <div>
          <div className="text-sm text-muted">{LINES[p.line]}</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{p.name}</h1>
          <div className="mt-2 flex flex-wrap gap-1">
            {p.material_tags.map((t) => <Link key={t} href={`/store?m=${encodeURIComponent(t)}`} className="tag">{t}</Link>)}
            {p.use_tags.map((t) => <span key={t} className="tag">{t}</span>)}
            {stock}
          </div>
          <p className="mt-4 text-muted">{p.summary}</p>
          <div className="mt-6 card p-5">
            {p.pro_only || p.price === 0 ? (
              <>
                <div className="text-sm text-muted">가격</div>
                <div className="text-2xl font-bold">카카오톡 문의 <span className="badge-line ml-1 align-middle">전문가 전용</span></div>
                <p className="mt-2 text-sm text-muted">장비와 교육 수료가 필요한 제품이라 수료생·사업자에게만 판매합니다.</p>
              </>
            ) : (
              <>
                <div className="text-sm text-muted">일반가 {p.volume_ml ? `· ${p.volume_ml}ml` : ""}</div>
                <div className="text-3xl font-bold tabular-nums">{won(p.price)}</div>
                {p.member_price && (
                  <div className="mt-1 text-sm">
                    <span className="font-semibold text-accent">전문가 회원가 {won(p.member_price)}</span>
                    <Link href="/partner" className="ml-2 text-muted underline">회원 신청</Link>
                  </div>
                )}
              </>
            )}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <KakaoLink ref_={`product_${p.slug}`} className="btn-kakao flex-1">카카오톡 주문 문의</KakaoLink>
              <a href="#ask" className="btn-outline flex-1">주문·견적 남기기</a>
            </div>
            <p className="mt-3 text-xs text-muted">50,000원 이상 무료배송 · 결제는 상담 후 계좌이체 또는 카드 링크로 안내합니다.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="text-xl font-bold">상세정보</h2>
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-border">
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th className="w-40 py-3 text-left font-medium text-muted">{k}</th>
                  <td className="py-3">{v || <span className="text-muted">상담 시 안내</span>}</td>
                </tr>
              ))}
              {d.msds_url && (
                <tr><th className="py-3 text-left font-medium text-muted">MSDS</th><td className="py-3"><a className="underline" href={d.msds_url} target="_blank" rel="noopener">다운로드</a></td></tr>
              )}
            </tbody>
          </table>
          {d.video_url && (
            <div className="mt-6 aspect-video overflow-hidden rounded-lg">
              <iframe src={d.video_url} title={`${p.name} 도포 방법`} className="h-full w-full" allowFullScreen loading="lazy" />
            </div>
          )}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold">함께 쓰는 제품</h2>
              <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3">
                {related.map((x) => <ProductCard key={x.id} p={x} />)}
              </div>
            </div>
          )}
        </div>
        <aside id="ask" className="card h-fit p-5">
          <h2 className="font-bold">주문·견적 남기기</h2>
          <p className="mt-1 text-sm text-muted">수량과 재질을 적어 주시면 견적을 보내 드립니다.</p>
          <div className="mt-4">
            <InquiryForm kind="product" products={all.map((x) => ({ value: x.id, label: x.name }))} defaultProductId={p.id} showTrade={false} compact />
          </div>
        </aside>
      </div>
    </div>
  );
}
