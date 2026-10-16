import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { KakaoLink } from "@/components/kakao";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "접수되었습니다", robots: { index: false } };

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind } = await searchParams;
  const label = { education: "교육 상담", product: "주문·견적", service: "시공 견적", partner: "전문가 회원", general: "상담" }[kind ?? "general"] ?? "상담";
  return (
    <div className="container-x py-20 text-center">
      <CheckCircle2 size={48} className="mx-auto text-success" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold">{label} 신청이 접수되었습니다</h1>
      <p className="mt-2 text-muted">{COMPANY.hours}에 연락드립니다. 바로 이야기하고 싶으시면 카카오톡으로 이어서 문의해 주세요.</p>
      <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
        <KakaoLink ref_="thanks" className="btn-kakao">카카오톡으로 이어서 상담</KakaoLink>
        <Link href="/" className="btn-outline">처음으로</Link>
      </div>
    </div>
  );
}
