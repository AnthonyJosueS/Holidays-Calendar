import { Card, CardContent, Typography, Box, GridLegacy } from "@mui/material";
import type { Holiday } from "../types/models";
import { buildMonthGrid } from "../utils/calendar";

const DAYS_ES = ["D", "L", "M", "X", "J", "V", "S"];
const MONTHS_ES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

type Props = {
  year: number;
  byDay: Map<string, Holiday[]>;
  onSelectMonth: (month1to12: number) => void;
};

export default function YearCalendar({ year, byDay, onSelectMonth }: Props) {
  return (
    <GridLegacy container spacing={2}>
      {MONTHS_ES.map((label, idx) => {
        const month = idx + 1;
        const cells = buildMonthGrid(year, month);

        return (
          <GridLegacy key={label} item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  onClick={() => onSelectMonth(month)}
                  sx={{ cursor: "pointer", mb: 1 }}
                >
                  <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
                    {label} {year}
                  </Typography>
                </Box>

                {/* Encabezado compacto */}
                <GridLegacy container spacing={0.5} sx={{ mb: 0.5 }}>
                  {DAYS_ES.map((d) => (
                    <GridLegacy item xs={12 / 7} key={d}>
                      <Typography variant="caption" color="text.secondary">
                        {d}
                      </Typography>
                    </GridLegacy>
                  ))}
                </GridLegacy>

                {/* Celdas compactas */}
                <GridLegacy container spacing={0.5}>
                  {cells.map(({ d, inMonth }, i) => {
                    const iso = d.format("YYYY-MM-DD");
                    const dayHolidays = byDay.get(iso) ?? [];
                    const hasRec = dayHolidays.some((h) => h.isRecovery);
                    const hasNonRec = dayHolidays.some((h) => !h.isRecovery);

                    let bg: string | undefined;
                    let borderCol: string | undefined = "divider";

                    if (dayHolidays.length) {
                      if (hasRec && hasNonRec) {
                        bg = "info.light";
                        borderCol = "info.main";
                      } else if (hasRec) {
                        bg = "warning.light";
                        borderCol = "warning.main";
                      } else {
                        bg = "success.light";
                        borderCol = "success.main";
                      }
                    }

                    return (
                      <GridLegacy item xs={12 / 7} key={i}>
                        <Box
                          sx={{
                            height: 28,
                            borderRadius: 0.75,
                            border: "1px solid",
                            borderColor: inMonth ? borderCol : "transparent",
                            bgcolor:
                              bg ?? (inMonth ? "background.paper" : "action.hover"),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                          }}
                        >
                          {d.date()}
                        </Box>
                      </GridLegacy>
                    );
                  })}
                </GridLegacy>
              </CardContent>
            </Card>
          </GridLegacy>
        );
      })}
    </GridLegacy>
  );
}
