import type { Holiday, HolidayQuery } from "../types/models";
import { api } from "../axios";


function buildParams(q?: HolidayQuery) {
  const params = new URLSearchParams();
  if (!q) return params;

  // solo agregamos si tienen valor
  if (q.idHoliday != null) params.set("idHoliday", String(q.idHoliday));
  if (q.year != null) params.set("year", String(q.year));
  if (q.month != null && q.month >= 1 && q.month <= 12) params.set("month", String(q.month));
  if (q.holidayTypeId != null) params.set("holidayTypeId", String(q.holidayTypeId));
  if (q.status) params.set("status", q.status);

  return params;
}

export async function getHolidays(query?: HolidayQuery): Promise<Holiday[]> {
  const response = await api.get<Holiday[]>("/holidays", { params: buildParams(query) });
  const payload = response.data;
  // Acepta: array directo | { data: [...] } | { items: [...] }
  const list: unknown =
    Array.isArray(payload) ? payload :
    Array.isArray(payload?.data) ? payload.data :
    Array.isArray(payload?.items) ? payload.items :
    [];
  return list as Holiday[];
}
