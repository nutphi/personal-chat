import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Store } from '@ngrx/store';
import { ThemeMode } from '../states/theme.state.interface';
import { AppState } from '../states/app.state.interface';
import { tap } from 'rxjs';
import * as ThemeActions from './store/theme.actions';
import { getMode } from './store/theme.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeMode$ = this.store.select(getMode)
    .pipe(
      tap((mode: ThemeMode) => this.updateBackground(mode === 'Dark')))

  constructor(private themeStorage: StorageService<ThemeMode>, private store: Store<AppState>) {
    this.themeStorage.storage$.pipe(takeUntilDestroyed()).subscribe((storage: StorageEvent) => {
      if (storage.key === 'mode') {
        this.store.dispatch(ThemeActions.set({ mode: storage.newValue as ThemeMode }));
      }
    });
  }

  public initialTheme(): void { // should call only once to set default storage
    this.store.dispatch(ThemeActions.reset());
  }

  private updateBackground(darkmode: boolean): void {
    if (darkmode) {
      document.documentElement.style.background = 'black';
    } else {
      document.documentElement.style.background = 'white';
    }
  }

  public toggle(): void {
    this.store.dispatch(ThemeActions.toggle());
  }
}
