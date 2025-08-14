import { Alert, Box, CircularProgress, Button, Stack, GridLegacy } from "@mui/material";
import FiltersBar from "../components/FiltersBar";
import HolidayCalendar from "../components/HolidayCalendar";
import YearCalendar from "../components/YearCalender";
import HolidayList from "../components/HolidayList";
import HolidayFormDialog from "../components/HolidayFormDialog";   // ← NUEVO
import { useHolidays } from "../hooks/useHolidays";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { Holiday, HolidayType, HolidayRequest } from "../types/models";
import { createHoliday, updateHoliday, deleteHoliday } from "../services/holidaysServices"; 
import { GetHolidaysTypes } from "../services/holidaysTypeServices"; 

export default function HolidaysPage() {
  const now = dayjs();
  const { holidays, byDay, query, setQuery, loading, error, refetch } = useHolidays({
    year: now.year(),
    month: now.month() + 1,
    status: "ACTIVO",
  });

  const [types, setTypes] = useState<HolidayType[]>([]);
  useEffect(() => { GetHolidaysTypes().then(setTypes).catch(() => setTypes([])); }, []);

  const handleFilterChange = (patch: {
    year?: number; month?: number | undefined;
    holidayTypeId?: number | undefined; isRecovery?: boolean | undefined;
  }) => {
    setQuery(prev => {
      const next: any = { ...prev, ...patch };
      if (Object.prototype.hasOwnProperty.call(patch, "month")) {
        if (patch.month == null || patch.month === 0) delete next.month;
        else next.month = patch.month;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "holidayTypeId")) {
        if (patch.holidayTypeId == null || Number(patch.holidayTypeId) === 0) delete next.holidayTypeId;
        else next.month, next.holidayTypeId = Number(patch.holidayTypeId);
      }
      if (Object.prototype.hasOwnProperty.call(patch, "isRecovery")) {
        if (patch.isRecovery === undefined) delete next.isRecovery;
        else next.isRecovery = patch.isRecovery;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "year") && patch.year != null) {
        next.year = patch.year;
      }
      return next;
    });
  };

  const selectedYear  = query.year ?? now.year();
  const isYearView    = query.month == null;
  const selectedMonth = query.month ?? undefined;

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing]   = useState<Holiday | null>(null);

  const openCreate = () => { setEditing(null); setOpenForm(true); };
  const openEdit   = (h: Holiday) => { setEditing(h); setOpenForm(true); };

  const handleSubmitForm = async (req: HolidayRequest) => {
    if (editing) await updateHoliday(editing.idHoliday, req);
    else         await createHoliday(req);
    await refetch();
  };

  const handleDelete = async (h: Holiday) => {
    const ok = window.confirm(`¿Eliminar el feriado "${h.name}" del ${dayjs(h.date).format("YYYY-MM-DD")}?`);
    if (!ok) return;
    await deleteHoliday(h.idHoliday);
    await refetch();
  };

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
      {/* Filtros centrados + botón Nuevo */}
      <Stack alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
        <FiltersBar
          year={selectedYear}
          month={selectedMonth}
          holidayTypeId={query.holidayTypeId}
          isRecovery={query.isRecovery}
          types={types}
          onChange={handleFilterChange}
        />

        <Button variant="contained" size="small" onClick={openCreate}>
          Nuevo feriado
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <GridLegacy container columns={12} columnSpacing={2} rowSpacing={2} sx={{ mt: 1 }}>
          
          <GridLegacy xs={12} md={7}>
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

          {/* Lista DER con acciones */}
          <GridLegacy xs={12} md={5}>
            <HolidayList
              holidays={holidays}
              month={selectedMonth}
              year={selectedYear}
              holidayTypeId={query.holidayTypeId}
              isRecovery={query.isRecovery}
              title={`Feriados del ${isYearView ? "año" : "mes"}`}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          </GridLegacy>
        </GridLegacy>
      )}

      <HolidayFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmitForm}
        types={types}
        initial={editing}
      />
    </Box>
  );
}
