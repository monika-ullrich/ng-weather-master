import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {

  protected weatherService = inject(WeatherService);
  private router = inject(Router);
  private locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  private addSubscription?: Subscription;
  private removeSubscription?: Subscription;

  ngOnInit() {
    // Add conditions for all locations that are initially present.
    this.locationService.locations.forEach((zipcode) =>
        this.weatherService.addCurrentConditions(zipcode))

    this.addSubscription = this.locationService.addLocation$.subscribe((zipcode) =>
        this.weatherService.addCurrentConditions(zipcode))

    this.removeSubscription = this.locationService.removeLocation$.subscribe((zipcode) =>
        this.weatherService.removeCurrentConditions(zipcode))
  }

  ngOnDestroy() {
    this.addSubscription?.unsubscribe()
    this.removeSubscription?.unsubscribe()
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  removeLocation(location: ConditionsAndZip) {
    this.locationService.removeLocation(location.zip)
  }

  getTitle(location: ConditionsAndZip) {
    return location.data.name + ' (' + location.zip + ')'
  }
}
