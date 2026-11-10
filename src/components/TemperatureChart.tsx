import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Types
interface TemperatureChartProps {
  lat: number;
  lon: number;
}

interface SeasonalForecastResponse {
  monthly: {
    time: string[];
    temperature_2m_mean: (number | null)[];
  };
}

interface TemperatureData {
  date: string;
  month: string;
  temperature: number;
}

export default function TemperatureChart({ lat, lon }: TemperatureChartProps) {
  const theme = useTheme();
  const { i18n } = useTranslation();

  const isPersian = i18n.language.startsWith("fa");

  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSeasonalForecast() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<SeasonalForecastResponse>(
          "https://seasonal-api.open-meteo.com/v1/seasonal",
          {
            params: {
              latitude: lat,
              longitude: lon,
              monthly: "temperature_2m_mean",
              timezone: "auto",
            },
          },
        );

        if (cancelled) return;

        const monthly = response.data.monthly;

        if (!monthly?.time?.length || !monthly.temperature_2m_mean) {
          throw new Error("No seasonal data available");
        }

        const formattedData = monthly.time
          .map((date, index) => {
            const temperature = monthly.temperature_2m_mean[index];

            if (temperature === null || temperature === undefined) {
              return null;
            }

            const monthName = new Intl.DateTimeFormat(
              isPersian ? "fa-IR" : "en-US",
              {
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              },
            ).format(new Date(`${date}T00:00:00Z`));

            return {
              date,
              month: monthName,
              temperature: Number(temperature.toFixed(1)),
            };
          })
          .filter((item): item is TemperatureData => item !== null);

        // انتخاب پنج ماه آینده
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);

        const nextFiveMonths = formattedData
          .filter((item) => {
            const itemDate = new Date(`${item.date}T00:00:00Z`);

            return itemDate >= currentMonth;
          })
          .slice(0, 5);

        if (!cancelled) {
          setTemperatureData(nextFiveMonths);
        }
      } catch (err) {
        console.error("Seasonal forecast error:", err);

        if (!cancelled) {
          setError(
            isPersian
              ? "دریافت اطلاعات پیش‌بینی فصلی ناموفق بود."
              : "Failed to load seasonal forecast.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSeasonalForecast();

    return () => {
      cancelled = true;
    };
  }, [lat, lon, isPersian]);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        height: 300,
        p: { xs: 1.5, sm: 2 },
        borderRadius: "18px",
        bgcolor: "background.paper",
        color: "text.primary",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: 16, sm: 20 },
          mb: 0.5,
        }}
      >
        {isPersian ? "پیش‌بینی دمای ماهانه" : "Monthly Temperature Forecast"}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        {isPersian
          ? "برآورد بلندمدت دمای ماه‌های آینده"
          : "Long-range monthly temperature outlook"}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 220,
          minWidth: 0,
          mt: 1,
        }}
      >
        {loading ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={30} />
          </Box>
        ) : error ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
            }}
          >
            <Typography
              color="error"
              variant="body2"
              sx={{ textAlign: "center" }}
            >
              {error}
            </Typography>
          </Box>
        ) : temperatureData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={temperatureData}
              margin={{
                top: 8,
                right: 8,
                left: -9,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="temperatureLineGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#27D3DC" />
                  <stop offset="100%" stopColor="#7957FF" />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke={theme.palette.divider}
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: theme.palette.text.secondary,
                }}
                tickMargin={8}
              />

              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={(value: number) => `${value}°`}
                axisLine={false}
                tickLine={false}
                width={38}
                tick={{
                  fontSize: 10,
                  fill: theme.palette.text.secondary,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(1)}°C`,
                  isPersian ? "میانگین دما" : "Average Temperature",
                ]}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />

              <Line
                type="monotone"
                dataKey="temperature"
                stroke="url(#temperatureLineGradient)"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "#27D3DC",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "#7957FF",
                  stroke: theme.palette.background.paper,
                  strokeWidth: 2,
                }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">
              {isPersian
                ? "اطلاعات پیش‌بینی موجود نیست"
                : "No forecast data available"}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
