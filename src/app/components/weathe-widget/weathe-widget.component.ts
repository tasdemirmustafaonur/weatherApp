import { Component, OnInit } from '@angular/core';
import { Current } from 'src/app/models/current';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weathe-widget',
  templateUrl: './weathe-widget.component.html',
  styleUrls: ['./weathe-widget.component.css'],
})
export class WeatheWidgetComponent implements OnInit {
  current: Current;
  weather: any;
  weatherDataLoaded: boolean = false;
  dateObj: number = Date.now();
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    navigator.geolocation.watchPosition((success) => {
      let { latitude, longitude } = success.coords;
      this.weatherService
        .getWeatherData(latitude, longitude)
        .subscribe((response) => {
          this.weather = response;
          let { humidity, pressure, sunrise, sunset, wind_speed } =
            this.weather.current;
          this.current = { humidity, pressure, sunrise, sunset, wind_speed };
          this.weatherDataLoaded = true;
          console.log(response);
        });
    });
  }
}
