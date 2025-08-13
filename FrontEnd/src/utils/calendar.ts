import dayjs from "dayjs";

export function buildMonthGrid(year: number, month1to12: number) {
  // Devuelve un arreglo de 42 celdas (6 semanas) con objetos { d: dayjs, inMonth: boolean }
  const first = dayjs().year(year).month(month1to12 - 1).date(1);
  const start = first.startOf("week"); // domingo
  const days: { d: dayjs.Dayjs; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = start.add(i, "day");
    days.push({ d, inMonth: d.month() === first.month() });
  }
  return days;
}

export function buildYearMonths() {
  return Array.from({ length: 12 }, (_ , i) => i + 1);
}

export function formatISO(d: Date | string) {
  const x = typeof d === "string" ? dayjs(d) : dayjs(d);
  return x.format("YYYY-MM-DD");
}
