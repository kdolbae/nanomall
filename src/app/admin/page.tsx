import { adminClient, type Inquiry } from "@/lib/supabase";
import { setInquiryStatus } from "./actions";

const KIND: Record<string, string> = { education: "교육", product: "주문", service: "시공", partner: "파트너", general: "상담" };
const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "새 문의", cls: "badge-fill" },
  contacting: { label: "상담 중", cls: "badge-soft" },
  done: { label: "완료", cls: "badge-line" },
  spam: { label: "스팸", cls: "tag" },
};

export default async function AdminInquiries({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const sb = adminClient();
  if (!sb) return <p className="text-warn">SUPABASE_SECRET_KEY 가 없어 문의를 읽을 수 없습니다.</p>;
  let q = sb.from("nm_inquiry").select("*, nm_course(name), nm_product(name)").order("created_at", { ascending: false }).limit(200);
  if (status) q = q.eq("status", status);
  const { data } = await q;
  const rows = (data ?? []) as (Inquiry & { nm_course: { name: string } | null; nm_product: { name: string } | null })[];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">상담·신청</h1>
        <div className="flex gap-1 text-sm">
          {["", "new", "contacting", "done"].map((s) => (
            <a key={s} href={s ? `/admin?status=${s}` : "/admin"} className={`rounded-md px-2 py-1 ${(status ?? "") === s ? "bg-accent text-accent-ink" : "hover:bg-bg-2"}`}>{s ? STATUS[s].label : "전체"}</a>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {rows.length === 0 && <p className="text-muted">문의가 없습니다.</p>}
        {rows.map((r) => (
          <details key={r.id} className="card p-4">
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 text-sm">
              <span className={STATUS[r.status].cls}>{STATUS[r.status].label}</span>
              <span className="tag">{KIND[r.kind]}</span>
              <span className="font-semibold">{r.name}</span>
              <a href={`tel:${r.phone}`} className="tabular-nums text-accent">{r.phone}</a>
              <span className="text-muted">{r.nm_course?.name ?? r.nm_product?.name ?? r.trade ?? ""}</span>
              <span className="ml-auto text-xs text-muted">{new Date(r.created_at).toLocaleString("ko-KR")}</span>
            </summary>
            <div className="mt-3 grid gap-2 text-sm">
              {r.message && <p className="whitespace-pre-wrap">{r.message}</p>}
              <div className="text-muted">
                {r.trade && <>업종 {r.trade} · </>}
                {r.region && <>지역 {r.region} · </>}
                {r.email && <>{r.email} · </>}
                {Object.keys(r.extra ?? {}).length > 0 && <>{Object.entries(r.extra).filter(([, v]) => v).map(([k, v]) => `${k}: ${String(v)}`).join(" · ")} · </>}
                {r.path && <>경로 {r.path}</>}
                {Object.keys(r.utm ?? {}).length > 0 && <> · {Object.entries(r.utm).map(([k, v]) => `${k.replace("utm_", "")}=${v}`).join(" ")}</>}
              </div>
              <form action={setInquiryStatus} className="flex flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={r.id} />
                <select name="status" defaultValue={r.status} className="field h-9 w-32">
                  {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <input name="note" defaultValue={r.note ?? ""} className="field h-9 flex-1" placeholder="메모" />
                <button className="btn-outline h-9 px-3 text-sm">저장</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
