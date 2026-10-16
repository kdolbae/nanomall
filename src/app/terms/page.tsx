import type { Metadata } from "next";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <div className="container-x prose-k max-w-3xl py-12 text-[15px]">
      <h1 className="text-3xl font-bold">이용약관</h1>
      <p className="mt-2 text-sm text-muted">시행일 2026년 11월 1일</p>
      <h2 className="mt-8 text-xl font-bold">제1조 (목적)</h2>
      <p>이 약관은 {COMPANY.legalName}(이하 ‘회사’)이 운영하는 홈페이지에서 제공하는 교육 안내·신청, 상품 안내·주문 문의, 시공 견적 서비스의 이용 조건을 정합니다.</p>
      <h2 className="mt-8 text-xl font-bold">제2조 (교육 신청과 취소)</h2>
      <p>교육은 상담 후 예약금 입금으로 확정됩니다. 개강 7일 전까지 취소하면 전액, 3일 전까지는 50%를 환불하며, 그 이후에는 다른 기수로 1회 변경할 수 있습니다. 회사 사정으로 개강이 취소되면 전액 환불합니다.</p>
      <h2 className="mt-8 text-xl font-bold">제3조 (상품 주문)</h2>
      <p>홈페이지의 가격은 부가세 포함 소비자가입니다. 주문은 카카오톡 상담으로 확정하며, 결제 방법과 배송 일정은 상담 시 안내합니다. 50,000원 이상 구매 시 배송비는 무료입니다. 개봉하지 않은 제품은 수령 후 7일 안에 반품할 수 있으며, 단순 변심은 왕복 배송비를 부담합니다.</p>
      <h2 className="mt-8 text-xl font-bold">제4조 (시공 서비스)</h2>
      <p>시공 견적은 현장 사진이나 방문 확인 후 확정됩니다. 코팅은 깨진 재질 복원, 깊은 스크래치 제거, 들뜬 마루 보수를 포함하지 않습니다. 시공 후 하자는 시공일로부터 30일 안에 알려 주시면 무상으로 보수합니다.</p>
      <h2 className="mt-8 text-xl font-bold">제5조 (전문가 회원)</h2>
      <p>전문가 회원은 사업자등록증 확인 후 승인되며, 회원가와 혜택은 회사가 정해 공지합니다. 회원가로 구매한 제품을 무단 재판매하면 회원 자격이 취소될 수 있습니다.</p>
      <h2 className="mt-8 text-xl font-bold">제6조 (면책)</h2>
      <p>제품 사용법과 주의사항을 지키지 않아 생긴 손해에 대해 회사는 책임지지 않습니다. 홈페이지의 효과·지속 기간 안내는 제조사 자료 기준이며 사용 환경에 따라 다를 수 있습니다.</p>
      <h2 className="mt-8 text-xl font-bold">제7조 (분쟁)</h2>
      <p>이 약관에 관한 분쟁은 회사 본점 소재지를 관할하는 법원에서 다룹니다.</p>
    </div>
  );
}
