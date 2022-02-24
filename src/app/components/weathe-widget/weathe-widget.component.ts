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
  locationWeather: any;
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
    this.getLocationWeatherData();
  }

  getLocationWeatherData() {
    navigator.geolocation.watchPosition((success) => {
      let { latitude, longitude } = success.coords;
      this.weatherService
        .getWeatherDataByCoords(latitude, longitude)
        .subscribe((response) => {
          this.locationWeather = response;
          this.weatherDataLoaded = true;
          this.getLocationCurrentWeather();
          this.getLocationTimezone();
          this.getLocationDailyWeather();
          console.log(response);
        });
    });
  }

  getLocationCurrentWeather() {
    let { humidity, pressure, sunrise, sunset, wind_speed, dt, weather, temp } =
      this.locationWeather.daily[0];
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

  getLocationTimezone() {
    this.timezone = this.locationWeather.timezone;
    this.timezoneDataLoaded = true;
  }

  getLocationDailyWeather() {
    this.locationWeather.daily.shift();
    this.otherDays = this.locationWeather.daily;
    this.otherDaysDataLoaded = true;
  }
}
