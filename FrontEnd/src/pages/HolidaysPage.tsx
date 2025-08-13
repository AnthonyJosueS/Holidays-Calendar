import { Alert, Box, CircularProgress, Grid, GridLegacy, Typography } from "@mui/material";
import FiltersBar from "../components/FiltersBar";
import HolidayCalendar from "../components/HolidayCalendar";
import YearCalendar from "../components/YearCalender";
import HolidayList from "../components/HolidayList";
import { useHolidays } from "../hooks/useHolidays";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { HolidayType } from "../types/models";
import { GetHolidaysTypes } from "../services/holidaysTypeServices";

export default function HolidaysPage() {
  const now = dayjs();
  const { holidays, byDay, query, setQuery, loading, error } = useHolidays({
    year: now.year(),
    month: now.month() + 1,
    status: "ACTIVO",
  });

  const [types, setTypes] = useState<HolidayType[]>([]);
  useEffect(() => { GetHolidaysTypes().then(setTypes).catch(() => setTypes([])); }, []);

  const handleFilterChange = (patch: {
  year?: number;
  month?: number | undefined;    
  holidayTypeId?: number | undefined;
  isRecovery?: boolean | undefined;
}) => {
  setQuery(prev => {
    const next: any = { ...prev, ...patch };

    // ⚠️ Solo tocar 'month' si VIENE en el patch
    if (Object.prototype.hasOwnProperty.call(patch, "month")) {
      if (patch.month == null || patch.month === 0) delete next.month;  // Año completo
      else next.month = patch.month;
    }

    // Solo tocar 'holidayTypeId' si VIENE en el patch
    if (Object.prototype.hasOwnProperty.call(patch, "holidayTypeId")) {
      if (patch.holidayTypeId == null || Number(patch.holidayTypeId) === 0) delete next.holidayTypeId;
      else next.holidayTypeId = Number(patch.holidayTypeId);
    }

    // Solo tocar 'isRecovery' si VIENE en el patch
    if (Object.prototype.hasOwnProperty.call(patch, "isRecovery")) {
      if (patch.isRecovery === undefined) delete next.isRecovery;
      else next.isRecovery = patch.isRecovery;
    }

    // Solo tocar 'year' si VIENE en el patch
    if (Object.prototype.hasOwnProperty.call(patch, "year") && patch.year != null) {
      next.year = patch.year;
    }

    return next;
  });
};

  const selectedYear  = query.year ?? now.year();
  const isYearView    = query.month == null;
  const selectedMonth = query.month ?? undefined;

  const goPrevMonth = () => {
    if (!selectedMonth) return;
    const d = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2,"0")}-01`).subtract(1, "month");
    handleFilterChange({ year: d.year(), month: d.month() + 1 });
  };
  const goNextMonth = () => {
    if (!selectedMonth) return;
    const d = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2,"0")}-01`).add(1, "month");
    handleFilterChange({ year: d.year(), month: d.month() + 1 });
  };

 return (
    <Box sx={{ p: 2 }}>
        {/* Filtros centrados */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 1120 }}>
            <FiltersBar
            year={selectedYear}
            month={selectedMonth}
            holidayTypeId={query.holidayTypeId}
            isRecovery={query.isRecovery}
            types={types}
            onChange={handleFilterChange}
            />
        </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {loading ? (
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
        </Box>
        ) : (
        // ⬇️ Lista a la IZQUIERDA (md=5) y Calendario a la DERECHA (md=7)
        <GridLegacy container spacing={2} sx={{ mt: 1 }}>
            {/* Calendario derecha (más pequeño) */}
            <GridLegacy item xs={12} md={7}>
            {isYearView ? (
                <YearCalendar
                year={selectedYear}
                byDay={byDay}
                onSelectMonth={(m) => handleFilterChange({ month: m })}
                />
            ) : (
                <HolidayCalendar
                year={selectedYear}
                month={selectedMonth!}
                byDay={byDay}
                onPrevMonth={goPrevMonth}
                onNextMonth={goNextMonth}
                onSelectDate={(iso) => {
                    const d = dayjs(iso);
                    handleFilterChange({ year: d.year(), month: d.month() + 1 });
                }}
                />
            )}
            </GridLegacy>

            {/* Lista izquierda */}
            <GridLegacy item xs={12} md={5}>
            {/* <Typography variant="h6" sx={{ mb: 1 }}>
                {isYearView ? "Feriados del año" : "Feriados del mes"}
            </Typography> */}
            <HolidayList
                holidays={holidays}
                month={selectedMonth}
                year={selectedYear}
                holidayTypeId={query.holidayTypeId}
                isRecovery={query.isRecovery}
                title={isYearView ? "Feriados del año" : "Feriados del mes"}
            />
            </GridLegacy>
        </GridLegacy>
        )}
    </Box>
    );
}
