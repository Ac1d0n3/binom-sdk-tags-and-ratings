import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { BnTagsEditComponent } from '@binom/sdk-tags-and-ratings/tags-edit';
import { BnTagsShowComponent } from '@binom/sdk-tags-and-ratings/tags-show';
import { BnTagsService } from '@binom/sdk-tags-and-ratings/tags-svc';

@Component({
  selector: 'bn-tags-show-edit',
  standalone: true,
  imports: [CommonModule,BnTagsShowComponent, BnTagsEditComponent],
  templateUrl: './bn-tags-show-edit.component.html',
  styleUrl: './bn-tags-show-edit.component.css'
})
export class BnTagsShowEditComponent implements OnInit,OnDestroy {
  private sub!: Subscription;

  private _removable:boolean = false;
  get removable():boolean{ return this._removable; }
  @Input() set removable(val:BooleanInput){ this._removable = coerceBooleanProperty(val); }

  private _showAll:boolean = false;
  get showAll():boolean{ return this._showAll; }
  @Input() set showAll(val:BooleanInput){ 
    this._showAll = coerceBooleanProperty(val); 
    this.tags = this.allTags;
  }

  private _editMode:boolean = false;
  get editMode():boolean{ return this._editMode; }
  @Input() set editMode(val:BooleanInput){ this._editMode = coerceBooleanProperty(val); }

  private _styleDisabled:boolean = false;
  get styleDisabled():boolean{ return this._styleDisabled; }
  @Input() set styleDisabled(val:BooleanInput){ this._styleDisabled = coerceBooleanProperty(val); }


  @Input() taglabel:string = '';
  @Input() resetFromParams:boolean = true;
  @Input() setParams:boolean = true;
  @Input() setClearFilter: boolean = true;
  @Input() tags: any[] = [];

  allTags: any[] = [];

  @Input() curSelectedTags:any[] = [];

  @Input() tagSearch:string = '';
  @Input() selectable: boolean = true;

  @Input() tagStyle:string = 'bn';

  @Output() tagChange = new EventEmitter();
  @Output() curTags = new EventEmitter();
  @Output() selectedTags = new EventEmitter();

  paramTags:any = []

  constructor(
    private tagsService:BnTagsService) { }

  ngOnInit(){
    this.sub = this.tagsService.allTags$.subscribe((tags:any) => {
      this.allTags = tags;
      if(this.showAll) this.tags = this.allTags
    })
  }

  onSelectedTags(event:any){
    this.selectedTags.emit(event)
  }

  onTagChange(event:any){
    this.tagChange.emit(event)
  }

  onCurTags(event:any){
    this.curTags.emit(event)
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

}
