import { Component } from '@angular/core';
import {CacheService} from '../cache/cache.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cache-expiry',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cache-expiry.component.html',
  styleUrl: './cache-expiry.component.css'
})
export class CacheExpiryComponent {
  cacheExpiry = this.cacheService.expiryDurationSeconds;

  constructor(private cacheService: CacheService) {
  }

  setCacheExpiry() {
    this.cacheService.updateExpiryDuration(this.cacheExpiry)
  }
}
