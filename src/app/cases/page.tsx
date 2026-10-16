import type { Metadata } from "next";
import { listCases } from "@/lib/supabase";
import { Section, Placeholder } from "@/components/ui";
import { COMPANY } from "@/lib/site";

export const revalidate = 300;
export const metadata: Metadata = { title: "시공사례 — 전·후 사진", description: "상판·포세린·욕실 코팅 시공 전후 사진." };

export default async function CasesPage() {
  const cases = await listCases();
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">시공사례</h1>
          <p className="mt-3 text-muted">코팅은 보이지 않지만 차이는 보입니다. 사진 위에 마우스를 올리면 시공 후 사진이 보입니다.</p>
        </div>
      </section>
      <Section>
        {cases.length === 0 ? (
          <p className="text-muted">사례를 올리는 중입니다. 최근 시공은 <a className="underline" href={COMPANY.social.naverBlog} target="_blank" rel="noopener">네이버 블로그</a>에서 먼저 보실 수 있습니다.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <figure key={c.id} className="card group overflow-hidden">
                <div className="relative aspect-[4/3] bg-bg-2">
                  {c.before_url ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.before_url} alt={`${c.title} 시공 전`} className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-0" loading="lazy" />
                      {c.after_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.after_url} alt={`${c.title} 시공 후`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      )}
                    </>
                  ) : (
                    <Placeholder label="사진 준비 중" ratio="h-full rounded-none" />
                  )}
                  <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white group-hover:hidden">전</span>
                  <span className="absolute left-2 top-2 hidden rounded bg-accent px-2 py-0.5 text-xs text-white group-hover:inline">후</span>
                </div>
                <figcaption className="p-4">
                  <div className="font-semibold">{c.title}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {[c.material, c.space, c.region].filter(Boolean).map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {c.body && <p className="mt-2 text-sm text-muted">{c.body}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
