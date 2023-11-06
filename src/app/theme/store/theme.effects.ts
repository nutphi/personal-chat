import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/states/app.state.interface";
import * as ThemeActions from './theme.actions';
import * as StorageActions from '../../storage/store/storage.actions';

@Injectable()
export class ThemeEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  getDefaultResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.set),
      map((action) => StorageActions.setItem({ key: 'mode', value: action.mode }))
    ));
  
  getToggleResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.toggle),
      withLatestFrom(this.store), // Combining with the current state
      map(([action, store]) => StorageActions.setItem({ key: 'mode', value: store.theme.mode }))
    ));
}