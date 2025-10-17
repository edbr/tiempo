// lib/weather.ts
export type WeatherData = {
  city: string;
  temp: number;
  condition: string;
  icon: string;
};

export async function getCoords(location: string) {
  const geoRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_KEY}`
  );
  const geoData = await geoRes.json();

  if (!geoData.results?.length) throw new Error("Invalid location");

  const { lat, lng } = geoData.results[0].geometry.location;
  return { lat, lon: lng };
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}
