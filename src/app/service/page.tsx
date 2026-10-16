import type { Metadata } from "next";
import { Section, Placeholder } from "@/components/ui";
import { KakaoLink } from "@/components/kakao";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "시공 서비스 — 포세린 스케일링·상판 UV코팅·상업공간 정기관리",
  description: "사진으로 카카오톡 견적. 포세린 바닥 스케일링+코팅, 인조대리석 상판 UV코팅, 병원·카페·매장 정기관리.",
};

const SERVICES = [
  {
    id: "porcelain",
    name: "포세린 바닥 스케일링 + 코팅",
    problem: "무광 포세린 타일은 기공에 오염이 배어 누렇게 변합니다. 셀프 코팅제는 얼룩을 오히려 굳힙니다.",
    steps: ["산업용 집진", "오염 원인별 세제·기계 세척", "헹굼·중화", "모서리 손작업", "타일 단위 NP 코팅"],
    price: "평당 견적 (현장 사진 확인 후 확정)",
    note: "병원·카페·매장은 월 정기관리 계약으로 운영합니다.",
  },
  {
    id: "countertop",
    name: "주방 상판 UV코팅",
    problem: "5~6년 쓴 인조대리석 상판의 긁힘·얼룩·변색. 교체 대신 연마와 UV코팅으로 복원합니다.",
    steps: ["주변 보양", "연마", "분진 제거", "UV코팅제 도포", "UV 램프 경화·발수 확인"],
    price: "U자형 상판 30만 원부터 (부가세 별도, 형태·길이·아일랜드에 따라 다름)",
    note: "엔지니어드스톤은 연마 대신 유막 제거 후 나노세라믹 코팅으로 진행합니다.",
  },
  {
    id: "commercial",
    name: "상업공간 정기관리",
    problem: "매장·병원 바닥은 유지 비용이 큽니다. 코팅 후 세척 빈도와 세제 사용이 줄어듭니다.",
    steps: ["현장 진단", "초기 스케일링·코팅", "월 정기 점검·보수", "계약 갱신"],
    price: "면적·주기별 월 정액 견적",
    note: "서울·경기·인천 우선. 그 밖 지역은 출장비가 붙습니다.",
  },
];

export default function ServicePage() {
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">시공 서비스</h1>
          <p className="mt-3 max-w-2xl text-muted">현장 사진 2~3장(전체·근접·손상 부위)을 카카오톡으로 보내 주시면 견적을 드립니다. 재질을 모르셔도 됩니다.</p>
          <KakaoLink ref_="service_hero" className="btn-kakao mt-6">카카오톡으로 사진 견적</KakaoLink>
        </div>
      </section>
      {SERVICES.map((s, i) => (
        <Section key={s.id} id={s.id} className={i % 2 ? "bg-bg-2" : ""}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="h-section">{s.name}</h2>
              <p className="mt-3 text-muted">{s.problem}</p>
              <ol className="mt-5 grid gap-2">
                {s.steps.map((st, j) => (
                  <li key={st} className="flex items-center gap-3 text-[15px]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-bg text-xs font-bold text-accent">{j + 1}</span>
                    {st}
                  </li>
                ))}
              </ol>
              <div className="card mt-6 p-4">
                <div className="text-sm text-muted">가격 안내</div>
                <div className="font-semibold">{s.price}</div>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
              </div>
              <KakaoLink ref_={`service_${s.id}`} className="btn-kakao mt-5">카카오톡 견적 문의</KakaoLink>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Placeholder label="시공 전" ratio="aspect-[3/4]" />
              <Placeholder label="시공 후" ratio="aspect-[3/4] bg-accent-bg" />
            </div>
          </div>
        </Section>
      ))}
      <Section title="견적 요청 남기기" sub="지역과 재질, 대략의 면적을 적어 주세요.">
        <div className="card p-6"><InquiryForm kind="service" showTrade={false} showRegion /></div>
      </Section>
    </>
  );
}
