import { useMemo } from "react";
import { Card, CardContent, Stack, FormControl, InputLabel, Select, MenuItem, Divider } from "@mui/material";
import type { HolidayType } from "../types/models";

const MONTHS_ES = [
  "Año completo","enero",
  "febrero","marzo",
  "abril","mayo",
  "junio","julio",
  "agosto","septiembre",
  "octubre","noviembre",
  "diciembre"
];

const FILTER_W = 180;

export default function FiltersBar({ year, month, holidayTypeId, isRecovery, types, onChange}: 
              { year: number;
                month?: number;                          
                holidayTypeId?: number;
                isRecovery?: boolean;
                types: HolidayType[];
                onChange: (patch: {
                  year?: number; month?: number | undefined;
                  holidayTypeId?: number | undefined; isRecovery?: boolean | undefined;
                }) => void;
              }) {
  const years = useMemo(() => {
  const now = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => now + 1 - i);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        width: { xs: "100%", md: "fit-content" },
        mx: "auto",
      }}
    >
      <CardContent sx={{ py: 1, px: 1.5 }}>
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <FormControl size="small" sx={{ width: { xs: "100%", md: FILTER_W } }}>
            <InputLabel>Año</InputLabel>
            <Select
              label="Año"
              value={year}
              onChange={(e) => onChange({ year: Number(e.target.value) })}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: { xs: "100%", md: FILTER_W } }}>
            <InputLabel>Mes</InputLabel>
            <Select
              label="Mes"
              value={month ?? 0} // 0 = Año completo
              onChange={(e) => {
                const v = Number(e.target.value);
                onChange({ month: v === 0 ? undefined : v });
              }}
            >
              {MONTHS_ES.map((m, i) => (
                <MenuItem key={i} value={i}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider
            flexItem
            orientation="vertical"
            sx={{ display: { xs: "none", md: "block" }, mx: 0.5 }}
          />

          <FormControl size="small" sx={{ width: { xs: "100%", md: FILTER_W } }}>
            <InputLabel>Tipo de feriado</InputLabel>
            <Select
              label="Tipo de feriado"
              value={holidayTypeId ?? 0}
              onChange={(e) => {
                const v = Number(e.target.value);
                onChange({ holidayTypeId: v === 0 ? undefined : v });
              }}
            >
              <MenuItem value={0}>Todos</MenuItem>
              {types.map((t) => (
                <MenuItem key={String(t.idHolidayType)} value={Number(t.idHolidayType)}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: { xs: "100%", md: FILTER_W } }}>
            <InputLabel>Recuperable</InputLabel>
            <Select
              label="Recuperable"
              value={isRecovery === undefined ? "all" : isRecovery ? "true" : "false"}
              onChange={(e) => {
                const v = String(e.target.value);
                if (v === "all")  onChange({ isRecovery: undefined });
                if (v === "true") onChange({ isRecovery: true });
                if (v === "false")onChange({ isRecovery: false });
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}
