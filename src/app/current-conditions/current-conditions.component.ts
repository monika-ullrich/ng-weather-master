import {Component, inject, OnInit, Signal} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  protected weatherService = inject(WeatherService);
  private router = inject(Router);
  private locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  ngOnInit() {
    // Add conditions for all locations that are initially present.
    this.locationService.locations.forEach((zipcode) =>
        this.weatherService.addCurrentConditions(zipcode))

    this.locationService.addLocation$.subscribe((zipcode) =>
        this.weatherService.addCurrentConditions(zipcode))

    this.locationService.removeLocation$.subscribe((zipcode) =>
        this.weatherService.removeCurrentConditions(zipcode))
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  removeLocation(location: ConditionsAndZip) {
    this.locationService.removeLocation(location.zip)
  }

  getTitle(location: ConditionsAndZip) {
    return location.data.name + '(' + location.zip + ')'
  }
}
