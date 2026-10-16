import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-muted">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <Link href="/" className="btn-primary mt-6">처음으로</Link>
    </div>
  );
}
