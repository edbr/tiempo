"use client";

import { WeatherForm } from "@/components/WeatherForm";
import { WeatherCard } from "@/components/WeatherCard";
import { useState } from "react";
import { WeatherData } from "@/lib/weather";

export default function Page() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center">Weather App</h1>
        <WeatherForm onResult={setWeather} onError={setError} />
        {weather && <WeatherCard data={weather} />}
        {error && (
          <p className="text-center text-sm text-red-600 bg-orange-100 p-2 rounded">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
