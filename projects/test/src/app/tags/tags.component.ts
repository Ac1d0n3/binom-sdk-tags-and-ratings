import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnTagsEditComponent } from '@binom/sdk-tags-and-ratings/tags-edit';
import { BnTagsShowComponent } from '@binom/sdk-tags-and-ratings/tags-show';
import { BnTagsShowEditComponent } from '@binom/sdk-tags-and-ratings/tags-show-edit';
import { BnTagsService } from '@binom/sdk-tags-and-ratings/tags-svc';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, BnTagsShowEditComponent, BnTagsEditComponent, BnTagsShowComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  allTags = [{id:'1',tag:'Development'}, {id:'2',tag:'javasecript'}, {id:'3',tag:'html'}]
  tags = [{id:'1',tag:'Development'}, {id:'3',tag:'html'}]
  constructor(private tagSvc:BnTagsService){
    this.tagSvc.setAllTags(this.allTags)
  }
}
