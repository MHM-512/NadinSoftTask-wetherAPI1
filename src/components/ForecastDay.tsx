import { Box, Typography } from "@mui/material";
import type { ForecastResponse } from "../services/weatherApi";
import { useTranslation } from "react-i18next";

interface ForecastDayProps {
  forecast: ForecastResponse | null;
}
export default function ForecastDay({ forecast }: ForecastDayProps) {

  const { t , i18n } = useTranslation(); 
 

  const dailyForecast = forecast
    ? Object.values(
        forecast.list.reduce<Record<string, (typeof forecast.list)[number]>>(
          (days, item) => {
            const day = item.dt_txt.split(" ")[0];

            if (!days[day]) {
              days[day] = item;
            }

            return days;
          },
          {},
        ),
      ).slice(0, 5)
    : [];

  return (
    <Box
  
      sx={{
        mx: "auto",
        width: "100%",
        maxWidth: 1650,
        minHeight: 350,
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: "24px",
        p: 3,
        boxSizing: "border-box",
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
        }}
      >
        {t("weather.forecastTitle")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {/* Daily Forecast Card*/}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
          }}
        >
          {dailyForecast.map((item) => (
            <Box
              key={item.dt}
              sx={{
                flex: "0 0 100px",
                height: 220,
                borderRadius: 3,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#3D4761" : "#CDD9E0",
                color: "text.primary",
                p: 2,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="body2">
                {new Date(item.dt * 1000).toLocaleDateString(
                  i18n.language.startsWith("fa") ? "fa-IR" : "en-US",
                  { weekday: "short" },
                )}
              </Typography>

              <Box
                component="img"
                alt={item.weather[0]?.description ?? "Weather"}
                src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                sx={{ width: 56 }}
              />

              <Typography sx={{fontWeight: 600}}>
                {Math.round(item.main.temp) }°C
              </Typography>
            </Box>
          ))}
        </Box>

     
      </Box>
    </Box>
  );
}
