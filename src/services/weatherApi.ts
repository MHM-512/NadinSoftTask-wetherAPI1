
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export interface CurrentWeather {
  name: string;
  dt: number;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    timezone: number;
  };
}

export async function getCurrentWeather(
  lat: number,
  lon: number,
  language: string = "en"
) {
  const response = await weatherApi.get<CurrentWeather>(
    "/weather",
    {
      params: {
        lat,
        lon,
        lang: language,
      },
    }
  );

  return response.data;
}

export async function getForecast(
  lat: number,
  lon: number,
  language: string = "en"
) {
  const response = await weatherApi.get<ForecastResponse>(
    "/forecast",
    {
      params: {
        lat,
        lon,
        lang: language,
      },
    }
  );

  return response.data;
}
