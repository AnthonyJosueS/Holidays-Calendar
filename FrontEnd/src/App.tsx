import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./theme";
import HolidaysPage from "./pages/HolidaysPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <HolidaysPage />
        </LocalizationProvider>
    </ThemeProvider>
  );
}
