import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** 공개 읽기 클라이언트(익명 키). RLS 가 published 행만 내준다. 서버 컴포넌트에서 쓴다. */
export function publicClient() {
  if (!url || !publishable) throw new Error("Supabase 환경변수가 없습니다: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  return createClient(url, publishable, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** 시크릿 키 클라이언트(RLS 우회). 문의 저장·관리자 화면 등 서버 전용. 브라우저로 절대 내보내지 않는다. */
export function adminClient() {
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

// ───── 타입 (nm_ 테이블) ─────
export type CurriculumItem = { time: string; title: string; desc?: string };
export type Course = {
  id: string;
  slug: string;
  name: string;
  kind: "nano" | "uv" | "porcelain" | "package";
  days: number;
  hours: number;
  capacity: number;
  price: number;
  promise: string;
  summary: string;
  recommended: string[];
  not_recommended: string[];
  curriculum: { day: number; items: CurriculumItem[] }[];
  includes: string[];
  payback: { per_job_price: number; jobs_to_recover: number; note?: string } | null;
  faq: { q: string; a: string }[];
  instructor: string | null;
  published: boolean;
  sort: number;
};
export type CourseSession = {
  id: string;
  course_id: string;
  starts_on: string;
  ends_on: string;
  seats: number;
  seats_taken: number;
  location: string;
  status: "open" | "closed" | "done";
};
export type ProductDetails = {
  materials?: string[];
  coverage_m2?: string;
  cure?: string;
  pretreat?: string;
  usage?: string;
  caution?: string;
  msds_url?: string;
  video_url?: string;
};
export type Product = {
  id: string;
  slug: string;
  name: string;
  line: "np" | "nanolab" | "uv" | "tool";
  material_tags: string[];
  use_tags: string[];
  volume_ml: number | null;
  price: number;
  member_price: number | null;
  pro_only: boolean;
  summary: string;
  details: ProductDetails;
  related_slugs: string[];
  image_url: string | null;
  stock_status: "in_stock" | "low" | "out";
  published: boolean;
  sort: number;
};
export type Case = {
  id: string;
  title: string;
  material: string | null;
  space: string | null;
  region: string | null;
  before_url: string | null;
  after_url: string | null;
  body: string | null;
  published: boolean;
  created_at: string;
};
export type Review = {
  id: string;
  name_masked: string;
  trade: string | null;
  course_id: string | null;
  rating: number | null;
  body: string;
  photo_url: string | null;
  published: boolean;
  created_at: string;
};
export type Inquiry = {
  id: string;
  kind: "education" | "product" | "service" | "partner" | "general";
  name: string;
  phone: string;
  email: string | null;
  course_id: string | null;
  product_id: string | null;
  trade: string | null;
  region: string | null;
  message: string | null;
  extra: Record<string, unknown>;
  source: string;
  utm: Record<string, string>;
  path: string | null;
  status: "new" | "contacting" | "done" | "spam";
  note: string | null;
  created_at: string;
};

// ───── 공개 조회 ─────
export async function listCourses() {
  const { data } = await publicClient().from("nm_course").select("*").eq("published", true).order("sort");
  return (data ?? []) as Course[];
}
export async function getCourse(slug: string) {
  const { data } = await publicClient().from("nm_course").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return (data as Course | null) ?? null;
}
export async function listSessions(courseId?: string) {
  let q = publicClient()
    .from("nm_course_session")
    .select("*")
    .eq("status", "open")
    .gte("starts_on", new Date().toISOString().slice(0, 10))
    .order("starts_on");
  if (courseId) q = q.eq("course_id", courseId);
  const { data } = await q;
  return (data ?? []) as CourseSession[];
}
export async function listProducts() {
  const { data } = await publicClient().from("nm_product").select("*").eq("published", true).order("sort");
  return (data ?? []) as Product[];
}
export async function getProduct(slug: string) {
  const { data } = await publicClient().from("nm_product").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return (data as Product | null) ?? null;
}
export async function listCases() {
  const { data } = await publicClient().from("nm_case").select("*").eq("published", true).order("sort").order("created_at", { ascending: false });
  return (data ?? []) as Case[];
}
export async function listReviews(limit = 12) {
  const { data } = await publicClient().from("nm_review").select("*").eq("published", true).order("created_at", { ascending: false }).limit(limit);
  return (data ?? []) as Review[];
}
