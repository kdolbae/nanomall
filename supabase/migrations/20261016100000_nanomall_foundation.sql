-- 나노몰(nanomall.kr) 홈페이지 테이블.
-- Supabase 는 나노마스터 홈페이지 프로젝트(ckeimtspznnuacbxgxgu) 공용이라 집대리(jipdaeri)·나노마스터 테이블과
-- 같은 public 스키마를 나눠 쓴다. 겹치지 않게 모든 이름을 nm_ 으로 시작한다.
-- 공개 읽기(published 행만)는 익명 키로, 쓰기(문의·신청·이벤트·관리)는 서버의 시크릿 키로만 한다.

create extension if not exists pgcrypto;

-- 공통: updated_at 자동 갱신
create or replace function public.nm_touch_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ───────────── 교육 과정 ─────────────
create table if not exists public.nm_course (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  kind text not null check (kind in ('nano','uv','porcelain','package')),
  days int not null default 1,
  hours int not null default 7,
  capacity int not null default 6,
  price int not null,                       -- 원, 부가세 포함
  promise text not null,                    -- 한 줄 약속
  summary text not null,
  recommended text[] not null default '{}',
  not_recommended text[] not null default '{}',
  curriculum jsonb not null default '[]',   -- [{day:1, items:[{time:"09:00", title:"", desc:""}]}]
  includes text[] not null default '{}',
  payback jsonb,                            -- {per_job_price:300000, jobs_to_recover:3, note:""}
  faq jsonb not null default '[]',          -- [{q:"",a:""}]
  instructor text,
  published boolean not null default false,
  sort int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.nm_course is '나노몰 교육 과정(나노코팅·UV상판코팅·포세린 스케일링·창업 패키지). 공개 읽기는 published 만.';
create trigger nm_course_touch before update on public.nm_course for each row execute function public.nm_touch_updated_at();

create table if not exists public.nm_course_session (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.nm_course(id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  seats int not null default 6,
  seats_taken int not null default 0,
  location text not null default '인천 송도 교육장',
  status text not null default 'open' check (status in ('open','closed','done')),
  created_at timestamptz not null default now()
);
comment on table public.nm_course_session is '교육 개강 일정. 잔여석 = seats - seats_taken.';
create index if not exists nm_course_session_course_idx on public.nm_course_session(course_id, starts_on);

-- ───────────── 코팅제 상품 ─────────────
create table if not exists public.nm_product (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  line text not null check (line in ('np','nanolab','uv','tool')),
  material_tags text[] not null default '{}', -- 상판·욕실도기·유리·포세린석재·금속·목재·섬유·플라스틱
  use_tags text[] not null default '{}',      -- 전문가용·가정용·전처리·도구
  volume_ml int,
  price int not null,                          -- 일반가(원)
  member_price int,                            -- 전문가 회원가(원), null 이면 없음
  pro_only boolean not null default false,     -- UV코팅제처럼 장비·교육 필요 → 회원만 구매
  summary text not null default '',
  details jsonb not null default '{}',         -- {materials:[], coverage_m2:"", cure:"", pretreat:"", usage:"", caution:"", msds_url:"", video_url:""}
  related_slugs text[] not null default '{}',
  image_url text,
  stock_status text not null default 'in_stock' check (stock_status in ('in_stock','low','out')),
  published boolean not null default false,
  sort int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.nm_product is '나노몰 코팅제·도구 상품. 주문은 카카오톡 상담으로 받고 결제는 아직 사이트에서 하지 않는다.';
create trigger nm_product_touch before update on public.nm_product for each row execute function public.nm_touch_updated_at();

-- ───────────── 시공사례·후기 ─────────────
create table if not exists public.nm_case (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  material text,         -- 상판·포세린·욕실 등
  space text,            -- 주방·욕실·카페·병원 등
  region text,
  before_url text,
  after_url text,
  body text,
  published boolean not null default false,
  sort int not null default 100,
  created_at timestamptz not null default now()
);
comment on table public.nm_case is '시공사례(전·후 사진). 사진 파일은 R2 나 Supabase Storage 주소.';

create table if not exists public.nm_review (
  id uuid primary key default gen_random_uuid(),
  name_masked text not null,   -- 예: 김○수
  trade text,                  -- 입주청소 / 줄눈 / 예비 창업
  course_id uuid references public.nm_course(id) on delete set null,
  rating int check (rating between 1 and 5),
  body text not null,
  photo_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
comment on table public.nm_review is '수강·시공 후기. 실명은 저장하지 않고 가린 이름만.';

-- ───────────── 문의·신청 (개인정보 — 서비스 키 전용) ─────────────
create table if not exists public.nm_inquiry (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('education','product','service','partner','general')),
  name text not null,
  phone text not null,
  email text,
  course_id uuid references public.nm_course(id) on delete set null,
  product_id uuid references public.nm_product(id) on delete set null,
  trade text,                  -- 현재 업종
  region text,
  message text,
  extra jsonb not null default '{}',  -- 파트너 신청: {biz_name, biz_no, areas:[]}
  source text not null default 'form',
  utm jsonb not null default '{}',
  path text,
  status text not null default 'new' check (status in ('new','contacting','done','spam')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.nm_inquiry is '홈페이지 상담·교육 신청·주문 문의·파트너 신청. 개인정보이므로 익명 키로는 읽고 쓸 수 없다(서버 시크릿 키 전용).';
create index if not exists nm_inquiry_status_idx on public.nm_inquiry(status, created_at desc);
create trigger nm_inquiry_touch before update on public.nm_inquiry for each row execute function public.nm_touch_updated_at();

-- ───────────── 행동 기록 (카카오 버튼 클릭 등, 개인정보 없음) ─────────────
create table if not exists public.nm_event (
  id bigint generated always as identity primary key,
  kind text not null,          -- kakao_click | call_click | form_submit | page_view
  path text,
  ref text,                    -- 어떤 버튼·상품·과정에서
  visitor_id text,             -- 브라우저 쿠키 무작위 값
  utm jsonb not null default '{}',
  user_agent text,
  created_at timestamptz not null default now()
);
comment on table public.nm_event is '전환 버튼 클릭·페이지 보기. 이름·전화번호 금지. 서비스 키 전용.';
create index if not exists nm_event_kind_idx on public.nm_event(kind, created_at desc);

-- ───────────── RLS ─────────────
alter table public.nm_course enable row level security;
alter table public.nm_course_session enable row level security;
alter table public.nm_product enable row level security;
alter table public.nm_case enable row level security;
alter table public.nm_review enable row level security;
alter table public.nm_inquiry enable row level security;
alter table public.nm_event enable row level security;

-- 공개 읽기: published 행만 (anon·authenticated)
create policy nm_course_public_read on public.nm_course for select to anon, authenticated using (published);
create policy nm_course_session_public_read on public.nm_course_session for select to anon, authenticated
  using (exists (select 1 from public.nm_course c where c.id = course_id and c.published));
create policy nm_product_public_read on public.nm_product for select to anon, authenticated using (published);
create policy nm_case_public_read on public.nm_case for select to anon, authenticated using (published);
create policy nm_review_public_read on public.nm_review for select to anon, authenticated using (published);
-- nm_inquiry·nm_event 는 정책 없음 = 익명·로그인 사용자 접근 불가. service_role 만.
