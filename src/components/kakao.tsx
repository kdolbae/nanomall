"use client";

import Link from "next/link";
import { MessageCircle, Phone, GraduationCap } from "lucide-react";
import { COMPANY, KAKAO_CHAT_URL } from "@/lib/site";
import { track } from "@/lib/track";

/** 카카오톡 채널 채팅으로 가는 링크. 누른 자리(ref_)를 기록해 어떤 버튼이 상담을 만드는지 본다. */
export function KakaoLink({ ref_, className, children }: { ref_: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={KAKAO_CHAT_URL}
      target="_blank"
      rel="noopener"
      className={className ?? "btn-kakao"}
      onClick={() => track("kakao_click", ref_)}
    >
      <MessageCircle size={18} aria-hidden /> {children}
    </a>
  );
}

export function TelLink({ ref_, className, children }: { ref_: string; className?: string; children?: React.ReactNode }) {
  return (
    <a href={`tel:${COMPANY.tel}`} className={className ?? "btn-outline"} onClick={() => track("call_click", ref_)}>
      <Phone size={18} aria-hidden /> {children ?? COMPANY.tel}
    </a>
  );
}

/** 모든 페이지 오른쪽 아래에 떠 있는 카카오 버튼(PC). 모바일은 하단 바가 대신한다. */
export function KakaoFloating() {
  return (
    <a
      href={KAKAO_CHAT_URL}
      target="_blank"
      rel="noopener"
      aria-label="카카오톡 상담"
      onClick={() => track("kakao_click", "floating")}
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-kakao text-kakao-ink shadow-lg hover:bg-[#f5dc00] md:grid"
    >
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}

/** 모바일 하단 고정 바: 카카오 상담 / 교육 신청 / 전화 */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-bg md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noopener"
        onClick={() => track("kakao_click", "mobile_bar")}
        className="flex h-16 flex-col items-center justify-center gap-0.5 bg-kakao text-xs font-semibold text-kakao-ink"
      >
        <MessageCircle size={20} aria-hidden /> 카카오톡 상담
      </a>
      <Link href="/education" className="flex h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold">
        <GraduationCap size={20} aria-hidden /> 교육 신청
      </Link>
      <a href={`tel:${COMPANY.tel}`} onClick={() => track("call_click", "mobile_bar")} className="flex h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold">
        <Phone size={20} aria-hidden /> 전화
      </a>
    </div>
  );
}
