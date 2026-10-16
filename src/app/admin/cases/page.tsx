import { adminClient, type Case } from "@/lib/supabase";
import { addCase, toggleCase } from "../actions";

export default async function AdminCases() {
  const sb = adminClient();
  if (!sb) return <p className="text-warn">SUPABASE_SECRET_KEY 가 없습니다.</p>;
  const { data } = await sb.from("nm_case").select("*").order("created_at", { ascending: false });
  const cs = (data ?? []) as Case[];
  return (
    <div>
      <h1 className="text-xl font-bold">시공사례</h1>
      <p className="mt-1 text-sm text-muted">사진은 R2·Supabase Storage 등에 올리고 주소를 붙여 넣습니다. 얼굴·주소가 보이는 사진은 올리지 않습니다.</p>
      <form action={addCase} className="card mt-4 grid gap-2 p-4 sm:grid-cols-3">
        <input name="title" className="field h-10 sm:col-span-3" placeholder="제목 (예: 인조대리석 상판 UV코팅)" required />
        <input name="material" className="field h-10" placeholder="재질 (상판·포세린·욕실)" />
        <input name="space" className="field h-10" placeholder="공간 (주방·카페·병원)" />
        <input name="region" className="field h-10" placeholder="지역 (인천 송도)" />
        <input name="before_url" className="field h-10" placeholder="시공 전 사진 주소" />
        <input name="after_url" className="field h-10" placeholder="시공 후 사진 주소" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked /> 바로 공개</label>
        <textarea name="body" className="field h-20 py-2 sm:col-span-3" placeholder="한두 줄 설명" />
        <button className="btn-primary h-10 sm:col-span-3">사례 추가</button>
      </form>
      <ul className="mt-6 divide-y divide-border text-sm">
        {cs.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-2 py-2">
            <div>
              <span className="font-semibold">{c.title}</span>
              <span className="ml-2 text-muted">{[c.material, c.space, c.region].filter(Boolean).join(" · ")}</span>
            </div>
            <form action={toggleCase}>
              <input type="hidden" name="id" value={c.id} />
              <input type="hidden" name="published" value={c.published ? "0" : "1"} />
              <button className={c.published ? "badge-soft" : "badge-line"}>{c.published ? "공개 중 → 숨기기" : "숨김 → 공개"}</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
