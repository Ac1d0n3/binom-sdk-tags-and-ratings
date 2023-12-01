import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnRatingsComponent } from './bn-ratings.component';

describe('BnRatingsComponent', () => {
  let component: BnRatingsComponent;
  let fixture: ComponentFixture<BnRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnRatingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
