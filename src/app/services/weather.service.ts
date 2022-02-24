import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = '29b86e3f37e9aecf6fb43daa90b57eb9';
  private apiUrlCoords = 'https://api.openweathermap.org/data/2.5/onecall';
  private apiUrlCity = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private httpClient: HttpClient) {}

  getWeatherDataByCoords(latitude: number, longitude: number) {
    let params = new HttpParams()
      .set('lat', latitude)
      .set('lon', longitude)
      .set('exclude', 'hourly,minutely')
      .set('appid', this.API_KEY);

    return this.httpClient.get(this.apiUrlCoords, { params });
  }

  getWeatherDataByCityName(city: string) {
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);

    return this.httpClient.get(this.apiUrlCity, { params });
  }
}
