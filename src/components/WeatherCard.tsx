// components/WeatherCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WeatherData } from "@/lib/weather";
import { CloudSunIcon } from "./Icons";

export function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <Card className="mt-4">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{data.city}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.condition}
          className="w-10 h-10"
        />
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Temperature: {data.temp}°C</p>
        <p className="capitalize text-gray-600">Condition: {data.condition}</p>
      </CardContent>
    </Card>
  );
}
