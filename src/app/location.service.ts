import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  private addLocationSubj: BehaviorSubject<string | undefined> = new BehaviorSubject(undefined)
  addLocation$ = this.addLocationSubj.asObservable()

  private removeLocationSubj: BehaviorSubject<string | undefined> = new BehaviorSubject(undefined)
  removeLocation$ = this.removeLocationSubj.asObservable()

  constructor() {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
  }

  addLocation(zipcode : string) {
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.addLocationSubj.next(zipcode)
  }

  removeLocation(zipcode : string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.removeLocationSubj.next(zipcode)
    }
  }
}
