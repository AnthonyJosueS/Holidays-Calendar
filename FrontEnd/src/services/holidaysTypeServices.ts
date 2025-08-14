import type { HolidayType } from "../types/models";
import { api } from "../axios";


function buildParams(q?: any) {
  const params = new URLSearchParams();
  if (!q) return params;

//   if (q.idHoliday != null) params.set("idHoliday", String(q.idHoliday));
//   if (q.year != null) params.set("year", String(q.year));
//   if (q.month != null && q.month >= 1 && q.month <= 12) params.set("month", String(q.month));
//   if (q.holidayTypeId != null) params.set("holidayTypeId", String(q.holidayTypeId));
//   if (q.status) params.set("status", q.status);

  return params;
}

function extractList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.data))  return obj.data as T[];
    if (Array.isArray(obj.items)) return obj.items as T[];
  }
  return [];
}

export async function GetHolidaysTypes(query?: any): Promise<HolidayType[]> {
  const { data } = await api.get<unknown>("/holidays_types", { params: buildParams(query) });
  return extractList<HolidayType>(data);
}

