import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, listCourses, listSessions, listReviews } from "@/lib/supabase";
import { COURSE_KIND_LABEL, fmtDate, won } from "@/lib/site";
import { CheckList, Faq, Section } from "@/components/ui";
import { KakaoLink, TelLink } from "@/components/kakao";
import { InquiryForm } from "@/components/inquiry-form";
import { PaybackCalculator } from "@/components/payback";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCourse(slug);
  if (!c) return {};
  return { title: `${c.name} — ${c.promise}`, description: c.summary };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCourse(slug);
  if (!c) notFound();
  const [sessions, courses, reviews] = await Promise.all([listSessions(c.id), listCourses(), listReviews(20)]);
  const myReviews = reviews.filter((r) => r.course_id === c.id);
  const next = sessions[0];

  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <span className="badge-soft">{COURSE_KIND_LABEL[c.kind]}</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{c.name}</h1>
          <p className="mt-3 text-xl font-semibold text-accent">{c.promise}</p>
          <p className="mt-3 max-w-3xl text-muted">{c.summary}</p>
        </div>
      </section>

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-12">
          {(c.recommended.length > 0 || c.not_recommended.length > 0) && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-bold">이런 분께 추천</h2>
                <div className="mt-3"><CheckList items={c.recommended} /></div>
              </div>
              {c.not_recommended.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-muted">이런 분께는 권하지 않아요</h2>
                  <ul className="mt-3 grid gap-2 text-[15px] text-muted">
                    {c.not_recommended.map((t) => <li key={t}>· {t}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {c.curriculum.length > 0 && (
            <div>
              <h2 className="h-section">커리큘럼</h2>
              <div className="mt-4 grid gap-3">
                {c.curriculum.map((d) => (
                  <details key={d.day} open={d.day === 1} className="card p-4">
                    <summary className="cursor-pointer list-none font-bold">{d.day}일차</summary>
                    <ol className="mt-3 divide-y divide-border">
                      {d.items.map((it) => (
                        <li key={it.time + it.title} className="grid gap-1 py-3 sm:grid-cols-[72px_1fr]">
                          <span className="text-sm tabular-nums text-muted">{it.time}</span>
                          <div>
                            <div className="font-semibold">{it.title}</div>
                            {it.desc && <div className="text-sm text-muted">{it.desc}</div>}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </details>
                ))}
              </div>
            </div>
          )}

          {c.includes.length > 0 && (
            <div>
              <h2 className="h-section">수강료에 포함된 것</h2>
              <div className="mt-4"><CheckList items={c.includes} /></div>
            </div>
          )}

          {c.payback && (
            <div>
              <h2 className="h-section">교육비 회수 계산</h2>
              <p className="mt-2 text-muted">{c.payback.note}</p>
              <div className="mt-4"><PaybackCalculator perJob={c.payback.per_job_price} tuition={c.price} label="시공 1건" /></div>
            </div>
          )}

          {c.instructor && (
            <div>
              <h2 className="h-section">강사</h2>
              <p className="mt-2 text-muted">{c.instructor} · 독일 나노폴 제품으로 현장 시공과 교육을 함께 합니다.</p>
            </div>
          )}

          {myReviews.length > 0 && (
            <div>
              <h2 className="h-section">수강 후기</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {myReviews.map((r) => (
                  <blockquote key={r.id} className="card p-5">
                    <p>“{r.body}”</p>
                    <footer className="mt-3 text-sm text-muted">{r.name_masked} · {r.trade}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="h-section">개강 일정과 잔여석</h2>
            <table className="mt-4 w-full text-sm">
              <thead className="text-left text-muted">
                <tr><th className="py-2 font-medium">일정</th><th className="py-2 font-medium">장소</th><th className="py-2 font-medium">잔여석</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sessions.length === 0 && <tr><td colSpan={3} className="py-3 text-muted">예정된 일정이 없습니다. 카카오톡으로 원하는 날짜를 알려 주세요.</td></tr>}
                {sessions.map((s) => {
                  const left = Math.max(0, s.seats - s.seats_taken);
                  return (
                    <tr key={s.id}>
                      <td className="py-3 font-semibold">{fmtDate(s.starts_on)}{s.ends_on !== s.starts_on && ` ~ ${fmtDate(s.ends_on)}`}</td>
                      <td className="py-3 text-muted">{s.location}</td>
                      <td className="py-3"><span className={left > 0 ? "badge-soft" : "badge-line"}>{left > 0 ? `${left}석` : "마감"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <KakaoLink ref_={`course_${c.slug}`} className="btn-kakao">카카오톡으로 신청</KakaoLink>
              <TelLink ref_={`course_${c.slug}`} />
            </div>
          </div>

          {c.faq.length > 0 && (
            <div>
              <h2 className="h-section">자주 묻는 질문</h2>
              <div className="mt-4"><Faq items={c.faq} /></div>
            </div>
          )}

          <div id="apply">
            <h2 className="h-section">상담 신청</h2>
            <p className="mt-2 text-muted">남겨 주시면 영업시간 안에 연락드립니다.</p>
            <div className="card mt-4 p-6">
              <InquiryForm kind="education" courses={courses.map((x) => ({ value: x.id, label: x.name }))} defaultCourseId={c.id} />
            </div>
          </div>
        </div>

        {/* 요약 카드(PC 고정) */}
        <aside className="card h-fit p-5 lg:sticky lg:top-24">
          <div className="text-sm text-muted">수강료(부가세 포함)</div>
          <div className="text-3xl font-bold tabular-nums">{won(c.price)}</div>
          <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-muted">기간</dt><dd>{c.days}일 · {c.hours}시간</dd>
            <dt className="text-muted">정원</dt><dd>{c.capacity}명</dd>
            <dt className="text-muted">다음 개강</dt><dd>{next ? fmtDate(next.starts_on) : "문의"}</dd>
            <dt className="text-muted">잔여석</dt><dd>{next ? Math.max(0, next.seats - next.seats_taken) : "-"}</dd>
          </dl>
          <KakaoLink ref_={`course_side_${c.slug}`} className="btn-kakao mt-5 w-full">카카오톡으로 신청</KakaoLink>
          <a href="#apply" className="btn-outline mt-2 w-full">상담 신청 남기기</a>
        </aside>
      </div>
      <Section className="hidden"><span /></Section>
    </>
  );
}
