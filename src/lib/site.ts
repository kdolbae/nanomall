// 사이트 전역 상수. 회사 정보·메뉴·연락처는 여기서만 고친다.

export const SITE = {
  name: "나노몰",
  nameEn: "NANOMALL",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nanomall.kr",
  tagline: "독일 나노폴 코팅으로 배우는 홈케어 코팅 기술",
  description:
    "나노몰은 독일 나노폴(NANOPOOL) 정품 코팅제로 나노코팅·UV상판코팅·포세린 스케일링 교육을 하고, 수료생과 전문가에게 코팅제를 공급하는 홈케어 코팅 아카데미입니다.",
};

export const COMPANY = {
  legalName: "나노몰",
  ceo: "김성배",
  bizNo: "350-07-01581",
  tel: process.env.NEXT_PUBLIC_TEL || "1800-5901",
  email: "pcnanopool@naver.com",
  address: "인천광역시 연수구 송도과학로 80 AIT센터 101동 1506호",
  hours: "평일 09:00~18:00 (점심 12:00~13:00)",
  social: {
    naverBlog: "https://blog.naver.com/nano_mall",
    youtube: "https://www.youtube.com/channel/UCOSFCRqHjL-phGdBh_fUChw",
    instagram: "",
  },
  partner: { name: "NANOPOOL GmbH", nameKo: "나노폴", country: "독일", since: 2002 },
};

/** 카카오톡 채널 채팅 주소. 모든 문의 버튼이 여기로 간다. 나노몰 채널이 생기면 .env.production 만 바꾼다. */
export const KAKAO_CHAT_URL = process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || "http://pf.kakao.com/_udtxexj/chat";

export const NAV = [
  { href: "/education", label: "교육센터" },
  { href: "/store", label: "코팅제 스토어" },
  { href: "/service", label: "시공 서비스" },
  { href: "/cases", label: "시공사례" },
  { href: "/guide", label: "기술자료" },
  { href: "/about", label: "회사소개" },
] as const;

export const MATERIALS = ["상판", "욕실도기", "유리", "포세린석재", "금속", "목재", "섬유", "플라스틱"] as const;
export const USES = ["전문가용", "가정용", "전처리", "도구"] as const;
export const LINES: Record<string, string> = { np: "NP (독일 나노폴)", nanolab: "NANOLAB (가정용)", uv: "UV 코팅제", tool: "도구·장비" };

export const COURSE_KIND_LABEL: Record<string, string> = {
  nano: "나노코팅",
  uv: "UV상판코팅",
  porcelain: "포세린 스케일링",
  package: "창업 패키지",
};

export function won(n: number | null | undefined) {
  if (n == null) return "";
  return n.toLocaleString("ko-KR") + "원";
}

export function fmtDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  const dt = new Date(y, m - 1, day);
  const w = ["일", "월", "화", "수", "목", "금", "토"][dt.getDay()];
  return `${m}월 ${day}일(${w})`;
}
