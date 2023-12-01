import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnTagsEditComponent } from './bn-tags-edit.component';

describe('BnTagsEditComponent', () => {
  let component: BnTagsEditComponent;
  let fixture: ComponentFixture<BnTagsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnTagsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnTagsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
