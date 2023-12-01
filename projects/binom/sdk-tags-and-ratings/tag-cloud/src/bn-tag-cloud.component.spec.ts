import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnTagCloudComponent } from './bn-tag-cloud.component';

describe('BnTagCloudComponent', () => {
  let component: BnTagCloudComponent;
  let fixture: ComponentFixture<BnTagCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnTagCloudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnTagCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
