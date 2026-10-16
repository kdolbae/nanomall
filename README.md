# nanomall-web

나노몰(nanomall.kr) 홈페이지. Next.js 16 + Supabase + OpenNext(Cloudflare Workers).
SBWorks(sb_app01/manage)와 같은 스택·같은 Supabase 프로젝트를 씁니다. 테이블은 모두 `nm_` 접두.

## 구성

| 영역 | 내용 |
| --- | --- |
| 프레임워크 | Next.js 16 App Router, TypeScript, Tailwind v4 |
| DB | Supabase 프로젝트 `ckeimtspznnuacbxgxgu` (nanomaster, ap-northeast-2), 테이블 `nm_course`, `nm_course_session`, `nm_product`, `nm_case`, `nm_review`, `nm_inquiry`, `nm_event` |
| 배포 | Cloudflare Workers (OpenNext), Workers Builds가 main 푸시마다 배포 |
| 문의 | 모든 문의는 카카오톡 채널 채팅 (`NEXT_PUBLIC_KAKAO_CHAT_URL`). 폼 접수는 `nm_inquiry`에 저장 후 관리자 화면에서 카카오톡/전화로 연락 |
| 관리자 | `/admin` (환경변수 `ADMIN_KEY` 하나로 로그인) |

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # SUPABASE_SECRET_KEY, ADMIN_KEY 채우기
npm run dev
```

공개 키(`NEXT_PUBLIC_*`)는 `.env.production`에 커밋돼 있습니다. 비밀 키는 커밋하지 않습니다.

## 스크립트

| 명령 | 역할 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run lint` / `npx tsc --noEmit` | 린트·타입 검사 |
| `npm run build` | Next 빌드 |
| `npm run build:cf` | OpenNext Cloudflare 번들 (`.open-next/`) |
| `npm run preview` | Cloudflare 런타임으로 로컬 미리보기 |
| `npm run deploy` | 수동 배포 (평소에는 Workers Builds가 함) |

## Cloudflare 배포 설정 (최초 1회)

1. Cloudflare 대시보드 → Workers & Pages → Create → **Import a repository** → `kdolbae/nanomall`.
2. 빌드 설정
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx opennextjs-cloudflare deploy`
   - Root directory: `/`
   - Branch: `main`
3. Worker 이름은 `wrangler.jsonc`의 `nanomall-web`과 같아야 합니다.
4. Settings → Variables and Secrets에 **Secret**으로 추가
   - `SUPABASE_SECRET_KEY` : Supabase 프로젝트의 secret(service_role) 키
   - `ADMIN_KEY` : 관리자 로그인 키 (길고 무작위로)
5. 도메인
   - `nanomall.kr` 존을 Cloudflare로 옮깁니다(현재 아임웹). 네임서버를 Cloudflare로 바꾼 뒤 `wrangler.jsonc`의 `routes`(nanomall.kr, www.nanomall.kr) 가 자동으로 붙습니다.
   - 존을 옮기기 전에는 `workers_dev` 주소(`nanomall-web.<account>.workers.dev`)로 확인합니다. 존이 없는 상태에서 배포가 routes 때문에 실패하면 `routes` 두 줄을 잠시 주석 처리합니다.
6. 첫 배포 뒤 `/admin`에 `ADMIN_KEY`로 로그인해 교육 일정·상품 가격을 확인합니다.

## 카카오톡 채널

`NEXT_PUBLIC_KAKAO_CHAT_URL`이 모든 "카카오톡 상담" 버튼의 목적지입니다. 나노몰 전용 채널이 생기면
`.env.production`의 값을 `http://pf.kakao.com/_xxxx/chat` 형태로 바꿔 커밋합니다.
버튼 클릭은 `/api/track` → `nm_event`에 기록되어 `/admin/stats`에서 봅니다(개인정보 없음).

## DB 변경

`supabase/migrations/` 에 SQL을 추가하고 Supabase에 적용합니다. 시드는 `supabase/seed/`.
공유 프로젝트이므로 `nm_` 접두 없는 테이블은 만들지 않습니다.
