import type { Metadata } from "next";
import { COMPANY, SITE } from "@/lib/site";
import { Section, Placeholder } from "@/components/ui";
import { KakaoLink, TelLink } from "@/components/kakao";

export const metadata: Metadata = { title: "회사소개 — 나노몰과 독일 나노폴", description: SITE.description };

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">회사소개</h1>
          <p className="mt-3 max-w-2xl text-muted">{SITE.description}</p>
        </div>
      </section>
      <Section title="나노몰">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="prose-k text-[15px]">
            <p>나노몰은 독일 {COMPANY.partner.name}의 정품 코팅제를 국내 전문가와 가정에 공급하고, 그 제품으로 시공 기술을 가르치는 홈케어 코팅 아카데미입니다.</p>
            <p>교육에서 배운 제품을 수료 뒤에도 그대로 회원가로 공급하고, 홈페이지로 들어온 시공 문의를 지역 수료생에게 연결합니다. 수료생은 일감을, 나노몰은 코팅제 수요를 얻는 구조입니다.</p>
            <p>교육장과 사무실은 인천 송도 AIT센터에 있습니다.</p>
          </div>
          <Placeholder label="송도 교육장 사진" />
        </div>
      </Section>
      <Section title="독일 나노폴(NANOPOOL GmbH)" className="bg-bg-2">
        <div className="grid gap-8 md:grid-cols-2">
          <Placeholder label="NP 제품군 사진" />
          <div className="prose-k text-[15px]">
            <p>{COMPANY.partner.since}년 설립된 나노기술 기업으로, 이산화규소(SiO₂) 기반 초박막 ‘리퀴드 글라스’ 코팅을 개발해 왔습니다. 표면과 직접 결합해 외관과 촉감을 바꾸지 않고 발수·발유·오염 방지 층을 만듭니다.</p>
            <p>2009년부터 NP Academy 를 통해 시공 교육을 해 온 회사로, 나노몰의 교육 + 재료 공급 모델은 본사의 방식과 같습니다. 2020년 CFI.co ‘유럽 최우수 친환경 대안 혁신상’을 받았습니다.</p>
          </div>
        </div>
      </Section>
      <Section title="오시는 길">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="text-[15px]">
            <div className="font-semibold">{COMPANY.legalName} 송도 교육장</div>
            <p className="mt-1 text-muted">{COMPANY.address}</p>
            <p className="mt-1 text-muted">{COMPANY.hours}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <KakaoLink ref_="about" className="btn-kakao">카카오톡 상담</KakaoLink>
              <TelLink ref_="about" />
            </div>
            <dl className="mt-6 grid grid-cols-[120px_1fr] gap-y-1 text-sm text-muted">
              <dt>상호</dt><dd>{COMPANY.legalName}</dd>
              <dt>대표</dt><dd>{COMPANY.ceo}</dd>
              <dt>사업자등록번호</dt><dd>{COMPANY.bizNo}</dd>
              <dt>이메일</dt><dd>{COMPANY.email}</dd>
            </dl>
          </div>
          <iframe
            title="오시는 길 지도"
            className="aspect-[4/3] w-full rounded-lg border border-border"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed&hl=ko`}
          />
        </div>
      </Section>
    </>
  );
}
