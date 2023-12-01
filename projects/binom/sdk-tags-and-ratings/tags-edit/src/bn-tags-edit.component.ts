import { Input, Output, OnInit, EventEmitter, Component, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { BnParamFilterService } from '@binom/sdk-core/router-param-filter';
import { BnRouterDataAndTitleService } from '@binom/sdk-core/router';

import { Observable, Subscription, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatInputModule } from '@angular/material/input';

import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BnIconComponent } from '@binom/sdk-core/icons';
import { BnSearchFilterPipe } from '@binom/sdk-core/pipes';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'bn-tags-edit',
  standalone: true,
  imports: [CommonModule,MatChipsModule,MatTooltipModule,TranslateModule,MatRippleModule,MatButtonModule,BnIconComponent, BnSearchFilterPipe,MatInputModule,MatAutocompleteModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './bn-tags-edit.component.html',
  styleUrl: './bn-tags-edit.component.css'
})
export class BnTagsEditComponent implements OnInit, OnDestroy {


  @Input() removable:boolean = true;
  @Input() taglabel:string = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new UntypedFormControl();
  filteredTags: Observable<any[]>;
  @Input() tags: any[]= [];
  @Input() allTags: any[] = [];
  @Input() styleDisabled: boolean = false;
  @Input() tagStyle:string = 'bn';

  @Output() tagChange = new EventEmitter();
  @Output() curTags = new EventEmitter();

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(){
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  add(event: any): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({tag:value.trim(), id: null});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
    this.tagChange.emit({action: 'add',tag:value.trim(), id: null});
    this.curTags.emit(this.tags);
  }

  remove(tag: string): void {

    const index = this.tags.findIndex((obj) => obj == tag);

    if (index !== -1) {
      this.tags.splice(index, 1);
    }
    this.curTags.emit(this.tags)
    this.tagChange.emit({action: 'remove', tag:tag, id: null})
  }

  selected(event: any): void {

    let check = this.tags.findIndex((obj:any)=> obj.tag === event.option.value.tag)
    if(check === -1){
      this.tags.push(event.option.value);
      this.tagChange.emit({action: 'add', tag:event.option.value.tag, id: event.option.value.id});
      this.curTags.emit(this.tags);
    }

    this.tagCtrl.setValue('');

  }

  private _filter(value: any): any[] {
    console.log('Filter Value',value)
    let setValue = value;
    if(value.tag) setValue = value.tag;
    const filterValue = setValue.toLowerCase();

    return this.allTags.filter(tag => tag.tag.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy(): void {
    
  }

}

