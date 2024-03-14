import {Forecast} from '../forecasts-list/forecast.type';
import {CurrentConditions} from '../current-conditions/current-conditions.type';

export type CacheItem = {
    expiry: number,
    value: Forecast | CurrentConditions
}