"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KAKAO_CHAT_URL } from "@/lib/site";
import { track, utmFromLocation } from "@/lib/track";

type Option = { value: string; label: string };

/** 상담 신청 폼. 저장되면 /thanks 로 가고 거기서 카카오톡으로 이어서 상담하게 안내한다. */
export function InquiryForm({
  kind,
  courses,
  products,
  defaultCourseId,
  defaultProductId,
  showTrade = true,
  showRegion = false,
  partner = false,
  compact = false,
}: {
  kind: "education" | "product" | "service" | "partner" | "general";
  courses?: Option[];
  products?: Option[];
  defaultCourseId?: string;
  defaultProductId?: string;
  showTrade?: boolean;
  showRegion?: boolean;
  partner?: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) as string | null) ?? "";
    const extra: Record<string, string> = {};
    if (partner) {
      extra.biz_name = get("biz_name");
      extra.biz_no = get("biz_no");
      extra.areas = get("areas");
    }
    const payload = {
      kind,
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      course_id: get("course_id"),
      product_id: get("product_id"),
      trade: get("trade"),
      region: get("region"),
      message: get("message"),
      extra,
      utm: utmFromLocation(),
      path: location.pathname,
      agree: fd.get("agree") === "on",
      website: get("website"),
    };
    setBusy(true);
    try {
      const r = await fetch("/api/inquiry", { method: "POST", body: JSON.stringify(payload), headers: { "content-type": "application/json" } });
      const j = (await r.json()) as { ok: boolean; error?: string };
      if (!j.ok) {
        setErr(j.error ?? "저장에 실패했습니다");
        return;
      }
      track("form_submit", kind);
      router.push(`/thanks?kind=${kind}`);
    } catch {
      setErr("네트워크 오류입니다. 카카오톡으로 문의해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      {/* 봇 함정 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="grid gap-1 text-sm">
        <span className="font-medium">이름 <span className="text-accent">*</span></span>
        <input name="name" required maxLength={40} className="field" placeholder="홍길동" />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">연락처 <span className="text-accent">*</span></span>
        <input name="phone" required inputMode="tel" className="field" placeholder="010-0000-0000" />
      </label>
      {partner && (
        <>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">상호</span>
            <input name="biz_name" className="field" placeholder="○○홈케어" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">사업자등록번호</span>
            <input name="biz_no" className="field" placeholder="000-00-00000" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-medium">주요 시공 지역</span>
            <input name="areas" className="field" placeholder="예: 인천·부천·김포" />
          </label>
        </>
      )}
      {courses && courses.length > 0 && (
        <label className="grid gap-1 text-sm">
          <span className="font-medium">관심 과정</span>
          <select name="course_id" defaultValue={defaultCourseId ?? ""} className="field">
            <option value="">선택</option>
            {courses.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>
      )}
      {products && products.length > 0 && (
        <label className="grid gap-1 text-sm">
          <span className="font-medium">관심 제품</span>
          <select name="product_id" defaultValue={defaultProductId ?? ""} className="field">
            <option value="">선택</option>
            {products.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>
      )}
      {showTrade && (
        <label className="grid gap-1 text-sm">
          <span className="font-medium">현재 업종</span>
          <select name="trade" className="field" defaultValue="">
            <option value="">선택</option>
            <option>입주청소</option>
            <option>줄눈·탄성코트</option>
            <option>인테리어·주방가구</option>
            <option>홈케어 창업 준비</option>
            <option>상업공간 관리</option>
            <option>일반 가정</option>
            <option>기타</option>
          </select>
        </label>
      )}
      {showRegion && (
        <label className="grid gap-1 text-sm">
          <span className="font-medium">지역</span>
          <input name="region" className="field" placeholder="예: 인천 연수구" />
        </label>
      )}
      <label className="grid gap-1 text-sm sm:col-span-2">
        <span className="font-medium">문의 내용</span>
        <textarea name="message" rows={compact ? 3 : 4} maxLength={2000} className="field h-auto py-2" placeholder="궁금한 점을 적어 주세요" />
      </label>
      <label className="flex items-start gap-2 text-sm text-muted sm:col-span-2">
        <input type="checkbox" name="agree" required className="mt-1" />
        <span>
          상담을 위해 이름·연락처를 수집·이용하는 데 동의합니다. 상담 완료 후 1년 보관 뒤 파기합니다.{" "}
          <a href="/privacy" className="underline" target="_blank">개인정보처리방침</a>
        </span>
      </label>
      {err && <p className="text-sm text-[#c0392e] sm:col-span-2">{err}</p>}
      <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row">
        <button type="submit" disabled={busy} className="btn-primary flex-1 disabled:opacity-60">
          {busy ? "보내는 중…" : "상담 신청"}
        </button>
        <a href={KAKAO_CHAT_URL} target="_blank" rel="noopener" onClick={() => track("kakao_click", `form_${kind}`)} className="btn-kakao flex-1">
          카카오톡으로 바로 문의
        </a>
      </div>
    </form>
  );
}
