import { Card, CardContent, Typography, Box, Tooltip, IconButton, Stack, GridLegacy } from "@mui/material";
import { buildMonthGrid } from "../utils/calendar";
import dayjs from "dayjs";
import type { Holiday } from "../types/models";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DAYS_ES = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const MONTHS_ES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

type Props = {
  year: number;
  month: number; // 1-12
  byDay: Map<string, Holiday[]>;
  onSelectDate?: (isoDate: string) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
};

export default function HolidayCalendar({ year, month, byDay, onSelectDate, onPrevMonth, onNextMonth }: Props) {
  const cells = buildMonthGrid(year, month);
  const monthName = `${MONTHS_ES[month - 1]} ${year}`;

  return (
    <Card variant="outlined" sx={{ height: "100%", borderRadius: 2, bgcolor: "background.paper" }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <IconButton size="small" onClick={onPrevMonth}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>{monthName}</Typography>
          <IconButton size="small" onClick={onNextMonth}><ArrowForwardIosIcon fontSize="small" /></IconButton>
        </Stack>

        <GridLegacy container spacing={1} sx={{ mb: 1 }}>
          {DAYS_ES.map((d) => (
            <GridLegacy item xs={12/7} key={d}>
              <Typography variant="caption" color="text.secondary">{d}</Typography>
            </GridLegacy>
          ))}
        </GridLegacy>

        <GridLegacy container spacing={1}>
          {cells.map(({ d, inMonth }, idx) => {
            const iso = d.format("YYYY-MM-DD");
            const hs = byDay.get(iso) ?? [];
            const isToday = d.isSame(dayjs(), "day");
            return (
              <GridLegacy item xs={12/7} key={idx}>
                <Box
                  onClick={() => onSelectDate?.(iso)}
                  sx={{
                    p: 1,
                    border: "1px solid",
                    borderColor: isToday ? "primary.main" : "divider",
                    borderRadius: 1.5,
                    bgcolor: inMonth ? "background.paper" : "action.hover",
                    cursor: "pointer",
                    minHeight: 76,
                  }}
                >
                  <Typography variant="caption" fontWeight={600}>
                    {d.date()}
                  </Typography>
                  {hs.slice(0, 2).map((h) => (
                    <Tooltip key={h.idHoliday} title={h.name}>
                      <Box
                        sx={{
                          mt: 0.5,
                          px: 0.75,
                          py: 0.25,
                          borderRadius: 0.75,
                          border: "1px solid",
                          borderColor: h.isRecovery ? "warning.main" : "success.main",
                          bgcolor: h.isRecovery ? "warning.light" : "success.light",
                          fontSize: 11,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h.name}
                      </Box>
                    </Tooltip>
                  ))}
                  {hs.length > 2 && (
                    <Typography variant="caption" color="text.secondary">+{hs.length - 2} más</Typography>
                  )}
                </Box>
              </GridLegacy>
            );
          })}
        </GridLegacy>
      </CardContent>
    </Card>
  );
}
