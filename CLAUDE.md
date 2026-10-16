# nanomall-web

- Next.js 16 App Router + Tailwind v4 + Supabase + OpenNext Cloudflare. Vercel 쓰지 않음.
- Supabase 프로젝트는 SBWorks·나노마스터와 공유. 새 테이블은 반드시 `nm_` 접두. 마이그레이션은 `supabase/migrations/`.
- 비밀 키(`SUPABASE_SECRET_KEY`, `ADMIN_KEY`)는 Cloudflare Secrets 에만. 공개 `NEXT_PUBLIC_*`는 `.env.production`에 커밋.
- 공개 페이지는 `publicClient()`(publishable key, RLS로 published 행만), 접수·관리자는 `adminClient()`.
- 모든 문의 CTA는 카카오톡(`KAKAO_CHAT_URL`). 새 버튼은 `<KakaoLink ref_="위치">`로 만들어 클릭이 집계되게.
- 검사: `npm run lint && npx tsc --noEmit && npm run build:cf`.
- Tailwind v4: `@apply`에 직접 만든 클래스(`btn` 등)는 못 씀. 유틸리티만.
- 데이터는 운영 DB. 가격·일정은 `/admin`이나 SQL로 바꾸고 코드에 하드코딩하지 않음.
