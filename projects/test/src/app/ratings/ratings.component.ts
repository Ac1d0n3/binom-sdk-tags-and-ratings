import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnRatingsComponent } from '@binom/sdk-tags-and-ratings/ratings';
import { BnTagsService } from '@binom/sdk-tags-and-ratings/tags-svc';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, BnRatingsComponent],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent {
  allTags = [{id:'1',tag:'Development'}, {id:'2',tag:'javasecript'}, {id:'3',tag:'html'}]
  tags = [{id:'1',tag:'Development'}, {id:'3',tag:'html'}]
  constructor(private tagSvc:BnTagsService){
    this.tagSvc.setAllTags(this.allTags)
  }
}
