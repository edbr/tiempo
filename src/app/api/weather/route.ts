import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log("API called with:", { lat, lon }); // ✅ check inputs

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  console.log("OPENWEATHER_API_KEY:", apiKey ? "✓ found" : "❌ missing");

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log("Fetching:", url);

    const res = await fetch(url);
    console.log("OpenWeather response status:", res.status);

    if (!res.ok) {
      const msg = await res.text();
      console.error("OpenWeather error:", msg);
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    const data = await res.json();
    console.log("OpenWeather success:", data.name);

    return NextResponse.json({
      city: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
