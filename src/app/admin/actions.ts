"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { adminClient } from "@/lib/supabase";

async function sb() {
  if (!(await isAdmin())) throw new Error("권한 없음");
  const c = adminClient();
  if (!c) throw new Error("SUPABASE_SECRET_KEY 가 없습니다");
  return c;
}

export async function setInquiryStatus(fd: FormData) {
  const c = await sb();
  await c.from("nm_inquiry").update({ status: String(fd.get("status")), note: String(fd.get("note") ?? "") || null }).eq("id", String(fd.get("id")));
  revalidatePath("/admin");
}

export async function addSession(fd: FormData) {
  const c = await sb();
  await c.from("nm_course_session").insert({
    course_id: String(fd.get("course_id")),
    starts_on: String(fd.get("starts_on")),
    ends_on: String(fd.get("ends_on") || fd.get("starts_on")),
    seats: Number(fd.get("seats") || 6),
    location: String(fd.get("location") || "인천 송도 교육장 (AIT센터)"),
  });
  revalidatePath("/admin/sessions");
  revalidatePath("/education");
}

export async function updateSession(fd: FormData) {
  const c = await sb();
  await c
    .from("nm_course_session")
    .update({ seats_taken: Number(fd.get("seats_taken") || 0), seats: Number(fd.get("seats") || 6), status: String(fd.get("status")) })
    .eq("id", String(fd.get("id")));
  revalidatePath("/admin/sessions");
  revalidatePath("/education");
}

export async function updateProduct(fd: FormData) {
  const c = await sb();
  const member = fd.get("member_price");
  await c
    .from("nm_product")
    .update({
      price: Number(fd.get("price") || 0),
      member_price: member === "" || member == null ? null : Number(member),
      stock_status: String(fd.get("stock_status")),
      published: fd.get("published") === "on",
      image_url: String(fd.get("image_url") ?? "") || null,
    })
    .eq("id", String(fd.get("id")));
  revalidatePath("/admin/products");
  revalidatePath("/store");
  revalidatePath("/");
}

export async function addCase(fd: FormData) {
  const c = await sb();
  await c.from("nm_case").insert({
    title: String(fd.get("title")),
    material: String(fd.get("material") ?? "") || null,
    space: String(fd.get("space") ?? "") || null,
    region: String(fd.get("region") ?? "") || null,
    before_url: String(fd.get("before_url") ?? "") || null,
    after_url: String(fd.get("after_url") ?? "") || null,
    body: String(fd.get("body") ?? "") || null,
    published: fd.get("published") === "on",
  });
  revalidatePath("/admin/cases");
  revalidatePath("/cases");
  revalidatePath("/");
}

export async function toggleCase(fd: FormData) {
  const c = await sb();
  await c.from("nm_case").update({ published: fd.get("published") === "1" }).eq("id", String(fd.get("id")));
  revalidatePath("/admin/cases");
  revalidatePath("/cases");
}

export async function addReview(fd: FormData) {
  const c = await sb();
  await c.from("nm_review").insert({
    name_masked: String(fd.get("name_masked")),
    trade: String(fd.get("trade") ?? "") || null,
    course_id: String(fd.get("course_id") ?? "") || null,
    rating: fd.get("rating") ? Number(fd.get("rating")) : null,
    body: String(fd.get("body")),
    published: fd.get("published") === "on",
  });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function toggleReview(fd: FormData) {
  const c = await sb();
  await c.from("nm_review").update({ published: fd.get("published") === "1" }).eq("id", String(fd.get("id")));
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}
