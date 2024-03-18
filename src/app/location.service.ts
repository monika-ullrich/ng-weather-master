import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  // Each location in local storage can only exist once.
  locations : Set<string> = new Set<string>();

  private addLocationSubj: Subject<string> = new Subject()
  addLocation$ = this.addLocationSubj.asObservable()

  private removeLocationSubj: Subject<string> = new Subject()
  removeLocation$ = this.removeLocationSubj.asObservable()

  constructor() {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = new Set(JSON.parse(locString));
  }

  addLocation(zipcode : string) {
    this.locations.add(zipcode);
    // Locations are saved as array instead of Set to be backward compatible to the previous version.
    localStorage.setItem(LOCATIONS, JSON.stringify([...this.locations]));
    this.addLocationSubj.next(zipcode)
  }

  removeLocation(zipcode : string) {
    if (this.locations.has(zipcode)){
      this.locations.delete(zipcode);
      localStorage.setItem(LOCATIONS, JSON.stringify([...this.locations]));
      this.removeLocationSubj.next(zipcode)
    }
  }
}
