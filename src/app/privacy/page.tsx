import type { Metadata } from "next";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "개인정보처리방침" };

// 템플릿 문구("OOO", "20XX")를 남기지 않도록 모든 값은 site.ts 의 회사 정보에서 가져온다.
export default function PrivacyPage() {
  return (
    <div className="container-x prose-k max-w-3xl py-12 text-[15px]">
      <h1 className="text-3xl font-bold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-muted">시행일 2026년 11월 1일</p>
      <p className="mt-6">{COMPANY.legalName}(이하 ‘회사’)은 개인정보 보호법에 따라 이용자의 개인정보를 보호하고 관련 고충을 신속하게 처리하기 위해 다음과 같이 개인정보처리방침을 둡니다.</p>

      <h2 className="mt-8 text-xl font-bold">1. 수집하는 개인정보와 목적</h2>
      <table className="mt-3 w-full text-sm">
        <thead className="text-left text-muted"><tr><th className="py-2 font-medium">구분</th><th className="py-2 font-medium">항목</th><th className="py-2 font-medium">목적</th></tr></thead>
        <tbody className="divide-y divide-border">
          <tr><td className="py-2">상담·교육 신청</td><td className="py-2">이름, 연락처, (선택) 이메일, 업종, 지역, 문의 내용</td><td className="py-2">상담 연락, 교육 안내</td></tr>
          <tr><td className="py-2">주문·견적 문의</td><td className="py-2">이름, 연락처, 관심 제품, 문의 내용</td><td className="py-2">견적 안내, 배송</td></tr>
          <tr><td className="py-2">전문가 회원 신청</td><td className="py-2">이름, 연락처, 상호, 사업자등록번호, 시공 지역</td><td className="py-2">회원 자격 확인, 회원가 적용</td></tr>
          <tr><td className="py-2">자동 수집</td><td className="py-2">접속 경로(UTM), 누른 버튼, 브라우저 정보, 무작위 방문자 식별값</td><td className="py-2">서비스 개선, 광고 효과 측정</td></tr>
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted">카카오톡 채널 상담에서 주고받는 내용은 카카오의 개인정보처리방침을 함께 따릅니다.</p>

      <h2 className="mt-8 text-xl font-bold">2. 보유 및 이용 기간</h2>
      <p>상담·문의 정보는 상담 완료 후 1년 보관 뒤 파기합니다. 전문가 회원 정보는 회원 탈퇴 시까지 보관합니다. 전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령이 정한 기간(계약·결제 기록 5년, 소비자 불만·분쟁 처리 기록 3년)은 그 기간 동안 보관합니다.</p>

      <h2 className="mt-8 text-xl font-bold">3. 제3자 제공과 처리 위탁</h2>
      <p>회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만 시공 문의를 지역 전문가 회원에게 연결할 때는 이용자의 동의를 받은 뒤 이름·연락처·시공 내용을 전달합니다. 서비스 운영을 위해 다음 업체에 처리를 위탁합니다.</p>
      <ul className="mt-2 list-disc pl-5">
        <li>Supabase Inc. — 데이터베이스 보관(서울 리전)</li>
        <li>Cloudflare, Inc. — 웹사이트 호스팅</li>
        <li>(주)카카오 — 카카오톡 채널 상담</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">4. 이용자의 권리</h2>
      <p>이용자는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다. 아래 보호책임자에게 연락 주시면 지체 없이 처리합니다.</p>

      <h2 className="mt-8 text-xl font-bold">5. 파기 절차</h2>
      <p>보유 기간이 지난 개인정보는 전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄합니다.</p>

      <h2 className="mt-8 text-xl font-bold">6. 안전성 확보 조치</h2>
      <p>개인정보는 접근 권한이 있는 담당자만 볼 수 있도록 접근 통제를 하며, 전송 구간은 암호화(HTTPS)합니다.</p>

      <h2 className="mt-8 text-xl font-bold">7. 개인정보 보호책임자</h2>
      <ul className="mt-2">
        <li>성명: {COMPANY.ceo} (대표)</li>
        <li>연락처: {COMPANY.tel}</li>
        <li>이메일: {COMPANY.email}</li>
      </ul>
      <p className="mt-3 text-sm text-muted">그 밖의 신고·상담: 개인정보침해신고센터(privacy.kisa.or.kr, 118), 개인정보분쟁조정위원회(www.kopico.go.kr, 1833-6972), 대검찰청 사이버수사과(www.spo.go.kr, 1301), 경찰청 사이버수사국(ecrm.police.go.kr, 182)</p>

      <h2 className="mt-8 text-xl font-bold">8. 방침 변경</h2>
      <p>이 방침이 바뀌면 시행 7일 전부터 홈페이지에 공지합니다.</p>
    </div>
  );
}
