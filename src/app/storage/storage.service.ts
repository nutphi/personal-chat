import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AppState } from '../states/app.state.interface';
import { Store } from '@ngrx/store';
import * as StorageActions from './store/storage.actions';
@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {
  storage$ = fromEvent<StorageEvent>(window, 'storage');

  constructor(private store: Store<AppState>) {
    this.store.dispatch(StorageActions.setDefault());
  }
}
