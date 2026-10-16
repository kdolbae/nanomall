"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { KakaoLink } from "@/components/kakao";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} 홈`}>
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-sm font-bold text-accent-ink">N</span>
          <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
          <span className="hidden text-xs text-muted sm:inline">독일 나노폴 코팅 아카데미</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="주 메뉴">
          {NAV.map((n) => {
            const active = path === n.href || path.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-md px-3 py-2 text-[15px] font-medium hover:bg-bg-2 ${active ? "text-accent" : "text-text"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <KakaoLink ref_="header" className="btn-kakao hidden h-10 px-4 md:inline-flex">
            카카오톡 상담
          </KakaoLink>
          <button
            className="grid h-10 w-10 place-items-center rounded-md hover:bg-bg-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <nav className="container-x flex flex-col py-2" aria-label="모바일 메뉴">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-medium hover:bg-bg-2">
                {n.label}
              </Link>
            ))}
            <Link href="/partner" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-base font-medium text-accent hover:bg-bg-2">
              전문가 회원 신청
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
