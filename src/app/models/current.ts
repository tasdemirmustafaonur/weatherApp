export interface Current {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: [id: number, main: string, description: string, icon: string];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
