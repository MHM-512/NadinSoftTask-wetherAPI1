import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import RoomIcon from "@mui/icons-material/Room";

import { useTranslation } from "react-i18next";

import TemperatureChart from "../components/TemperatureChart";
import ForecastDay from "../components/ForecastDay";
import { Footer } from "../components/Footer";

import type { CurrentWeather, ForecastResponse } from "../services/weatherApi";

interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

interface DashboardContentProps {
  selectedCity: GeoLocation | null;
  currentWeather: CurrentWeather | null;
  forecast: ForecastResponse | null;
  loading: boolean;
  error: string | null;
}

export default function DashboardContent({
  selectedCity,
  currentWeather,
  forecast,
  loading,
  error,
}: DashboardContentProps) {
  const { t, i18n } = useTranslation();

  // Language
  const isPersian = i18n.language.startsWith("fa");

  const locale = isPersian ? "fa-IR" : "en-US";

  // Translate City Name
  const cityName = selectedCity
    ? t(`cities.${selectedCity.name}`, {
        defaultValue: selectedCity.name,
      })
    : isPersian
      ? "انتخاب شهر"
      : "Select a location";

  // Date and local time
  const dateTime: Date | null = currentWeather
    ? new Date((currentWeather.dt + currentWeather.timezone) * 1000)
    : null;

  // Loading Screen
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2.5,
            p: 4,
            minWidth: { xs: 220, sm: 260 },
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: 2,
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "primary.main",
            }}
          />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {isPersian
              ? "در حال دریافت اطلاعات آب‌وهوا..."
              : "Loading weather data..."}
          </Typography>

          <Typography variant="caption" color="text.disabled">
            {isPersian ? "لطفاً چند لحظه صبر کنید" : "Please wait a moment"}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mx: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Current Weather Card and Chart */}
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-around",
          gap: 3,
          px: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Current Weather Card */}
        <Box
          sx={{
            flex: "1 1 380px",
            maxWidth: 620,
            minWidth: 0,
            minHeight: 230,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            color: "text.primary",
            borderRadius: "24px",
            p: 3,
            boxShadow: 2,
          }}
        >
          {/* City Name */}
          <Box
            sx={{
              width: "fit-content",
              minWidth: 150,
              minHeight: 32,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderRadius: 50,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#3D4761" : "#CDD9E0",
              color: "text.primary",
              px: 1.5,
              py: 0.5,
            }}
          >
            <RoomIcon fontSize="small" />

            <Typography variant="body2">{cityName}</Typography>
          </Box>

          {/* Day and Weather Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mt: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {dateTime
                ? dateTime.toLocaleDateString(locale, {
                    weekday: "long",
                    timeZone: "UTC",
                  })
                : "--"}
            </Typography>

            <Box
              component="img"
              src={
                currentWeather
                  ? `https://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`
                  : "/img/Frame30.png"
              }
              alt={
                currentWeather?.weather[0]?.description ?? "Weather condition"
              }
              sx={{
                width: 120,
                maxWidth: "45%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Date and Time */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {dateTime
                ? dateTime.toLocaleDateString(locale, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })
                : "--"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {dateTime
                ? dateTime.toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                  })
                : "--"}
            </Typography>
          </Box>

          {/* Temperature and Weather Conditions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mt: 1,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {currentWeather
                ? `${Math.round(currentWeather.main.temp)}°C`
                : "--"}
            </Typography>

            <Typography variant="h5">
              {currentWeather?.weather[0]?.description ?? "--"}
            </Typography>
          </Box>

          {/* Maximum, Minimum and Feels Like */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
              mt: 0.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {isPersian ? "بیشینه:" : "High:"}{" "}
                {currentWeather
                  ? `${Math.round(currentWeather.main.temp_max)}°`
                  : "--"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {isPersian ? "کمینه:" : "Low:"}{" "}
                {currentWeather
                  ? `${Math.round(currentWeather.main.temp_min)}°`
                  : "--"}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {isPersian ? "دمای احساسی:" : "Feels like:"}{" "}
              {currentWeather
                ? `${Math.round(currentWeather.main.feels_like)}°`
                : "--"}
            </Typography>
          </Box>
        </Box>

        {/* Temperature Chart */}
        <Box
          sx={{
            flex: "1 1 420px",
            minWidth: 0,
            maxWidth: 800,
            bgcolor: "background.paper",
            color: "text.primary",
            borderRadius: "24px",
            p: 2,
            boxShadow: 2,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {selectedCity && (
            <TemperatureChart lat={selectedCity.lat} lon={selectedCity.lon} />
          )}
        </Box>
      </Box>

      {/* 5 Day Weather Forecast */}
      <Box
        sx={{
          mt: "35px",
          mb: "30px",
          px: 2,
          color: "text.primary",
        }}
      >
        <ForecastDay forecast={forecast} />
      </Box>

      {/* Footer */}
      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </>
  );
}
