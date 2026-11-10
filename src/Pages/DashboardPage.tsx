
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import DashboardContent from "./DashboardContent";

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

  // Fetch weather data
  useEffect(() => {
    const city = selectedCity;

    if (!city) {
      setCurrentWeather(null);
      setForecast(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

async function loadWeather() {
  setLoading(true);
  setError(null);

  
  if (!city) {
    setLoading(false);
    return;
  }

  try {
    const language = i18n.language.startsWith("fa")
      ? "fa"
      : "en";

    const [current, nextForecast] = await Promise.all([
      getCurrentWeather(
        city.lat,
        city.lon,
        language
      ),

      getForecast(
        city.lat,
        city.lon,
        language
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
          : "Failed to load weather. Please check your API key and internet connection."
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

  return (
    <Box
      sx={{
        minHeight: "80vh",
        mt: "20px",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DashboardContent
        selectedCity={selectedCity}
        currentWeather={currentWeather}
        forecast={forecast}
        loading={loading}
        error={error}
      />
    </Box>
  );
}
