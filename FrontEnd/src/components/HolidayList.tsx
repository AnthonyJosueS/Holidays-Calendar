import { Card, CardContent, Divider, List, ListItem, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Holiday } from "../types/models";
import dayjs from "dayjs";

type Props = {
  holidays: Holiday[];
  month?: number;
  year?: number;
  holidayTypeId?: number;
  isRecovery?: boolean;
  title?: string;
  onEdit?: (h: Holiday) => void;        
  onDelete?: (h: Holiday) => void;        
};

export default function HolidayList({ holidays, month, year, holidayTypeId, isRecovery, title, onEdit, onDelete }: Props) {
  const filtered = holidays
    .filter(h => {
      const d = dayjs(h.date);
      const okMonth = month ? d.month() + 1 === month : true;
      const okYear = year ? d.year() === year : true;
      const okType = holidayTypeId != null ? Number(h.holidayTypeId) === Number(holidayTypeId) : true;
      const okRec = isRecovery != null ? h.isRecovery === isRecovery : true;
      return okMonth && okYear && okType && okRec;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Card variant="outlined" sx={{ height: "100%", borderRadius: 2, bgcolor: "background.paper" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Divider sx={{ mb: 1 }} />
        <List dense sx={{ pt: 0 }}>
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary">Sin feriados para el filtro.</Typography>
          )}
          {filtered.map(h => {
            const d = dayjs(h.date);
            const fechaTxt = d.format("D [de] MMMM");
            return (
              <ListItem
                key={h.idHoliday}
                sx={{
                  mb: 1,
                  border: "1px solid",
                  borderColor: h.isRecovery ? "warning.main" : "success.main",
                  borderRadius: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack width="100%" alignItems="center" textAlign="center" spacing={0.2}>
                  <Typography variant="subtitle2" sx={{ textTransform: "capitalize" }}>
                    {fechaTxt}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {h.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {h.isRecovery ? "RECUPERABLE" : "NO RECUPERABLE"} · FERIADO {h.holidayType?.name ?? ""}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} sx={{ ml: 1 }}>
                  {onEdit && (
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => onEdit(h)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip title="Eliminar">
                      <IconButton size="small" color="error" onClick={() => onDelete(h)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
