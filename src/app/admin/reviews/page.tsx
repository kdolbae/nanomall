import { adminClient, type Course, type Review } from "@/lib/supabase";
import { addReview, toggleReview } from "../actions";

export default async function AdminReviews() {
  const sb = adminClient();
  if (!sb) return <p className="text-warn">SUPABASE_SECRET_KEY 가 없습니다.</p>;
  const [{ data: courses }, { data: reviews }] = await Promise.all([
    sb.from("nm_course").select("id,name").order("sort"),
    sb.from("nm_review").select("*").order("created_at", { ascending: false }),
  ]);
  const cs = (courses ?? []) as Pick<Course, "id" | "name">[];
  const rs = (reviews ?? []) as Review[];
  return (
    <div>
      <h1 className="text-xl font-bold">후기</h1>
      <p className="mt-1 text-sm text-muted">실명은 쓰지 않습니다(김○수). 본인 동의를 받은 후기만 올립니다.</p>
      <form action={addReview} className="card mt-4 grid gap-2 p-4 sm:grid-cols-4">
        <input name="name_masked" className="field h-10" placeholder="김○수" required />
        <input name="trade" className="field h-10" placeholder="업종 (입주청소)" />
        <select name="course_id" className="field h-10" defaultValue="">
          <option value="">과정 없음</option>
          {cs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select name="rating" className="field h-10" defaultValue="5">
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)}</option>)}
        </select>
        <textarea name="body" className="field h-20 py-2 sm:col-span-4" placeholder="후기 본문" required />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked /> 바로 공개</label>
        <button className="btn-primary h-10 sm:col-span-3">후기 추가</button>
      </form>
      <ul className="mt-6 divide-y divide-border text-sm">
        {rs.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-2 py-2">
            <div>
              <span className="font-semibold">{r.name_masked}</span> <span className="text-muted">{r.trade}</span>
              <p className="mt-1">{r.body}</p>
            </div>
            <form action={toggleReview}>
              <input type="hidden" name="id" value={r.id} />
              <input type="hidden" name="published" value={r.published ? "0" : "1"} />
              <button className={r.published ? "badge-soft" : "badge-line"}>{r.published ? "공개 중" : "숨김"}</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
