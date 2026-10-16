import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Course, CourseSession, Product } from "@/lib/supabase";
import { COURSE_KIND_LABEL, LINES, fmtDate, won } from "@/lib/site";

export function Section({ title, sub, children, className = "", id }: { title?: string; sub?: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <div className="container-x">
        {title && (
          <div className="mb-8">
            <h2 className="h-section">{title}</h2>
            {sub && <p className="mt-2 text-muted">{sub}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function CourseCard({ c, next }: { c: Course; next?: CourseSession }) {
  return (
    <Link href={`/education/${c.slug}`} className="card flex flex-col p-5 transition-shadow hover:shadow-[var(--shadow)]">
      <div className="flex items-center justify-between">
        <span className="badge-soft">{COURSE_KIND_LABEL[c.kind]}</span>
        <span className="text-xs text-muted">{c.days}일 · {c.hours}시간 · 정원 {c.capacity}명</span>
      </div>
      <h3 className="mt-3 text-lg font-bold">{c.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{c.promise}</p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted">수강료(부가세 포함)</div>
          <div className="text-xl font-bold tabular-nums">{won(c.price)}</div>
        </div>
        <div className="text-right text-xs text-muted">
          {next ? (
            <>
              다음 개강 <span className="font-semibold text-text">{fmtDate(next.starts_on)}</span>
              <br />잔여 {Math.max(0, next.seats - next.seats_taken)}석
            </>
          ) : (
            "일정 문의"
          )}
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">자세히 보기 <ArrowRight size={16} /></span>
    </Link>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/store/${p.slug}`} className="card flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow)]">
      <div className="aspect-square bg-bg-2">
        {p.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">{p.volume_ml ? `${p.volume_ml}ml` : "이미지 준비 중"}</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs text-muted">{LINES[p.line]}</div>
        <h3 className="mt-1 font-bold">{p.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {p.material_tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="mt-auto pt-3">
          {p.pro_only || p.price === 0 ? (
            <div className="font-bold">가격 문의 <span className="badge-line ml-1">전문가 전용</span></div>
          ) : (
            <>
              <div className="text-lg font-bold tabular-nums">{won(p.price)}</div>
              {p.member_price && <div className="text-xs text-accent">전문가 회원가 {won(p.member_price)}</div>}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2 text-[15px]">
          <Check size={18} className="mt-1 shrink-0 text-success" aria-hidden /> <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="divide-y divide-border rounded-lg border border-border">
      {items.map((f, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer list-none font-semibold marker:content-none">
            <span className="mr-2 text-accent">Q.</span>
            {f.q}
          </summary>
          <p className="mt-2 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Placeholder({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return <div className={`${ratio} grid place-items-center rounded-lg bg-bg-2 text-sm text-muted`}>{label}</div>;
}
