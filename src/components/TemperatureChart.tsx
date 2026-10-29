
import {
  Box,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const temperatureData = [
  { month: "Jan", temperature: 16 },
  { month: "Feb", temperature: 27 },
  { month: "Mar", temperature: 20 },
  { month: "Apr", temperature: 23 },
  { month: "May", temperature: 27 },
  { month: "Jun", temperature: 22 },
  { month: "Jul", temperature: 37 },
  { month: "Aug", temperature: 29 },
  { month: "Sep", temperature: 39 },
  { month: "Oct", temperature: 25 },
  { month: "Nov", temperature: 31 },
  { month: "Dec", temperature: 25 },
];

export default function TemperatureChart() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        height: 280,
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
          fontSize: { xs: 16, sm: 20},
          color: "text.primary",
          mb: 1,
        }}
      >
        Average Monthly Temperature
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 220,
          minWidth: 0,
        }}
      >
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
              interval="preserveStartEnd"
              minTickGap={8}
              tick={{
                fontSize: 12,
                fill: theme.palette.text.secondary,
              }}
              tickMargin={8}
            />

            <YAxis
              domain={[0, 40]}
              ticks={[10, 20, 30, 40]}
              tickFormatter={(value: number) => `${value}°C`}
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
                `${value}°C`,
                "Temperature",
              ]}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{
                color: theme.palette.text.primary,
              }}
            />

            <Line
              type="linear"
              dataKey="temperature"
              stroke="url(#temperatureLineGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#7957FF",
                stroke: theme.palette.background.paper,
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
