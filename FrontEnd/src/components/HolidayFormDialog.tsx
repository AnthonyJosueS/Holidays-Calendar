import { useEffect, useMemo, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Stack, Switch, FormControlLabel
} from "@mui/material";
import type { Holiday, HolidayRequest, HolidayType } from "../types/models";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (req: HolidayRequest) => Promise<void> | void;
  types: HolidayType[];
  initial?: Holiday | null; // si viene, es edición
};

export default function HolidayFormDialog({ open, onClose, onSubmit, types, initial }: Props) {
  const isEdit = !!initial;
  const [name, setName] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [isRecovery, setIsRecovery] = useState(false);
  const [holidayTypeId, setHolidayTypeId] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setDate(dayjs(initial.date));
      setIsRecovery(initial.isRecovery);
      setHolidayTypeId(Number(initial.holidayTypeId));
    } else {
      setName("");
      setDate(dayjs());
      setIsRecovery(false);
      setHolidayTypeId(types[0] ? Number(types[0].idHolidayType) : 0);
    }
  }, [initial, types]);

  const canSubmit = useMemo(() =>
    name.trim().length > 0 && date && holidayTypeId > 0, [name, date, holidayTypeId]
  );

  const handleSubmit = async () => {
    if (!canSubmit || !date) return;
    const payload: HolidayRequest = {
      name: name.trim(),
      date: date.toDate(),
      isRecovery,
      holidayTypeId
    };
    setSaving(true);
    try {
      await onSubmit(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Editar feriado" : "Nuevo feriado"}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Nombre del feriado"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoFocus
          />
          <DatePicker
            label="Fecha"
            value={date}
            onChange={(v) => setDate(v)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <FormControlLabel
            control={<Switch checked={isRecovery} onChange={(e) => setIsRecovery(e.target.checked)} />}
            label="Recuperable"
          />
          <FormControl fullWidth>
            <InputLabel>Tipo de feriado</InputLabel>
            <Select
              label="Tipo de feriado"
              value={holidayTypeId}
              onChange={(e) => setHolidayTypeId(Number(e.target.value))}
            >
              {types.map(t => (
                <MenuItem key={String(t.idHolidayType)} value={Number(t.idHolidayType)}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!canSubmit || saving}>
          {isEdit ? "Guardar cambios" : "Crear feriado"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
