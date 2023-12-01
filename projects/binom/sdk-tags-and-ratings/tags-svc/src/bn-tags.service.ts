import { Injectable } from '@angular/core';
import { BnTags } from './bn-tags';
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BnTagsService {
  private _allTags= new BehaviorSubject<any>([]);
  public allTags$ = this._allTags.asObservable();
  constructor() { }
  setAllTags(allTags:BnTags[]){ this._allTags.next(allTags) }
  getTags(){ return this._allTags.value }
  setTag(tag:BnTags){ this._allTags.next(this.getTags().push(tag)) }
}
