import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    apiKey = "f31ca5ecda72864c91485834fcec0b76";
    urlForWeather;
    urlForSevenDay;


    constructor(private http: HttpClient) {
        this.urlForWeather = 'http://api.openweathermap.org/data/2.5/weather?q=';
        this.urlForSevenDay = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    }
    getWeather(city) {
        return this.http.get(this.urlForWeather + city + '&APPID=' + this.apiKey);
    }

    getWeatherSeven(city) {
        return this.http.get(this.urlForSevenDay + city + '&cnt=7' + '&APPID=' + this.apiKey);
    }
}