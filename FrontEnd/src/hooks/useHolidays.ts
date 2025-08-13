import { useEffect, useMemo, useState } from "react";
import type { Holiday, HolidayQuery } from "../types/models";
import { getHolidays } from "../services/holidaysServices";
import dayjs from "dayjs";

export function useHolidays(initialQuery?: HolidayQuery) {
  const [query, setQuery] = useState<HolidayQuery>(initialQuery ?? {});
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getHolidays(query)
      .then((data) => !cancelled && setHolidays(data))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [JSON.stringify(query)]);

  
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

  return { holidays, byDay, query, setQuery, loading, error };
}