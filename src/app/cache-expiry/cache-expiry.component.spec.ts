import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheExpiryComponent } from './cache-expiry.component';

describe('CacheExpiryComponent', () => {
  let component: CacheExpiryComponent;
  let fixture: ComponentFixture<CacheExpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacheExpiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CacheExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
