import { adminClient } from "@/lib/supabase";

function sinceDays(d: number) {
  return new Date(Date.now() - d * 86400_000).toISOString();
}

type Row = { kind: string; ref: string | null; n: number };

export default async function AdminStats() {
  const sb = adminClient();
  if (!sb) return <p className="text-warn">SUPABASE_SECRET_KEY 가 없습니다.</p>;
  const since = sinceDays(30);
  const [{ data: events }, { data: inquiries }] = await Promise.all([
    sb.from("nm_event").select("kind, ref").gte("created_at", since).limit(5000),
    sb.from("nm_inquiry").select("kind, status").gte("created_at", since),
  ]);
  const agg = new Map<string, Row>();
  for (const e of (events ?? []) as { kind: string; ref: string | null }[]) {
    const k = `${e.kind}|${e.ref ?? ""}`;
    const r = agg.get(k) ?? { kind: e.kind, ref: e.ref, n: 0 };
    r.n++;
    agg.set(k, r);
  }
  const rows = [...agg.values()].sort((a, b) => b.n - a.n);
  const inq = (inquiries ?? []) as { kind: string; status: string }[];
  const kakao = rows.filter((r) => r.kind === "kakao_click").reduce((s, r) => s + r.n, 0);
  const calls = rows.filter((r) => r.kind === "call_click").reduce((s, r) => s + r.n, 0);
  return (
    <div>
      <h1 className="text-xl font-bold">전환 통계 (최근 30일)</h1>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[["카카오톡 버튼 클릭", kakao], ["전화 버튼 클릭", calls], ["폼 접수", inq.length]].map(([l, n]) => (
          <div key={l as string} className="card p-4">
            <div className="text-sm text-muted">{l}</div>
            <div className="text-2xl font-bold tabular-nums">{n}</div>
          </div>
        ))}
      </div>
      <h2 className="mt-8 font-bold">어떤 버튼이 상담을 만드나</h2>
      <table className="mt-2 w-full text-sm">
        <thead className="text-left text-muted"><tr><th className="py-2 font-medium">종류</th><th className="py-2 font-medium">위치</th><th className="py-2 text-right font-medium">횟수</th></tr></thead>
        <tbody className="divide-y divide-border">
          {rows.slice(0, 40).map((r) => (
            <tr key={`${r.kind}|${r.ref}`}><td className="py-1.5">{r.kind}</td><td className="py-1.5 text-muted">{r.ref}</td><td className="py-1.5 text-right tabular-nums">{r.n}</td></tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-8 font-bold">접수 종류별</h2>
      <ul className="mt-2 text-sm">
        {["education", "product", "service", "partner", "general"].map((k) => {
          const xs = inq.filter((i) => i.kind === k);
          return <li key={k}>{k}: {xs.length}건 (완료 {xs.filter((i) => i.status === "done").length})</li>;
        })}
      </ul>
    </div>
  );
}
