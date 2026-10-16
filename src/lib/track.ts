// 전환 버튼 클릭 기록(브라우저 → /api/track → nm_event). 이름·전화번호는 보내지 않는다.

function visitorId() {
  try {
    let v = localStorage.getItem("nm.vid");
    if (!v) {
      v = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("nm.vid", v);
    }
    return v;
  } catch {
    return null;
  }
}

export function utmFromLocation(): Record<string, string> {
  try {
    const p = new URLSearchParams(location.search);
    const out: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = p.get(k);
      if (v) out[k] = v;
    }
    if (Object.keys(out).length) sessionStorage.setItem("nm.utm", JSON.stringify(out));
    else {
      const saved = sessionStorage.getItem("nm.utm");
      if (saved) return JSON.parse(saved);
    }
    return out;
  } catch {
    return {};
  }
}

export function track(kind: string, ref?: string) {
  try {
    const body = JSON.stringify({ kind, ref: ref ?? null, path: location.pathname, visitor_id: visitorId(), utm: utmFromLocation() });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    else fetch("/api/track", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
  } catch {
    // 기록 실패는 사용자 흐름을 막지 않는다
  }
}
