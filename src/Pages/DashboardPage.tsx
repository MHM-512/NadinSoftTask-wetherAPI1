
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { useTranslation } from "react-i18next";

import TemperatureChart from "../components/TemperatureChart";
import ForecastDay from "../components/ForecastDay";
import { Footer } from "../components/Footer";

import {
  getCurrentWeather,
  getForecast,
} from "../services/weatherApi";

import type {
  CurrentWeather,
  ForecastResponse,
} from "../services/weatherApi";

interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

interface DashboardPageProps {
  selectedCity: GeoLocation | null;
}

export default function DashboardPage({
  selectedCity,
}: DashboardPageProps) {
  const { i18n } = useTranslation();

  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeather | null>(null);

  const [forecast, setForecast] =
    useState<ForecastResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Retrieving weather data from an API
  useEffect(() => {
    // get value city 
    const city = selectedCity;

    if (!city) {
      setCurrentWeather(null);
      setForecast(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    // get Weather
    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const language = i18n.language.startsWith("fa")
          ? "fa"
          : "en";

        const [current, nextForecast] = await Promise.all([
          getCurrentWeather(
            city!.lat,
            city!.lon,
            language,
          ),
          getForecast(
            city!.lat,
            city!.lon,
            language,
          ),
        ]);
        if (!cancelled) {
          setCurrentWeather(current);
          setForecast(nextForecast);
        }
      } catch (err) {
        console.error("Weather API error:", err);

        if (!cancelled) {
          setError(
            i18n.language.startsWith("fa")
              ? "دریافت اطلاعات آب‌وهوا ناموفق بود. کلید API و اتصال اینترنت را بررسی کنید."
              : "Failed to load weather. Please check your API key and internet connection.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [selectedCity, i18n.language]);

  // Date and local time of the selected city
  const dateTime: Date | null = currentWeather
    ? new Date(
      (currentWeather.dt + currentWeather.timezone) * 1000,
    )
    : null;

  const locale = i18n.language.startsWith("fa")
    ? "fa-IR"
    : "en-US";

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        minHeight: "80vh",
        mt: "20px",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Upload message*/}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error Message*/}
      {error && (
        <Alert severity="error" sx={{ mx: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Current weather card and chart*/}
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
        {/* Current Weather Card*/}
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
          {/* City Name*/}
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
                theme.palette.mode === "dark"
                  ? "#3D4761"
                  : "#CDD9E0",
              color: "text.primary",
              px: 1.5,
              py: 0.5,
            }}
          >
            <RoomIcon fontSize="small" />

            <Typography variant="body2">
              {selectedCity
                ? selectedCity.name
                : i18n.language.startsWith("fa")
                  ? "انتخاب شهر"
                  : "Select a location"}
            </Typography>
          </Box>

          {/* Day of the week and weather icon*/}
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
                currentWeather?.weather[0]?.description ??
                "Weather condition"
              }
              sx={{
                width: 120,
                maxWidth: "45%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/*Date and Time*/}
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

          {/*Temperature and Weather Conditions*/}
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

          {/*Maximum, minimum, and feels-like temperature*/}
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
                {i18n.language.startsWith("fa")
                  ? "بیشینه:"
                  : "High:"}{" "}
                {currentWeather
                  ? `${Math.round(currentWeather.main.temp_max)}°`
                  : "--"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {i18n.language.startsWith("fa")
                  ? "کمینه:"
                  : "Low:"}{" "}
                {currentWeather
                  ? `${Math.round(currentWeather.main.temp_min)}°`
                  : "--"}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {i18n.language.startsWith("fa")
                ? "دمای احساسی:"
                : "Feels like:"}{" "}
              {currentWeather
                ? `${Math.round(currentWeather.main.feels_like)}°`
                : "--"}
            </Typography>
          </Box>
        </Box>

        {/* --Add Temperature-Chart-- */}
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
          <TemperatureChart />
        </Box>
      </Box>

      {/* Weather forecast 5 DAY*/}
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
    </Box>
  );
}
