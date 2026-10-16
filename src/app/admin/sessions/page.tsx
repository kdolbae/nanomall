import { adminClient, type Course, type CourseSession } from "@/lib/supabase";
import { addSession, updateSession } from "../actions";

export default async function AdminSessions() {
  const sb = adminClient();
  if (!sb) return <p className="text-warn">SUPABASE_SECRET_KEY 가 없습니다.</p>;
  const [{ data: courses }, { data: sessions }] = await Promise.all([
    sb.from("nm_course").select("id,name,capacity").order("sort"),
    sb.from("nm_course_session").select("*").order("starts_on", { ascending: false }).limit(100),
  ]);
  const cs = (courses ?? []) as Pick<Course, "id" | "name" | "capacity">[];
  const ss = (sessions ?? []) as CourseSession[];
  return (
    <div>
      <h1 className="text-xl font-bold">교육 일정</h1>
      <form action={addSession} className="card mt-4 grid gap-2 p-4 sm:grid-cols-5">
        <select name="course_id" className="field h-10 sm:col-span-2" required>
          {cs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="date" name="starts_on" className="field h-10" required />
        <input type="date" name="ends_on" className="field h-10" placeholder="종료일(하루면 비움)" />
        <input type="number" name="seats" className="field h-10" placeholder="정원" defaultValue={6} min={1} />
        <input name="location" className="field h-10 sm:col-span-4" defaultValue="인천 송도 교육장 (AIT센터)" />
        <button className="btn-primary h-10">일정 추가</button>
      </form>
      <table className="mt-6 w-full text-sm">
        <thead className="text-left text-muted"><tr><th className="py-2 font-medium">일정</th><th className="py-2 font-medium">과정</th><th className="py-2 font-medium">정원/신청</th><th className="py-2 font-medium">상태</th><th></th></tr></thead>
        <tbody className="divide-y divide-border">
          {ss.map((s) => (
            <tr key={s.id}>
              <td className="py-2 tabular-nums">{s.starts_on}{s.ends_on !== s.starts_on && ` ~ ${s.ends_on}`}</td>
              <td className="py-2">{cs.find((c) => c.id === s.course_id)?.name}</td>
              <td className="py-2" colSpan={3}>
                <form action={updateSession} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="id" value={s.id} />
                  <input type="number" name="seats" defaultValue={s.seats} className="field h-9 w-20" min={1} />
                  <span>/</span>
                  <input type="number" name="seats_taken" defaultValue={s.seats_taken} className="field h-9 w-20" min={0} />
                  <select name="status" defaultValue={s.status} className="field h-9 w-28">
                    <option value="open">모집 중</option><option value="closed">마감</option><option value="done">종료</option>
                  </select>
                  <button className="btn-outline h-9 px-3 text-sm">저장</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
