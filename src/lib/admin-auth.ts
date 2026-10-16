import { cookies } from "next/headers";

// 관리자 화면(/admin)은 ADMIN_KEY 하나로 잠근다(SBWorks 처럼 계정 체계를 두기엔 운영자가 1~2명).
// 쿠키에는 키 원문이 아니라 sha-256 해시를 둔다.
const COOKIE = "nm_admin";

async function digest(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function expectedToken() {
  const key = process.env.ADMIN_KEY;
  if (!key) return null;
  return digest(`nm:${key}`);
}

export async function isAdmin() {
  const want = await expectedToken();
  if (!want) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === want;
}

export async function loginWithKey(key: string) {
  const want = await expectedToken();
  if (!want || !process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) return false;
  const c = await cookies();
  c.set(COOKIE, want, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 14 });
  return true;
}

export async function logout() {
  const c = await cookies();
  c.delete(COOKIE);
}
