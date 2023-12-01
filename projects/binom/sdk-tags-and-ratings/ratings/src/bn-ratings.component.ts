import { Component, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty, BooleanInput, NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { MatRippleModule } from '@angular/material/core';
import { BnIconComponent} from '@binom/sdk-core/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bn-bn-ratings',
  standalone: true,
  imports: [CommonModule,BnIconComponent,MatRippleModule],
  templateUrl: './bn-ratings.component.html',
  styleUrl: './bn-ratings.component.css'
})
export class BnRatingsComponent {
  public ratings: number[] = [];
  public icon:string = 'star';

  @Input() color: any = '';
  @Input() size:string = 'medium';
  @Input() icontype: string = 'star';
 
  
  private _disabled:boolean = false;
  get disabled():boolean{ return this._disabled; }
  @Input() set disabled(val:BooleanInput){ this._disabled = coerceBooleanProperty(val); }

  private _max:number = 5;
  get max():number { return this._max; }
  @Input() set max(val:NumberInput){ this._max = coerceNumberProperty(val); }

  private _rating:number = 0;
  get rating():number { return this._rating; }
  @Input() set rating(val:NumberInput){ this._rating = coerceNumberProperty(val); }

  @Output() ratingValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    for(let i =0; i < this.max; i++){ this.ratings.push(i+1) }
    if(this.icontype === 'dot') this.icon = 'fa-circle';
    if(this.icontype === 'star' || this.icontype === '') this.icon = 'fa-star';
    if(this.icontype === 'box'){
      this.icon = 'fa-square';
      this.size = this.size + 'box';
    }
  }

  doRating(value:number){
    if(!this.disabled){
      if(this.rating == 1 && value  == 1) value = 0;
      this.rating = value;
      this.ratingValue.emit(this.rating)
    }
  }
}