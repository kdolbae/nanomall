import { NextResponse } from "next/server";
import { adminClient } from "@/lib/supabase";

export const runtime = "nodejs";

/** 전환 버튼 클릭 기록. 개인정보는 받지 않는다(kind·ref·path·visitor_id·utm 만). */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const kind = String(body.kind ?? "").slice(0, 40);
  if (!kind) return NextResponse.json({ ok: false }, { status: 400 });
  const sb = adminClient();
  if (!sb) return NextResponse.json({ ok: true, stored: false });
  await sb.from("nm_event").insert({
    kind,
    ref: body.ref ? String(body.ref).slice(0, 120) : null,
    path: body.path ? String(body.path).slice(0, 200) : null,
    visitor_id: body.visitor_id ? String(body.visitor_id).slice(0, 64) : null,
    utm: typeof body.utm === "object" && body.utm ? body.utm : {},
    user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
  });
  return NextResponse.json({ ok: true });
}
