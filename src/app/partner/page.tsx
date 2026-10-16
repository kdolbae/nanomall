import type { Metadata } from "next";
import { BadgePercent, GraduationCap, Handshake } from "lucide-react";
import { Section } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "전문가 회원(파트너) 신청", description: "수료생·시공업체·대리점을 위한 회원가, 재교육, 시공 문의 연결." };

export default function PartnerPage() {
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">전문가 회원 신청</h1>
          <p className="mt-3 max-w-2xl text-muted">수료생, 입주청소·줄눈·인테리어 사업자, 코팅제 대리점을 위한 회원 제도입니다. 사업자등록증 확인 후 승인됩니다.</p>
        </div>
      </section>
      <Section title="회원 혜택">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: BadgePercent, t: "코팅제 회원가", d: "NP 전문가용 코팅제 15~20% 할인, 대용량·정기배송 별도 협의." },
            { icon: GraduationCap, t: "재교육·기술 상담", d: "수료 과정 재교육 1회 무료, 현장 문제는 카카오톡으로 사진 상담." },
            { icon: Handshake, t: "시공 문의 연결", d: "홈페이지로 들어온 지역 시공 문의를 회원에게 연결합니다." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <x.icon size={28} className="text-accent" aria-hidden />
              <h2 className="mt-4 text-lg font-bold">{x.t}</h2>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="신청" sub="신청 → 사업자등록증 확인(카카오톡) → 승인 안내 → 회원가 적용. 보통 1~2 영업일." className="bg-bg-2">
        <div className="card p-6"><InquiryForm kind="partner" partner showTrade /></div>
      </Section>
    </>
  );
}
