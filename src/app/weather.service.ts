import {Injectable, OnInit, Signal, signal} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentConditions} from './current-conditions/current-conditions.type';
import {ConditionsAndZip} from './conditions-and-zip.type';
import {Forecast} from './forecasts-list/forecast.type';
import {CacheService} from "./cache/cache.service";

@Injectable()
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  addCurrentConditions(zipcode: string): void {
    const cachedConditions = this.cacheService.getCurrentConditions(zipcode)
    let conditions$: Observable<CurrentConditions>;
    if (cachedConditions) {
      conditions$ = cachedConditions
    } else {
      conditions$ = this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
      this.cacheService.cacheCurrentConditions(zipcode, conditions$)
    }
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    conditions$.subscribe(data => {
      // Update if already exists.
      this.currentConditions.update(conditions => {
        const existingConditionForZipIndex = conditions.findIndex((condition) => condition.zip === zipcode)
        if (existingConditionForZipIndex > -1) {
          conditions.splice(existingConditionForZipIndex, 1, {zip: zipcode, data})
          return [...conditions]
        } else {
          return [...conditions, {zip: zipcode, data}]
        }
      })
    });
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
      return conditions;
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    const cachedForecast$ = this.cacheService.getForecast(zipcode)
    if (cachedForecast$) {
      return cachedForecast$
    }
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    const forecast$=  this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
    this.cacheService.cacheForecast(zipcode, forecast$)
    return forecast$
  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
