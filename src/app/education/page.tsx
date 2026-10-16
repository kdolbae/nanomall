import type { Metadata } from "next";
import Link from "next/link";
import { listCourses, listSessions } from "@/lib/supabase";
import { COURSE_KIND_LABEL, fmtDate } from "@/lib/site";
import { CourseCard, Section } from "@/components/ui";
import { KakaoLink } from "@/components/kakao";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "교육센터 — 나노코팅·UV상판코팅·포세린 스케일링",
  description: "독일 나노폴 정품 코팅제로 배우는 홈케어 코팅 교육. 1일·2일 과정, 정원 4~6명, 수료 후 회원가 재료 공급.",
};

export default async function EducationPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind } = await searchParams;
  const [courses, sessions] = await Promise.all([listCourses(), listSessions()]);
  const shown = kind ? courses.filter((c) => c.kind === kind) : courses;
  const nextOf = (id: string) => sessions.find((s) => s.course_id === id);
  const kinds = ["", "nano", "uv", "porcelain", "package"];
  return (
    <>
      <section className="border-b border-border bg-bg-2 py-12">
        <div className="container-x">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">교육센터</h1>
          <p className="mt-3 max-w-2xl text-muted">
            배우는 제품 그대로 수료 뒤에도 회원가로 공급받습니다. 모든 과정은 인천 송도 교육장(AIT센터)에서 1인 실습대로 진행합니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="과정 종류">
          {kinds.map((k) => (
            <Link key={k} href={k ? `/education?kind=${k}` : "/education"} role="tab" aria-selected={(kind ?? "") === k}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium ${(kind ?? "") === k ? "border-accent bg-accent text-accent-ink" : "border-border-strong hover:bg-bg-2"}`}>
              {k ? COURSE_KIND_LABEL[k] : "전체"}
            </Link>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {shown.map((c) => (
              <CourseCard key={c.id} c={c} next={nextOf(c.id)} />
            ))}
          </div>
          <aside className="card h-fit p-5">
            <h2 className="font-bold">개강 일정</h2>
            <ul className="mt-3 divide-y divide-border text-sm">
              {sessions.length === 0 && <li className="py-2 text-muted">예정된 일정이 없습니다. 카카오톡으로 문의해 주세요.</li>}
              {sessions.map((s) => {
                const c = courses.find((x) => x.id === s.course_id);
                const left = Math.max(0, s.seats - s.seats_taken);
                return (
                  <li key={s.id} className="flex items-center justify-between gap-2 py-2">
                    <div>
                      <div className="font-semibold">{fmtDate(s.starts_on)}{s.ends_on !== s.starts_on && ` ~ ${fmtDate(s.ends_on)}`}</div>
                      <div className="text-muted">{c?.name}</div>
                    </div>
                    <span className={left > 0 ? "badge-soft" : "badge-line"}>{left > 0 ? `잔여 ${left}석` : "마감"}</span>
                  </li>
                );
              })}
            </ul>
            <KakaoLink ref_="education_sidebar" className="btn-kakao mt-4 w-full">카카오톡으로 신청</KakaoLink>
          </aside>
        </div>
      </Section>
    </>
  );
}
