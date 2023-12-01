import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BnTagsShowEditComponent } from './bn-tags-show-edit.component';

describe('BnTagsShowEditComponent', () => {
  let component: BnTagsShowEditComponent;
  let fixture: ComponentFixture<BnTagsShowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnTagsShowEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BnTagsShowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
