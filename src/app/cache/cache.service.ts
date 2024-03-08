import {Injectable} from "@angular/core";
import {Forecast} from "../forecasts-list/forecast.type";
import {CacheItem} from "./cacheItem";
import {Observable, of} from "rxjs";
import {CurrentConditions} from "../current-conditions/current-conditions.type";

@Injectable({providedIn: 'root'})
export class CacheService {
    // Default is 2 hours. Duration is in seconds.
    expiryDurationSeconds = 2 * 60 * 60

    // Prefixes for the data in the localstorage.
    currentConditionsPrefix = 'currentConditions_'
    forecastPrefix = 'forecast_'

    cacheForecast(zipCode: string, forecast$: Observable<Forecast>) {
        this.storeItem(this.forecastPrefix + zipCode, forecast$)
    }

    cacheCurrentConditions(zipCode: string, conditions$: Observable<CurrentConditions>){
        this.storeItem(this.currentConditionsPrefix + zipCode, conditions$)
    }

    getForecast(zipCode: string) {
        return this.getItem(this.forecastPrefix + zipCode) as Observable<Forecast>
    }

    getCurrentConditions(zipCode: string) {
        return this.getItem(this.currentConditionsPrefix + zipCode) as Observable<CurrentConditions>
    }

    updateExpiryDuration(expiryDuration: number) {
        // Remove all forecast and conditions as the expiry was changed
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++){
            if (localStorage.key(i).startsWith(this.currentConditionsPrefix)
                || localStorage.key(i).startsWith(this.forecastPrefix)) {
                keysToRemove.push(localStorage.key(i));
            }
        }
        keysToRemove.forEach((element) => localStorage.removeItem(element))

        this.expiryDurationSeconds = expiryDuration
    }

    private storeItem(key: string, observable$: Observable<CurrentConditions | Forecast>) {
        const expiry = Date.now() + this.expiryDurationSeconds * 1000
        observable$.subscribe((value) => {
            const cacheItem: CacheItem = {
                expiry,
                value
            }
            localStorage.setItem(key, JSON.stringify(cacheItem))
        })
    }

    private getItem(key: string) {
        const item = localStorage.getItem(key)
        if (!item) {
            return null
        }

        const parsedItem = JSON.parse(item) as CacheItem

        if (Date.now() > parsedItem.expiry) {
            // Item is expired.
            localStorage.removeItem(key)
            return null
        }

        return of(parsedItem.value)
    }
}