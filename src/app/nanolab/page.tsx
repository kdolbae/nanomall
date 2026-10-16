import { redirect } from "next/navigation";

// 옛 아임웹 주소(/nanolab) → 가정용 라인 목록
export default function LegacyNanolab() {
  redirect("/store?l=nanolab");
}
