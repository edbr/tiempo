"use client";

/// <reference types="google.maps" />

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { getWeather, WeatherData } from "@/lib/weather";
import { Loader } from "@googlemaps/js-api-loader";

type WeatherFormProps = {
  onResult: (data: WeatherData) => void;
  onError: (msg: string) => void;
};

export function WeatherForm({ onResult, onError }: WeatherFormProps) {
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [locationInput, setLocationInput] = useState("");

  // 🧭 Ask for geolocation permissions on load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            setLoading(true);
            const data = await getWeather(
              pos.coords.latitude,
              pos.coords.longitude
            );
            onResult(data);
          } catch (err: any) {
            onError(err.message);
          } finally {
            setLoading(false);
          }
        },
        () => {
          console.warn("User denied location access");
        }
      );
    }
  }, [onResult, onError]);

  // 🌎 Initialize Google Places Autocomplete
  useEffect(() => {
    async function init() {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
        libraries: ["places"],
      });
      await loader.load();

      const input = document.getElementById(
        "location-input"
      ) as HTMLInputElement | null;
      if (!input) return;

      const autocompleteObj = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"],
        fields: ["geometry", "name", "formatted_address"],
      });

      autocompleteObj.addListener("place_changed", async () => {
        const place = autocompleteObj.getPlace();
        const lat = place.geometry?.location?.lat();
        const lon = place.geometry?.location?.lng();

        if (lat && lon) {
          try {
            setLoading(true);
            const data = await getWeather(lat, lon);
            onResult(data);
          } catch (err: any) {
            onError(err.message);
          } finally {
            setLoading(false);
          }
        }
      });

      setAutocomplete(autocompleteObj);
    }

    init();
  }, [onResult, onError]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-center gap-3"
    >
      <Input
        id="location-input"
        placeholder="Enter your city or allow location access"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        disabled={loading}
        className="w-full text-sm"
      />
      {loading && (
        <p className="text-xs text-muted-foreground text-center">
          Loading weather data...
        </p>
      )}
    </form>
  );
}
