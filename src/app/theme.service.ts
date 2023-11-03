import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';
import { ThemeMode } from './states/theme.state.interface';
import { AppState } from './app.state.interface';
import { tap } from 'rxjs';
import * as ThemeActions from './theme/store/theme.actions';
import { getMode } from './theme/store/theme.selectors';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeMode$ = this.store.select(getMode)
    .pipe(
      tap((e) => console.log('hello' , e)),
      tap((mode: ThemeMode) => this.updateBackground(mode === 'Dark')))
  
  constructor(private themeStorage: StorageService<boolean>, private store: Store<AppState>) {
    // update toggle from different tabs
    // effect(() => {
    //   const darkmode = !!this.themeStorage.getStorageEvent('darkmode');
    //   this.updateBackground(darkmode);
    //   this.darkmodeSignal.set(darkmode);
    // }, { allowSignalWrites: true });
  }

  initialTheme() { // should call only once to set default storage
    const hour = new Date().getHours();
    let darkmodeCondition = hour >= 18 || hour < 6; // 6pm to 6am darkmode
    darkmodeCondition = this.themeStorage.getLocalStorage('darkmode', darkmodeCondition); // if storage does not exist, use the condition
    this.themeStorage.setLocalStorage('darkmode', darkmodeCondition); // set storage

    this.store.dispatch(ThemeActions.reset(darkmodeCondition));
  }

  updateBackground(darkmode: boolean) {
    if (darkmode) {
      document.documentElement.style.background = 'black';
    } else {
      document.documentElement.style.background = 'white';
    }
  }

  toggle() {
    this.store.dispatch(ThemeActions.toggle());
    // this.themeStorage.setLocalStorage('darkmode', ); // set storage
  }
}
