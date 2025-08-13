import { createTheme } from "@mui/material/styles";
import { esES as coreEsES } from "@mui/material/locale";
import { esES as pickersEsES } from "@mui/x-date-pickers/locales";

const theme = createTheme(
  {
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
    },
  },
  coreEsES,
  pickersEsES
);

export default theme;
