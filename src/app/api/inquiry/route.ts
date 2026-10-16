import { NextResponse } from "next/server";
import { z } from "zod";
import { adminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const schema = z.object({
  kind: z.enum(["education", "product", "service", "partner", "general"]),
  name: z.string().trim().min(1).max(40),
  phone: z
    .string()
    .trim()
    .transform((s) => s.replace(/[^\d]/g, ""))
    .refine((s) => s.length >= 9 && s.length <= 12, "연락처를 확인해 주세요"),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  course_id: z.string().uuid().optional().or(z.literal("")),
  product_id: z.string().uuid().optional().or(z.literal("")),
  trade: z.string().trim().max(60).optional(),
  region: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  extra: z.record(z.string(), z.unknown()).optional(),
  utm: z.record(z.string(), z.string()).optional(),
  path: z.string().max(200).optional(),
  agree: z.literal(true, { message: "개인정보 수집·이용에 동의해 주세요" }),
  // 봇 함정(honeypot): 사람은 비워 둔다
  website: z.string().max(0).optional(),
});

/** 상담·교육 신청·주문 문의·파트너 신청 저장. 저장 뒤 사용자는 카카오톡으로 이어서 상담한다. */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ ok: false, error: first?.message ?? "입력을 확인해 주세요" }, { status: 400 });
  }
  const d = parsed.data;
  const sb = adminClient();
  if (!sb) return NextResponse.json({ ok: false, error: "서버 설정(SUPABASE_SECRET_KEY)이 없습니다" }, { status: 500 });
  const { error } = await sb.from("nm_inquiry").insert({
    kind: d.kind,
    name: d.name,
    phone: d.phone,
    email: d.email || null,
    course_id: d.course_id || null,
    product_id: d.product_id || null,
    trade: d.trade || null,
    region: d.region || null,
    message: d.message || null,
    extra: d.extra ?? {},
    utm: d.utm ?? {},
    path: d.path ?? null,
    source: "form",
  });
  if (error) return NextResponse.json({ ok: false, error: "저장에 실패했습니다. 카카오톡으로 문의해 주세요." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
