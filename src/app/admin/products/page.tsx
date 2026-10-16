import { adminClient, type Product } from "@/lib/supabase";
import { LINES } from "@/lib/site";
import { updateProduct } from "../actions";

export default async function AdminProducts() {
  const sb = adminClient();
  if (!sb) return <p className="text-warn">SUPABASE_SECRET_KEY 가 없습니다.</p>;
  const { data } = await sb.from("nm_product").select("*").order("sort");
  const ps = (data ?? []) as Product[];
  return (
    <div>
      <h1 className="text-xl font-bold">상품</h1>
      <p className="mt-1 text-sm text-muted">가격·회원가·재고·공개·사진 주소만 여기서 고칩니다. 설명·사용법은 SQL(nm_product.details)로 고칩니다.</p>
      <div className="mt-4 grid gap-2">
        {ps.map((p) => (
          <form key={p.id} action={updateProduct} className="card grid items-center gap-2 p-3 text-sm sm:grid-cols-[1fr_110px_110px_110px_1fr_auto_auto]">
            <input type="hidden" name="id" value={p.id} />
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-muted">{LINES[p.line]} · {p.material_tags.join("·")}</div>
            </div>
            <input type="number" name="price" defaultValue={p.price} className="field h-9" title="일반가" />
            <input type="number" name="member_price" defaultValue={p.member_price ?? ""} className="field h-9" placeholder="회원가" />
            <select name="stock_status" defaultValue={p.stock_status} className="field h-9">
              <option value="in_stock">재고 있음</option><option value="low">재고 적음</option><option value="out">품절</option>
            </select>
            <input name="image_url" defaultValue={p.image_url ?? ""} className="field h-9" placeholder="사진 주소(https://…)" />
            <label className="flex items-center gap-1"><input type="checkbox" name="published" defaultChecked={p.published} /> 공개</label>
            <button className="btn-outline h-9 px-3">저장</button>
          </form>
        ))}
      </div>
    </div>
  );
}
