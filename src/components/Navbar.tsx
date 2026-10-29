import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useTranslation } from "react-i18next";
import { SettingsPanel } from "./SettingsPanel";
import type { GeoLocation } from "../types/weather";

interface NavbarProps {
  selectedCity: GeoLocation | null;
  onCitySelect: (location: GeoLocation) => void;
}

export default function Navbar({ selectedCity, onCitySelect }: NavbarProps) {
  const { t } = useTranslation();


  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const settingsOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={2}
      sx={{ bgcolor: "background.paper" }}
    >
      <Toolbar
        sx={{
          gap: 1.5,
          py: 1,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/img/c7b17836c1b9887df3e25afc0d53fb274b8aca99.jpeg"
          sx={{ width: "50px", borderRadius: "50px" }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 140 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            {t("Wether dashabord")}
          </Typography>
          
        </Box>
        <TextField
          select
          label={t("Search Your Location")}
          value={selectedCity?.name ?? ""}
          variant="standard"
          sx={{ m: 1, width: "25ch" }}
          onChange={(event) => {
            const countries: GeoLocation[] = [
              {
                name: "Tehran",
                country: "IR",
                lat: 35.6892,
                lon: 51.389,
              },
              {
                name: "London",
                country: "GB",
                lat: 51.5072,
                lon: -0.1276,
              },
              {
                name: "San Francisco",
                country: "US",
                lat: 37.7749,
                lon: -122.4194,
              },
            ];

            const selected = countries.find(
              (item) => item.name === event.target.value,
            );

            if (selected) {
              onCitySelect(selected);
            }
          }}
        >
          <MenuItem value="Tehran">{t("nav.country1")}</MenuItem>
          <MenuItem value="London">{t("nav.country2")}</MenuItem>
          <MenuItem value="San Francisco">{t("nav.country3")}</MenuItem>
        </TextField>

        <Tooltip title={t("nav.settings")}>
          <IconButton
            aria-label={t("nav.settings")}
            aria-expanded={settingsOpen}
            aria-haspopup="dialog"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              color: settingsOpen ? "primary.main" : "text.secondary",
            }}
          >
            <SettingsOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <SettingsPanel
          anchorEl={anchorEl}
          open={settingsOpen}
          onClose={() => setAnchorEl(null)}
        />
      </Toolbar>
    </AppBar>
  );
}
