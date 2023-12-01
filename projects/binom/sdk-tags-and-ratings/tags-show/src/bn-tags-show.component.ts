import { Input, Output, OnInit, EventEmitter, Component, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { BnParamFilterService } from '@binom/sdk-core/router-param-filter';
import { BnRouterDataAndTitleService } from '@binom/sdk-core/router';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { MatInputModule } from '@angular/material/input';

import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BnIconComponent } from '@binom/sdk-core/icons';
import { BnSearchFilterPipe } from '@binom/sdk-core/pipes';

@Component({
  selector: 'bn-bn-tags-show',
  standalone: true,
  imports: [CommonModule,MatChipsModule,MatTooltipModule,TranslateModule,MatRippleModule,MatButtonModule,BnIconComponent, BnSearchFilterPipe],
  templateUrl: './bn-tags-show.component.html',
  styleUrl: './bn-tags-show.component.css'
})
export class BnTagsShowComponent implements OnInit, OnDestroy{
  private _tags: any[]= [];
  get tags(): any[] { return this._tags}
  @Input() set tags(vals: any[]){
    this._tags = vals;
    this.setSelected();
  }
  @Input() allTags: any[] = [];

  @Input() styleDisabled: boolean = false;
  @Input() setClearFilter: boolean = true;

  @Input() selectable: boolean = false;
  @Input() curSelectedTags:any[] = [];

  @Input() resetFromParams:boolean = true;
  @Input() setParams:boolean = true;
  @Input() tagSearch:string = '';
  @Input() tagStyle:string = 'bn';

  @Output() selectedTags = new EventEmitter();
  @Output() curTags = new EventEmitter();

  constructor(
    private routerData:BnRouterDataAndTitleService,
    private filterSvc: BnParamFilterService ,
    private cdr:ChangeDetectorRef
  ) { }
  paramTags:any = [];
  private sub!: Subscription;
  private sub2!: Subscription;


  private resetTags(){

    this.curSelectedTags = [];
    this.paramTags = [];
    if(this.tags)
      for (let i = 0; i < this.tags.length; i++){
        this.tags[i].selected = false;
      }
  }

  ngOnInit(): void {

    if(this.resetFromParams){
      this.sub = this.routerData.routerData$.subscribe((data:any) => {
       
        if(data.routerParams.tags){
          this._setClearFilter();
          this.paramTags = data.routerParams.tags.split(',')
          
          this.setSelected();
          
        } else {
          this.resetTags();
          this._removeClearFilter();
        }
      });
    
    
    }

    if(this.setClearFilter && this.setParams){
      this.sub2 = this.filterSvc.clearState$.subscribe((data:string) => this.__handleUpdate(data));
    }

  }

  private setSelected(){
    this.curSelectedTags = [];
    for (let i = 0; i < this.tags.length; i++){
      this.tags[i].selected = false;
    }
    for (let i = 0; i < this.paramTags.length; i++){
      let index = this.tags.findIndex((obj:any) => obj.tag === this.paramTags[i])
      if(index != -1){
        
        this.tags[index].selected = true;
        this.curSelectedTags.push(this.tags[index]);
      }
    }
    //this.cdr.detectChanges()
  }

  private __handleUpdate(data:string){
    if(data === 'tags'){
      this.resetTags();
      this.emitChange();
    }
  }

  private _setClearFilter(){
    if(this.setClearFilter)
    //setTimeout(() => {
      this.filterSvc.addFilter({
        label: 'tags', clear: 'tags', icon: 'fas fa-tag fa-fw'
      });
    //});
  }

  private _removeClearFilter(){
    if(this.setClearFilter)
      this.filterSvc.removeClearFilter('tags');
  }

  private emitChange(){
    if(this.setParams){
      this.routerData.setRouterParams({
        tags: this.paramTags.length > 0? this.paramTags.toString() : null,
      },'', false);
    }
    this.selectedTags.emit(this.curSelectedTags);
    this.curTags.emit(this.tags);
  }

  selectTag(tag:any){
    let index = this.curSelectedTags.findIndex((obj:any) => obj.id === tag.id)
    if(this.selectable){
      if(tag.selected === undefined || tag.selected === false){
        tag.selected = true;
        if(index === -1){
          this.curSelectedTags.push(tag);
        }
        if(this.paramTags.findIndex((obj:any) => obj === tag.tag) === -1){
          this.paramTags.push(tag.tag);
        }

      } else {
        tag.selected = false;
        this.paramTags = this.paramTags.filter((obj:any) => tag.tag !== obj )
        if(index != -1){
          this.curSelectedTags.splice(index,1);
        }
      }
    }
    if(this.curSelectedTags.length > 0){
       this._setClearFilter()
    } else {
      this._removeClearFilter()
    }
    this.tags = this.tags
    this.emitChange();

  }

  ngOnDestroy() { 
    if(this.sub) this.sub.unsubscribe(); 
    if(this.sub2) this.sub2.unsubscribe(); 
  }
}
