import { useEffect, useMemo, useState, useCallback } from "react";
import type { Holiday, HolidayQuery } from "../types/models";
import { getHolidays } from "../services/holidaysServices";
import dayjs from "dayjs";

export function useHolidays(initialQuery?: HolidayQuery) {
  const [query, setQuery] = useState<HolidayQuery>(initialQuery ?? {});
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (q: HolidayQuery) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHolidays(q);
      setHolidays(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(query);
  }, [fetchData, JSON.stringify(query)]);

  const refetch = useCallback(() => fetchData(query), [fetchData, query]);

  const byDay = useMemo(() => {
    const m = new Map<string, Holiday[]>();
    for (const h of holidays) {
      const key = dayjs(h.date).format("YYYY-MM-DD");
      const arr = m.get(key) ?? [];
      arr.push(h);
      m.set(key, arr);
    }
    return m;
  }, [holidays]);

  return { holidays, byDay, query, setQuery, loading, error, refetch };
}
