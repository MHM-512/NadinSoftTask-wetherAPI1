import { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardPage from "./DashboardPage";

interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
}

export default function DashboardLayout() {
  const [selectedCity, setSelectedCity] = useState<GeoLocation | null>({
    name: "Tehran",
    country: "IR",
    lat: 35.6892,
    lon: 51.389,
  });

  return (
    <>
      <Navbar selectedCity={selectedCity} onCitySelect={setSelectedCity} />
      
      <DashboardPage selectedCity={selectedCity} />
    </>
  );
}
