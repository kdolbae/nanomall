import Link from "next/link";
import { COMPANY, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-bg-2">
      <div className="container-x grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-bold">{SITE.name}</div>
          <p className="mt-2 text-sm text-muted">{SITE.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            {COMPANY.partner.country} {COMPANY.partner.name} 정품 코팅제 · {COMPANY.partner.since}년부터 나노코팅만 연구한 기업
          </p>
        </div>
        <div className="text-sm text-muted">
          <div className="font-semibold text-text">회사 정보</div>
          <ul className="mt-2 space-y-1">
            <li>상호 {COMPANY.legalName} · 대표 {COMPANY.ceo}</li>
            <li>사업자등록번호 {COMPANY.bizNo}</li>
            <li>{COMPANY.address}</li>
            <li>
              대표번호 <a href={`tel:${COMPANY.tel}`} className="text-text">{COMPANY.tel}</a> · {COMPANY.hours}
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
          </ul>
        </div>
        <div className="text-sm text-muted">
          <div className="font-semibold text-text">바로가기</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/education">교육센터</Link></li>
            <li><Link href="/store">코팅제 스토어</Link></li>
            <li><Link href="/partner">전문가 회원 신청</Link></li>
            <li><a href={COMPANY.social.naverBlog} target="_blank" rel="noopener">네이버 블로그</a></li>
            <li><a href={COMPANY.social.youtube} target="_blank" rel="noopener">유튜브</a></li>
          </ul>
          <ul className="mt-4 flex gap-3 text-xs">
            <li><Link href="/terms">이용약관</Link></li>
            <li><Link href="/privacy" className="font-semibold text-text">개인정보처리방침</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x pb-8 text-xs text-muted">© {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</div>
    </footer>
  );
}
