export interface Current {
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  wind_speed: number;
  dt: number;
  weather: [{ id: number; main: 'string'; description: string; icon: string }];
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
}
