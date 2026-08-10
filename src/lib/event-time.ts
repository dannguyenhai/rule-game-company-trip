/**
 * Thời điểm Hướng dẫn được mở: 19:30 ngày 14/08/2026, giờ Việt Nam (UTC+7).
 * Ghi kèm múi giờ nên máy chủ và máy người dùng ở đâu cũng hiểu đúng một mốc.
 */
export const UNLOCK_AT_ISO = "2026-08-14T19:30:00+07:00";
export const UNLOCK_AT_MS = Date.parse(UNLOCK_AT_ISO);

export const UNLOCK_TIME_LABEL = "19:30";
export const UNLOCK_DATE_LABEL = "14.08.2026";
export const UNLOCK_FULL_LABEL = `${UNLOCK_TIME_LABEL} · ${UNLOCK_DATE_LABEL} (giờ Việt Nam)`;
