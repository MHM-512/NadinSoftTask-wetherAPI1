import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../features/auth/useAuth";
import { useThemeMode } from "../theme/ThemeModeProvider";

interface SettingsPanelProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export function SettingsPanel({ anchorEl, open, onClose }: SettingsPanelProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { mode, setMode } = useThemeMode();

  function handleLogout() {
    logout();
    void navigate({ to: "/login" });
  }
  return (
    <Popover
      dir={isRtl ? "rtl" : "ltr"}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            p: 2,
            width: 230,
            borderRadius: 2,
            boxShadow: 6,
          },
        },
      }}
    >

      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
        {t("settings.mode")}
      </Typography>
      <ButtonGroup fullWidth variant="text" size="medium" sx={{borderRadius: 0 }}>
        <Button
          onClick={() => setMode("light")}
          variant={mode === "light" ? "contained" : "outlined"}
          startIcon={<WbSunnyOutlinedIcon  />}
          sx={{borderRadius: 0,}}
        >
          {t("settings.light")}
        </Button>
        <Button
          onClick={() => setMode("dark")}
          variant={mode === "dark" ? "contained" : "outlined"}
          startIcon={<NightlightOutlinedIcon />}
          sx={{borderRadius: 0,}}

        >
          {t("settings.dark")}
        </Button>
      </ButtonGroup>

      <Divider sx={{ my: 1.5 }} />

      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
        {t("settings.language")}
      </Typography>
      <ButtonGroup fullWidth variant="text" size="medium">
        <Button
          onClick={() => void i18n.changeLanguage("en")}
          variant={i18n.language === "en" ? "contained" : "outlined"}
          sx={{borderRadius: 0,}}

        >
          {t("settings.english")}
        </Button>
        <Button
          onClick={() => void i18n.changeLanguage("fa")}
          variant={i18n.language.startsWith("fa") ? "contained" : "outlined"}
          sx={{borderRadius: 0,}}

        >
          {t("settings.persian")}
        </Button>
      </ButtonGroup>

      <Divider sx={{ my: 1.5 }} />

      <Box>
        <Button
          color="inherit"
          onClick={handleLogout}
          startIcon={<LogoutOutlinedIcon />}
          sx={{ px: 0 }}
        >
          {t("settings.logout")}
        </Button>
      </Box>
    </Popover>
  );
}
