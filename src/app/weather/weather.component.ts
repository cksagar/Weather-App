import { Chart } from 'node_modules/chart.js';
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
  public SevenData: any;
  errorMessage = '';
  showMore = false;

  maxData = [];

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  getTodayWeather(formValues) {
    console.log(formValues);
    this.apiService
      .getWeather(formValues.location)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      },
        e => {
          this.errorMessage = e.message;
          console.error('errr: ' + this.errorMessage);
        });
  }

  toggleButton() {
    this.showMore = !this.showMore;
    this.getSevenDayWeather(this.weatherData.name);
  }

  // -----------------------------
  getSevenDayWeather(name) {
    console.log(name);
    this.apiService
      .getWeatherSeven(name)
      .subscribe(data => {
        this.SevenData = data;
        console.log(this.SevenData);
        this.showChart(this.SevenData);
      },
        e => {
          this.errorMessage = e.message;
          console.error('errr: ' + this.errorMessage);
        });
  }

  showChart(SevenData) {
    for (let index = 0; index < SevenData.list.length; index++) {
      const element = SevenData.list[index].main.temp_max;
      this.maxData.push(element);
    }

    const myChart = new Chart('canChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [this.maxData[0], this.maxData[1], this.maxData[2], this.maxData[3], this.maxData[4], this.maxData[5]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
