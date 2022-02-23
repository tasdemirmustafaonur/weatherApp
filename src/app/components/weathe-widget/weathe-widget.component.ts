import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Current } from 'src/app/models/current';
import { Timezone } from 'src/app/models/timezone';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weathe-widget',
  templateUrl: './weathe-widget.component.html',
  styleUrls: ['./weathe-widget.component.css'],
})
export class WeatheWidgetComponent implements OnInit {
  current: Current;
  timezone: Timezone;
  daily: [];
  weather: any;
  dateTime: Date;
  otherDays: any;

  weatherDataLoaded: boolean = false;
  currentDataLoaded: boolean = false;
  timezoneDataLoaded: boolean = false;
  otherDaysDataLoaded: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      this.dateTime = new Date();
    });
    this.getWeatherData();
  }

  getWeatherData() {
    navigator.geolocation.watchPosition((success) => {
      let { latitude, longitude } = success.coords;
      this.weatherService
        .getWeatherData(latitude, longitude)
        .subscribe((response) => {
          this.weather = response;
          this.weatherDataLoaded = true;
          this.getCurrentWeather();
          this.getTimezone();
          this.getDailyWeather();
          console.log(response);
        });
    });
  }

  getCurrentWeather() {
    let { humidity, pressure, sunrise, sunset, wind_speed, dt, weather, temp } =
      this.weather.daily[0];
    this.current = {
      humidity,
      pressure,
      sunrise,
      sunset,
      wind_speed,
      dt,
      weather,
      temp,
    };
    this.currentDataLoaded = true;
  }

  getTimezone() {
    this.timezone = this.weather.timezone;
    this.timezoneDataLoaded = true;
  }

  getDailyWeather() {
    this.weather.daily.shift();
    this.otherDays = this.weather.daily;
    this.otherDaysDataLoaded = true;
  }
}
