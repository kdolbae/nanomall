import Link from "next/link";
import { ArrowRight, GraduationCap, Package, Wrench } from "lucide-react";
import { listCourses, listProducts, listReviews, listSessions, listCases } from "@/lib/supabase";
import { COMPANY, SITE } from "@/lib/site";
import { KakaoLink } from "@/components/kakao";
import { CourseCard, Placeholder, ProductCard, Section } from "@/components/ui";
import { PaybackCalculator } from "@/components/payback";
import { InquiryForm } from "@/components/inquiry-form";

export const revalidate = 300;

export default async function Home() {
  const [courses, sessions, products, reviews, cases] = await Promise.all([listCourses(), listSessions(), listProducts(), listReviews(6), listCases()]);
  const nextOf = (id: string) => sessions.find((s) => s.course_id === id);
  const best = products.filter((p) => p.line === "np").slice(0, 6);
  const uv = courses.find((c) => c.kind === "uv");

  return (
    <>
      {/* 히어로 */}
      <section className="border-b border-border bg-bg-2">
        <div className="container-x grid items-center gap-10 py-14 sm:py-20 md:grid-cols-2">
          <div>
            <span className="badge-soft">독일 NANOPOOL 정품 코팅제 · 송도 교육장</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-[44px] sm:leading-[1.15]">
              독일 나노폴 코팅으로 배우는
              <br />
              홈케어 코팅 기술
            </h1>
            <p className="mt-4 text-lg text-muted">교육 → 시공 → 코팅제 공급까지, {SITE.name} 하나로.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <KakaoLink ref_="hero" className="btn-kakao">교육 상담하기</KakaoLink>
              <Link href="/store" className="btn-outline">코팅제 보러가기</Link>
            </div>
            <p className="mt-4 text-sm text-muted">전화 {COMPANY.tel} · {COMPANY.hours}</p>
          </div>
          <Placeholder label="상판 UV코팅 실습 사진 (디자인 후 교체)" ratio="aspect-[4/3]" />
        </div>
      </section>

      {/* 고객 길 나누기 */}
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: "/education", icon: GraduationCap, t: "기술을 배우고 싶어요", d: "나노코팅 1일 · UV상판코팅 2일 · 포세린 스케일링 1일. 수료 뒤 회원가로 재료 공급." },
            { href: "/store", icon: Package, t: "코팅제가 필요해요", d: "재질별로 고르는 독일 나노폴 NP 코팅제와 가정용 NANOLAB. 전문가 회원가 별도." },
            { href: "/service", icon: Wrench, t: "시공을 맡기고 싶어요", d: "포세린 바닥 스케일링, 상판 UV코팅, 상업공간 정기관리. 카카오톡으로 사진 견적." },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="card group p-6 transition-shadow hover:shadow-[var(--shadow)]">
              <x.icon size={28} className="text-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-bold">{x.t}</h3>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">바로가기 <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 교육 과정 */}
      <Section title="교육 과정" sub="정원 4~6명, 1인 실습대에서 직접 해 보고 수료합니다." className="bg-bg-2">
        <div className="grid gap-4 md:grid-cols-3">
          {courses.filter((c) => c.kind !== "package").map((c) => (
            <CourseCard key={c.id} c={c} next={nextOf(c.id)} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/education" className="btn-outline">전체 과정과 개강 일정</Link>
        </div>
      </Section>

      {/* 수익 계산기 */}
      <Section title="교육비, 몇 건이면 회수될까요?" sub="상판 UV코팅 한 건은 보통 2시간, 30만 원(부가세 별도)입니다.">
        <PaybackCalculator perJob={uv?.payback?.per_job_price ?? 300000} tuition={uv?.price ?? 790000} label="상판 UV코팅 1건" />
      </Section>

      {/* 전후 사진 */}
      <Section title="시공 전과 후" sub="상판·포세린·욕실. 코팅은 보이지 않지만 차이는 보입니다." className="bg-bg-2">
        <div className="grid gap-4 md:grid-cols-3">
          {(cases.length ? cases.slice(0, 3) : [{ id: "a", title: "인조대리석 상판 UV코팅" }, { id: "b", title: "무광 포세린 바닥 스케일링" }, { id: "c", title: "욕실 유리·도기 나노코팅" }]).map((c) => (
            <div key={c.id} className="card overflow-hidden">
              <div className="grid grid-cols-2">
                <Placeholder label="전" ratio="aspect-square rounded-none" />
                <Placeholder label="후" ratio="aspect-square rounded-none bg-accent-bg" />
              </div>
              <div className="p-4 font-semibold">{c.title}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/cases" className="btn-outline">시공사례 더 보기</Link>
        </div>
      </Section>

      {/* 후기 */}
      <Section title="수료생 이야기">
        {reviews.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <blockquote key={r.id} className="card p-5">
                <p className="text-[15px]">“{r.body}”</p>
                <footer className="mt-3 text-sm text-muted">{r.name_masked} · {r.trade}</footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="text-muted">첫 기수 수료 후 후기를 올립니다. 교육 현장은 <a className="underline" href={COMPANY.social.naverBlog} target="_blank" rel="noopener">블로그</a>에서 먼저 보실 수 있습니다.</p>
        )}
      </Section>

      {/* 베스트 코팅제 */}
      <Section title="재질별 대표 코팅제" sub="독일 나노폴 NP 전문가용. 수료생·전문가 회원은 회원가로." className="bg-bg-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {best.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/store" className="btn-outline">스토어 전체 보기</Link>
        </div>
      </Section>

      {/* 블로그·유튜브 */}
      <Section title="현장 소식">
        <div className="grid gap-4 md:grid-cols-2">
          <a href={COMPANY.social.naverBlog} target="_blank" rel="noopener" className="card p-6 hover:shadow-[var(--shadow)]">
            <div className="text-sm text-muted">네이버 블로그</div>
            <div className="mt-1 text-lg font-bold">시공 전후·기술 자료·교육 현장</div>
            <p className="mt-2 text-sm text-muted">주 3회 새 글. 재질별 코팅 가이드와 수료생 이야기를 올립니다.</p>
          </a>
          <a href={COMPANY.social.youtube} target="_blank" rel="noopener" className="card p-6 hover:shadow-[var(--shadow)]">
            <div className="text-sm text-muted">유튜브</div>
            <div className="mt-1 text-lg font-bold">30초 발수 테스트 영상</div>
            <p className="mt-2 text-sm text-muted">연마·UV 경화·물방울 맺힘을 눈으로 확인하세요.</p>
          </a>
        </div>
      </Section>

      {/* 상담 */}
      <Section id="contact" title="궁금한 건 카카오톡으로 물어보세요" sub="남겨 주시면 영업시간 안에 연락드립니다. 급하시면 카카오톡이 가장 빠릅니다." className="bg-bg-2">
        <div className="card p-6">
          <InquiryForm kind="general" courses={courses.map((c) => ({ value: c.id, label: c.name }))} />
        </div>
      </Section>
    </>
  );
}
