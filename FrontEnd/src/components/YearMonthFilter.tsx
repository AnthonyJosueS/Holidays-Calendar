import { useMemo } from "react";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

const MONTHS_ES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

type Props = {
  year?: number;
  month?: number;
  onChange: (patch: { year?: number; month?: number | undefined }) => void;
};

export default function YearMonthFilter({ year, month, onChange }: Props) {
  const years = useMemo(() => {
    const now = new Date().getFullYear();
    const arr: number[] = [];
    for (let y = now + 1; y >= now - 10; y--) arr.push(y);
    return arr;
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="year-label">Año</InputLabel>
        <Select
          labelId="year-label"
          label="Año"
          value={year ?? ""}
          onChange={(e) => onChange({ year: Number(e.target.value) })}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="month-label">Mes</InputLabel>
        <Select
          labelId="month-label"
          label="Mes"
          value={month ?? 0} // 0 = Año completo
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange({ month: v === 0 ? undefined : v });
          }}
        >
          <MenuItem value={0}>Año completo</MenuItem>
          {MONTHS_ES.map((m, i) => (
            <MenuItem key={i} value={i + 1} sx={{ textTransform: "capitalize" }}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
