import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnTagsShowComponent } from './bn-tags-show.component';

describe('BnTagsShowComponent', () => {
  let component: BnTagsShowComponent;
  let fixture: ComponentFixture<BnTagsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnTagsShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnTagsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
