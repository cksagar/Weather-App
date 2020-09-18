import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    apiKey = "f31ca5ecda72864c91485834fcec0b76";
    url;

    constructor(private http: HttpClient) {
        this.url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    }
    getWeather(city) {
        return this.http.get(this.url + city + ',' + '&APPID=' + this.apiKey);
    }
}