import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weathe-widget',
  templateUrl: './weathe-widget.component.html',
  styleUrls: ['./weathe-widget.component.css'],
})
export class WeatheWidgetComponent implements OnInit {
  weather: any;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
      this.weatherService
        .getWeatherData(latitude, longitude)
        .subscribe((response) => {
          this.weather = response;
          console.log(this.weather);
        });
    });
  }
}
