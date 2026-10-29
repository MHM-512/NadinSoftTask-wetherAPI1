
import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export function createAppTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,

      primary: {
        main: mode === "dark" ? "#38BDF8" : "#0284C7",
      },

      background: {
        default: mode === "dark" ? "#151D33" : "#eaf1f5",
        paper: mode === "dark" ? "#282F45" : "#dbe7ee",
      },

      text: {
        primary: mode === "dark" ? "#F5F7FF" : "#172033",
        secondary: mode === "dark" ? "#C3CBDA" : "#64748B",
      },

      divider: mode === "dark" ? "#3A435B" : "#DCE3EC",
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },

    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
}
