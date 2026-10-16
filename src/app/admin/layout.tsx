import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin, loginWithKey, logout } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "관리자", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function loginAction(fd: FormData) {
  "use server";
  const ok = await loginWithKey(String(fd.get("key") ?? ""));
  redirect(ok ? "/admin" : "/admin?bad=1");
}
async function logoutAction() {
  "use server";
  await logout();
  redirect("/admin");
}

const MENU = [
  { href: "/admin", label: "상담·신청" },
  { href: "/admin/sessions", label: "교육 일정" },
  { href: "/admin/products", label: "상품" },
  { href: "/admin/cases", label: "시공사례" },
  { href: "/admin/reviews", label: "후기" },
  { href: "/admin/stats", label: "전환 통계" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    return (
      <div className="container-x max-w-sm py-20">
        <h1 className="text-xl font-bold">관리자 로그인</h1>
        {!process.env.ADMIN_KEY && <p className="mt-2 text-sm text-warn">ADMIN_KEY 환경변수가 없습니다. Cloudflare Secrets 에 넣어 주세요.</p>}
        <form action={loginAction} className="mt-4 grid gap-2">
          <input name="key" type="password" className="field" placeholder="관리자 키" autoFocus />
          <button className="btn-primary">들어가기</button>
        </form>
      </div>
    );
  }
  return (
    <div className="container-x grid gap-6 py-8 md:grid-cols-[200px_1fr]">
      <aside className="flex gap-1 overflow-x-auto md:flex-col">
        {MENU.map((m) => (
          <Link key={m.href} href={m.href} className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium hover:bg-bg-2">{m.label}</Link>
        ))}
        <form action={logoutAction} className="md:mt-4">
          <button className="rounded-md px-3 py-2 text-sm text-muted hover:bg-bg-2">나가기</button>
        </form>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
