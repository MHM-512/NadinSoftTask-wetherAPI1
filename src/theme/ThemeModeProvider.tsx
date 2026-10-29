
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import {
  createAppTheme,
  type ThemeMode,
} from "./theme";

interface ThemeModeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext =
  createContext<ThemeModeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error(
      "useThemeMode must be used inside ThemeModeProvider"
    );
  }

  return context;
}

interface ThemeModeProviderProps {
  children: ReactNode;
}

export default function ThemeModeProvider({
  children,
}: ThemeModeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode");

    return savedMode === "light" ? "light" : "dark";
  });

  const theme = useMemo(
    () => createAppTheme(mode),
    [mode]
  );

  function handleSetMode(nextMode: ThemeMode) {
    localStorage.setItem("themeMode", nextMode);
    setMode(nextMode);
  }

  return (
    <ThemeModeContext.Provider
      value={{ mode, setMode: handleSetMode }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
