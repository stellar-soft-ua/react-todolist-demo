import React from "react";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { Workspace } from "./views/Workspace";
import { LocalizationProvider } from "@mui/x-date-pickers";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="dd.mm.yyyy">
        <CssBaseline />
        <Workspace />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
