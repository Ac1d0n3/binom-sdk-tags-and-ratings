import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnTagListComponent } from './bn-tag-list.component';

describe('BnTagListComponent', () => {
  let component: BnTagListComponent;
  let fixture: ComponentFixture<BnTagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnTagListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
