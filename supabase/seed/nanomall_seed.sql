-- 나노몰 초기 데이터. 가격·커리큘럼은 기획안의 제안값이라 관리자 화면(/admin)이나 SQL 로 바로 고치면 된다.
-- 다시 실행해도 되게 slug 기준 upsert.

insert into public.nm_course (slug, name, kind, days, hours, capacity, price, promise, summary, recommended, not_recommended, curriculum, includes, payback, faq, instructor, published, sort) values
('nano-coating', '나노코팅 교육', 'nano', 1, 7, 6, 490000,
 '하루면 욕실·주방 나노코팅 시공을 혼자 할 수 있습니다',
 '독일 나노폴(NP) 정품 코팅제로 재질 판별부터 전처리, 도포, 견적까지 하루에 배우는 입문 과정. 입주청소·줄눈 사업자가 코팅 옵션을 바로 추가할 수 있게 짰습니다.',
 array['입주청소·줄눈 사업을 하면서 건당 단가를 올리고 싶은 분','소자본으로 홈케어 창업을 준비하는 분','인테리어·가구 A/S 로 상판·욕실 보호 시공이 필요한 분'],
 array['직접 시공 없이 제품만 구매하실 분(스토어에서 바로 구매하세요)','하루 교육 뒤 연습 없이 바로 고가 현장을 맡으려는 분'],
 '[{"day":1,"items":[
   {"time":"09:30","title":"재질 판별","desc":"유리·도기·인조대리석·엔지니어드스톤·금속·석재를 사진과 실물로 구분하기"},
   {"time":"10:30","title":"전처리(NP Preclean)","desc":"기존 왁스·발수제·물때 제거, 전처리가 결과의 80%"},
   {"time":"11:30","title":"유리·도기 코팅 실습","desc":"샤워부스 유리, 세면대, 변기 도포·버핑"},
   {"time":"13:30","title":"주방 상판·금속 코팅 실습","desc":"싱크볼·수전·상판 도포, 경화 시간 안내"},
   {"time":"15:00","title":"불량 사례와 해결","desc":"얼룩·무지개 현상·뭉침의 원인과 재시공 요령"},
   {"time":"16:00","title":"견적과 고객 안내","desc":"면적별 재료비 계산, 견적서 양식, 관리방법 안내문"},
   {"time":"17:00","title":"수료·키트 전달","desc":"수료증, 스타터 키트, 수료생 회원가 안내"}]}]',
 array['실습 재료 전부(NP 코팅제·전처리제·도포 도구)','스타터 키트(소용량 코팅제 세트·도포 패드)','수료증','수료 후 재교육 1회 무료','전문가 회원가(코팅제 15~20% 할인)','중식'],
 '{"per_job_price":250000,"jobs_to_recover":2,"note":"욕실 1개소 나노코팅 시공 평균 25만 원 기준, 2건이면 교육비 회수"}',
 '[{"q":"초보자도 가능한가요?","a":"네. 재질 판별부터 시작하고 1인 실습대에서 직접 도포합니다. 정원 6명이라 한 명씩 봐 드립니다."},
   {"q":"장비를 따로 사야 하나요?","a":"나노코팅은 UV 장비가 필요 없습니다. 도포 패드와 극세사 타월 정도이며 키트에 포함됩니다."},
   {"q":"교육 후 코팅제는 어디서 사나요?","a":"나노몰 스토어에서 수료생 회원가로 구매하실 수 있습니다. 교육에서 쓴 제품 그대로입니다."}]',
 '나노몰 교육팀', true, 10),

('uv-countertop', 'UV상판코팅 교육', 'uv', 2, 14, 4, 790000,
 '2일이면 상판 UV코팅 현장에 투입할 수 있습니다',
 '인조대리석·엔지니어드스톤·세라믹 상판을 구분하고, 마스킹·연마·UV 도포·경화·불량 대처까지 실제 상판 목업으로 2일 동안 반복 실습합니다.',
 array['나노코팅을 이미 하면서 고단가 상판 시공을 추가하고 싶은 분','주방가구·인테리어 A/S 기사','입주·구축 리폼 시공을 하는 분'],
 array['연마기·UV 램프 장비 구매 계획이 전혀 없는 분','하루 안에 끝내고 싶은 분(이 과정은 2일입니다)'],
 '[{"day":1,"items":[
   {"time":"09:30","title":"상판 재질 구분","desc":"인조대리석 / 엔지니어드스톤 / 세라믹, 재질별 공법 차이"},
   {"time":"10:30","title":"마스킹과 보양","desc":"싱크볼·수전·벽면 보호, 분진 관리"},
   {"time":"11:30","title":"연마 실습","desc":"샌딩 순서, 집진기 사용, 스크래치·얼룩 제거"},
   {"time":"13:30","title":"UV코팅제 도포","desc":"도포량·방향·겹침, 기포 없이 펴기"},
   {"time":"15:00","title":"UV 경화","desc":"램프 거리·속도, 경화 확인(발수 테스트)"},
   {"time":"16:30","title":"1일차 정리","desc":"체크리스트, 질의응답"}]},
  {"day":2,"items":[
   {"time":"09:30","title":"불량 사례","desc":"박리·기포·오렌지필·경화 불량의 원인과 해결"},
   {"time":"10:30","title":"엔지니어드스톤 공법","desc":"연마 대신 유막 제거·박리 후 나노세라믹 코팅"},
   {"time":"13:00","title":"실전 모의 시공","desc":"U자형 상판 목업 1개를 처음부터 끝까지(약 2시간)"},
   {"time":"15:30","title":"견적·영업","desc":"형태·길이·아일랜드별 견적, 교체 대비 비용 설명법"},
   {"time":"16:30","title":"수료","desc":"수료증, 장비·재료 구매 안내, 회원가"}]}]',
 array['실습 재료 전부(UV코팅제·연마지·마스킹)','상판 목업 1인 1개','수료증','재교육 1회 무료','UV코팅제·장비 전문가 회원가','중식 2회'],
 '{"per_job_price":300000,"jobs_to_recover":3,"note":"U자형 상판 UV코팅 1건 30만 원(부가세 별도) 기준, 3건이면 교육비 회수. 장비는 별도"}',
 '[{"q":"장비 비용은 얼마인가요?","a":"연마기·집진기·UV 램프를 갖추면 보통 수백만 원대입니다. 수료생에게는 제휴 가격으로 안내하며, 창업 패키지에 포함할 수 있습니다."},
   {"q":"나노코팅 교육을 먼저 들어야 하나요?","a":"필수는 아니지만 재질 판별·전처리 기초가 있으면 훨씬 수월합니다. 두 과정을 함께 들으면 할인됩니다."}]',
 '나노몰 교육팀', true, 20),

('porcelain-scaling', '포세린 스케일링 교육', 'porcelain', 1, 7, 4, 590000,
 '무광 포세린 타일을 처음 색으로 되돌리고 코팅으로 지킵니다',
 '평당 30만~70만 원짜리 포세린 바닥이 누렇게 변하기 전에 기계 세척(스케일링)으로 오염을 빼고 NP 석재용 코팅으로 보호하는 과정. 병원·카페·매장 정기관리 계약으로 이어지는 상업공간 시공을 배웁니다.',
 array['상업공간(병원·카페·매장) 정기관리 계약을 만들고 싶은 분','입주청소에서 바닥 코팅 옵션을 추가하고 싶은 분','나노코팅 수료생으로 고단가 시공을 늘리고 싶은 분'],
 array['스크러버 등 바닥 장비를 전혀 쓰지 않을 분'],
 '[{"day":1,"items":[
   {"time":"09:30","title":"포세린·폴리싱 타일 구분","desc":"무광 포세린이 더러워지는 원리, 셀프 코팅 실패 사례"},
   {"time":"10:30","title":"오염 원인별 세제 선택","desc":"기름·혈액·소독제·흙먼지, 기존 피막 제거"},
   {"time":"11:30","title":"스크러버·패드 운용","desc":"기계 세척 순서, 모서리·벽면 손작업"},
   {"time":"13:30","title":"헹굼·중화·건조","desc":"잔여물 중화, 건조 확인"},
   {"time":"14:30","title":"NP 1K Stone 코팅 실습","desc":"타일 단위 도포, 무광 질감 유지"},
   {"time":"16:00","title":"정기관리 계약 만들기","desc":"평당 견적, 월 정기관리 제안서, 유지 안내"}]}]',
 array['실습 재료(세제·패드·NP 1K Stone)','수료증','재교육 1회 무료','전문가 회원가','정기관리 제안서 양식','중식'],
 '{"per_job_price":600000,"jobs_to_recover":1,"note":"상업공간 20평 스케일링+코팅 1건 기준. 월 정기관리 계약으로 반복 매출"}',
 '[{"q":"장비는 무엇이 필요한가요?","a":"저속 스크러버(또는 폴리셔)와 습식 청소기입니다. 보유 장비가 있으면 그대로 쓰시면 됩니다."}]',
 '나노몰 교육팀', true, 30),

('coating-master', '코팅 마스터 (3과정 통합)', 'package', 4, 28, 4, 1590000,
 '나노코팅 + UV상판코팅 + 포세린 스케일링을 4일에',
 '세 과정을 이어서 듣고 15% 할인. 창업 패키지(장비·초도 코팅제·숨고/당근 프로필 세팅·견적서 양식)로 확장할 수 있습니다.',
 array['홈케어 코팅으로 본격 창업하실 분','세 가지 시공을 한 번에 갖추고 싶은 기존 사업자'],
 array[]::text[],
 '[]',
 array['세 과정 실습 재료 전부','수료증 3종','재교육 각 1회','전문가 회원가','견적서·정기관리 제안서 양식','창업 패키지(장비·초도 물량) 선택 가능'],
 '{"per_job_price":300000,"jobs_to_recover":6,"note":"개별 합산 1,870,000원 대비 15% 할인"}',
 '[]',
 '나노몰 교육팀', true, 40)
on conflict (slug) do update set
  name=excluded.name, kind=excluded.kind, days=excluded.days, hours=excluded.hours, capacity=excluded.capacity, price=excluded.price,
  promise=excluded.promise, summary=excluded.summary, recommended=excluded.recommended, not_recommended=excluded.not_recommended,
  curriculum=excluded.curriculum, includes=excluded.includes, payback=excluded.payback, faq=excluded.faq, instructor=excluded.instructor,
  published=excluded.published, sort=excluded.sort;

-- 개강 일정(예시). 실제 일정으로 바꿀 것.
insert into public.nm_course_session (course_id, starts_on, ends_on, seats, seats_taken, location, status)
select c.id, s.starts_on, s.ends_on, c.capacity, 0, '인천 송도 교육장 (AIT센터)', 'open'
from (values
  ('nano-coating', date '2026-11-14', date '2026-11-14'),
  ('nano-coating', date '2026-11-28', date '2026-11-28'),
  ('nano-coating', date '2026-12-12', date '2026-12-12'),
  ('uv-countertop', date '2026-11-20', date '2026-11-21'),
  ('uv-countertop', date '2026-12-18', date '2026-12-19'),
  ('porcelain-scaling', date '2026-12-05', date '2026-12-05'),
  ('coating-master', date '2026-12-14', date '2026-12-17')
) as s(slug, starts_on, ends_on)
join public.nm_course c on c.slug = s.slug
where not exists (select 1 from public.nm_course_session x where x.course_id = c.id and x.starts_on = s.starts_on);

-- 상품: 현재 nanomall.kr 판매 목록 그대로(가격 포함). 시공 면적·경화 시간은 제조사 자료 확인 후 채운다.
insert into public.nm_product (slug, name, line, material_tags, use_tags, volume_ml, price, member_price, pro_only, summary, details, related_slugs, published, sort) values
('np-glass-ceramic', 'NP Glass & Ceramic', 'np', array['욕실도기','유리'], array['전문가용'], 500, 247500, 210000, false,
 '샤워부스 유리·세면대·변기 등 유리와 도기 표면용 전문가 코팅제. 발수·방오, 물때 억제.',
 '{"materials":["유리","도기(세면대·변기)","타일 유약면"],"coverage_m2":"","cure":"","pretreat":"NP Preclean 으로 물때·기존 피막 제거 후 완전 건조","usage":"극세사 패드에 소량 적셔 얇게 도포 → 5~10분 후 마른 타월로 버핑","caution":"환기, 장갑 착용. 도포 후 경화 시간 동안 물 사용 금지","msds_url":"","video_url":""}',
 array['np-preclean','np-metal'], true, 10),
('np-metal', 'NP Metal', 'np', array['금속'], array['전문가용'], 500, 275000, 235000, false,
 '수전·싱크볼·스테인리스 등 금속 표면용. 물자국·지문·부식 억제.',
 '{"materials":["스테인리스","크롬 수전","알루미늄"],"coverage_m2":"","cure":"","pretreat":"탈지 후 건조","usage":"얇게 도포 후 버핑","caution":"","msds_url":"","video_url":""}',
 array['np-preclean','np-glass-ceramic'], true, 20),
('np-plastic', 'NP Plastic', 'np', array['플라스틱'], array['전문가용'], 500, 275000, 235000, false,
 '아크릴 욕조·플라스틱 가전·가구 표면용 코팅제.',
 '{"materials":["아크릴","ABS","PVC"],"coverage_m2":"","cure":"","pretreat":"","usage":"","caution":"","msds_url":"","video_url":""}',
 array['np-preclean'], true, 30),
('np-1k-stone', 'NP 1K Stone', 'np', array['포세린석재'], array['전문가용'], 500, 123750, 105000, false,
 '포세린 타일·천연석·콘크리트 등 흡수성 석재용 침투형 보호 코팅제. 무광 질감 유지.',
 '{"materials":["포세린 타일","대리석·화강암","콘크리트·테라조"],"coverage_m2":"","cure":"","pretreat":"스케일링(기계 세척) 후 완전 건조","usage":"","caution":"","msds_url":"","video_url":""}',
 array['np-preclean'], true, 40),
('np-wood', 'NP Wood', 'np', array['목재'], array['전문가용'], 500, 412500, 350000, false,
 '원목·마루·데크 등 목재 표면용 보호 코팅제.',
 '{"materials":["원목 가구","강마루·원목마루","데크"],"coverage_m2":"","cure":"","pretreat":"","usage":"","caution":"","msds_url":"","video_url":""}',
 array['np-preclean'], true, 50),
('np-textile', 'NP Textile', 'np', array['섬유'], array['전문가용'], 500, 134750, 115000, false,
 '소파·매트리스·커튼 등 섬유용 발수·방오 코팅제.',
 '{"materials":["패브릭 소파","매트리스","카펫·커튼"],"coverage_m2":"","cure":"","pretreat":"","usage":"","caution":"","msds_url":"","video_url":""}',
 array[]::text[], true, 60),
('np-preclean', 'NP Preclean', 'np', array['욕실도기','유리','금속','플라스틱','포세린석재'], array['전처리'], 500, 41250, 35000, false,
 '코팅 전 필수 전처리제. 물때·기존 왁스·발수제·유막을 제거해 코팅이 표면에 붙게 합니다.',
 '{"materials":["모든 코팅 대상 표면"],"coverage_m2":"","cure":"","pretreat":"","usage":"분사 후 패드로 닦고 물로 헹군 뒤 완전 건조","caution":"","msds_url":"","video_url":""}',
 array['np-glass-ceramic','np-metal','np-1k-stone'], true, 5),
('nanolab-glass-ceramic', 'NANOLAB 유리&도기', 'nanolab', array['욕실도기','유리'], array['가정용'], 500, 88000, null, false,
 '가정에서 직접 하는 욕실 유리·도기 셀프 코팅제.',
 '{"materials":["샤워부스 유리","세면대·변기"],"coverage_m2":"","cure":"","pretreat":"","usage":"","caution":"","msds_url":"","video_url":""}',
 array['nanolab-glass-ceramic-premium'], true, 110),
('nanolab-plastic', 'NANOLAB 플라스틱', 'nanolab', array['플라스틱'], array['가정용'], 500, 88000, null, false,
 '가정용 플라스틱·아크릴 표면 셀프 코팅제.', '{}', array['nanolab-plastic-premium'], true, 120),
('nanolab-metal', 'NANOLAB 금속', 'nanolab', array['금속'], array['가정용'], 500, 88000, null, false,
 '가정용 수전·싱크볼 금속 셀프 코팅제.', '{}', array['nanolab-metal-premium'], true, 130),
('nanolab-glass-ceramic-premium', '[프리미엄] NANOLAB 유리&도기', 'nanolab', array['욕실도기','유리'], array['가정용'], 500, 143000, null, false,
 '지속력을 높인 프리미엄 가정용 유리·도기 코팅제.', '{}', array['nanolab-glass-ceramic'], true, 140),
('nanolab-plastic-premium', '[프리미엄] NANOLAB 플라스틱', 'nanolab', array['플라스틱'], array['가정용'], 500, 143000, null, false,
 '프리미엄 가정용 플라스틱 코팅제.', '{}', array['nanolab-plastic'], true, 150),
('nanolab-metal-premium', '[프리미엄] NANOLAB 금속', 'nanolab', array['금속'], array['가정용'], 500, 143000, null, false,
 '프리미엄 가정용 금속 코팅제.', '{}', array['nanolab-metal'], true, 160),
('uv-countertop-coat', 'UV 상판코팅제 (전문가 전용)', 'uv', array['상판'], array['전문가용'], 1000, 0, null, true,
 '인조대리석 상판 연마 후 도포하는 UV 경화형 코팅제. UV 램프 경화 장비와 교육 수료가 필요해 수료생·사업자에게만 판매합니다. 가격은 카카오톡으로 문의.',
 '{"materials":["인조대리석 상판","아일랜드 식탁"],"coverage_m2":"","cure":"UV 램프 경화","pretreat":"연마·분진 제거","usage":"","caution":"UV 램프 사용 시 보안경·장갑","msds_url":"","video_url":""}',
 array['np-preclean'], true, 200)
on conflict (slug) do update set
  name=excluded.name, line=excluded.line, material_tags=excluded.material_tags, use_tags=excluded.use_tags, volume_ml=excluded.volume_ml,
  price=excluded.price, member_price=excluded.member_price, pro_only=excluded.pro_only, summary=excluded.summary, details=excluded.details,
  related_slugs=excluded.related_slugs, published=excluded.published, sort=excluded.sort;
