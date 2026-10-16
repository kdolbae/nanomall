import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/lib/supabase";
import { Faq, Section } from "@/components/ui";
import { KakaoLink } from "@/components/kakao";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "기술자료 — 재질 판별·제품별 사용법·FAQ",
  description: "우리 집 상판은 인조대리석일까 엔지니어드스톤일까. 재질 판별법과 나노폴 제품별 사용법·면적·경화시간.",
};

const MATERIAL_GUIDE = [
  { name: "인조대리석", how: "표면이 따뜻하고 손톱으로 긁으면 미세하게 자국이 남습니다. 이음새가 거의 보이지 않습니다.", coat: "연마 + UV코팅", product: "UV 상판코팅제" },
  { name: "엔지니어드스톤", how: "차갑고 단단하며 석영 알갱이가 보입니다. 광택이 깊고 이음새가 있습니다.", coat: "유막 제거·박리 + 나노세라믹", product: "NP 1K Stone" },
  { name: "세라믹(포세린) 상판·바닥", how: "두드리면 맑은 소리, 무광이 많고 물이 천천히 스며듭니다.", coat: "스케일링 + 침투 코팅", product: "NP 1K Stone" },
  { name: "유리·도기", how: "샤워부스 유리, 세면대·변기. 물때가 하얗게 낍니다.", coat: "전처리 + 발수 코팅", product: "NP Glass & Ceramic" },
  { name: "금속(스테인리스·크롬)", how: "싱크볼·수전. 물자국과 지문이 잘 남습니다.", coat: "탈지 + 코팅", product: "NP Metal" },
];

const FAQ = [
  { q: "나노코팅은 얼마나 가나요?", a: "제조사는 적용 재질과 사용 빈도에 따라 2년 이상을 안내합니다. 전처리가 제대로 되어야 그 기간이 나옵니다." },
  { q: "셀프로 해도 되나요?", a: "유리·도기·금속은 NANOLAB 가정용으로 가능합니다. 상판 UV코팅과 포세린 스케일링은 장비가 필요해 전문가 시공을 권합니다." },
  { q: "기존에 발수제·왁스를 발랐는데요?", a: "남아 있으면 코팅이 붙지 않습니다. NP Preclean 으로 완전히 제거하고 건조한 뒤 코팅합니다." },
  { q: "코팅 후 언제부터 물을 써도 되나요?", a: "제품과 재질마다 다릅니다. 제품 상세의 경화 시간을 보시고, 비어 있으면 카카오톡으로 물어봐 주세요." },
  { q: "얼룩이나 무지개 현상이 생겼어요.", a: "도포량이 많거나 버핑이 늦은 경우입니다. 교육 과정의 불량 사례 시간에 다루며, 수료생은 카카오톡 기술 상담을 받을 수 있습니다." },
];

export default async function GuidePage() {
  const products = await listProducts();
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">기술자료</h1>
          <p className="mt-3 max-w-2xl text-muted">재질을 알아야 맞는 코팅제가 나옵니다. 사진을 카카오톡으로 보내 주시면 대신 판별해 드립니다.</p>
        </div>
      </section>
      <Section title="재질 판별 가이드" sub="우리 집 상판·바닥은 무엇일까?">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-muted"><tr><th className="py-2 font-medium">재질</th><th className="py-2 font-medium">구분법</th><th className="py-2 font-medium">공법</th><th className="py-2 font-medium">제품</th></tr></thead>
            <tbody className="divide-y divide-border">
              {MATERIAL_GUIDE.map((m) => (
                <tr key={m.name}>
                  <td className="py-3 font-semibold">{m.name}</td>
                  <td className="py-3 text-muted">{m.how}</td>
                  <td className="py-3">{m.coat}</td>
                  <td className="py-3">{m.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <KakaoLink ref_="guide_material" className="btn-kakao mt-6">사진 보내고 재질 물어보기</KakaoLink>
      </Section>
      <Section title="제품별 사용법·면적·경화시간" className="bg-bg-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-muted"><tr><th className="py-2 font-medium">제품</th><th className="py-2 font-medium">적용 재질</th><th className="py-2 font-medium">면적(500ml)</th><th className="py-2 font-medium">경화</th><th className="py-2 font-medium">전처리</th><th className="py-2 font-medium">MSDS</th></tr></thead>
            <tbody className="divide-y divide-border">
              {products.filter((p) => p.line !== "nanolab").map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-semibold"><Link href={`/store/${p.slug}`} className="hover:underline">{p.name}</Link></td>
                  <td className="py-3 text-muted">{p.details.materials?.join(", ") || p.material_tags.join(", ")}</td>
                  <td className="py-3">{p.details.coverage_m2 || <span className="text-muted">문의</span>}</td>
                  <td className="py-3">{p.details.cure || <span className="text-muted">문의</span>}</td>
                  <td className="py-3">{p.details.pretreat || "-"}</td>
                  <td className="py-3">{p.details.msds_url ? <a className="underline" href={p.details.msds_url} target="_blank" rel="noopener">받기</a> : <span className="text-muted">준비 중</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="자주 묻는 질문">
        <Faq items={FAQ} />
      </Section>
    </>
  );
}
