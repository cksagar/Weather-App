import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherSearchForm: FormGroup;
  public weatherData: any;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  sendToAPI(formValues) {
    console.log(formValues);
    this.apiService
      .getWeather(formValues.location)
      .subscribe(data => {
        this.weatherData = data;
        // console.log(this.weatherData);
      },
      e => {
        this.errorMessage = e.message;
        // console.error('errr: ' + this.errorMessage);

      });
  }
}
