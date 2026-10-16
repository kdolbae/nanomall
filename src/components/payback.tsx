"use client";

import { useState } from "react";
import { won } from "@/lib/site";

/** 수익 계산기: 월 시공 건수 → 예상 월 매출·교육비 회수 기간 */
export function PaybackCalculator({ perJob = 300000, tuition = 790000, label = "상판 UV코팅 1건" }: { perJob?: number; tuition?: number; label?: string }) {
  const [jobs, setJobs] = useState(10);
  const monthly = jobs * perJob;
  const months = monthly > 0 ? Math.max(1, Math.ceil(tuition / monthly)) : 0;
  const jobsToRecover = Math.ceil(tuition / perJob);
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="jobs" className="font-semibold">한 달에 몇 건 시공하시겠어요?</label>
        <span className="text-2xl font-bold tabular-nums">{jobs}건</span>
      </div>
      <input id="jobs" type="range" min={1} max={40} value={jobs} onChange={(e) => setJobs(Number(e.target.value))} className="mt-3 w-full accent-[var(--accent)]" />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <div className="text-sm text-muted">예상 월 매출</div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-accent">{won(monthly)}</div>
          <div className="text-xs text-muted">{label} {won(perJob)} 기준</div>
        </div>
        <div>
          <div className="text-sm text-muted">교육비 회수</div>
          <div className="mt-1 text-2xl font-bold tabular-nums">{jobsToRecover}건</div>
          <div className="text-xs text-muted">교육비 {won(tuition)}</div>
        </div>
        <div>
          <div className="text-sm text-muted">회수 기간</div>
          <div className="mt-1 text-2xl font-bold tabular-nums">약 {months}개월</div>
          <div className="text-xs text-muted">위 건수로 꾸준히 할 때</div>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">재료비·장비·이동 비용은 빠진 매출 기준 계산입니다. 실제 수익은 지역·단가에 따라 다릅니다.</p>
    </div>
  );
}
