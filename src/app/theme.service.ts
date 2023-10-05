import { Injectable, effect, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkmodeSignal = signal(false);
  darkmode = this.darkmodeSignal.asReadonly();

  constructor(private themeStorage: StorageService<boolean>) {
    // update toggle from same tabs
    effect(() => {
      this.updateBackground(this.darkmode());
    });

    // update toggle from different tabs
    effect(() => {
      const darkmode = !!this.themeStorage.getStorageEvent('darkmode');
      this.updateBackground(darkmode);
      this.darkmodeSignal.set(darkmode);
    }, { allowSignalWrites: true });
  }

  initialTheme() { // should call only once to set default storage
    const hour = new Date().getHours();
    let darkmodeCondition = hour >= 18 || hour < 6; // 6pm to 6am darkmode
    darkmodeCondition = this.themeStorage.getLocalStorage('darkmode', darkmodeCondition); // if storage does not exist, use the condition
    this.darkmodeSignal.set(darkmodeCondition);
    this.themeStorage.setLocalStorage('darkmode', darkmodeCondition); // set storage
  }

  updateBackground(darkmode: boolean) {
    if (darkmode) {
      document.documentElement.style.background = 'black';
    } else {
      document.documentElement.style.background = 'white';
    }
  }

  toggle() {
    const updatedDarkmode = !this.darkmode();
    this.darkmodeSignal.set(updatedDarkmode);
    this.themeStorage.setLocalStorage('darkmode', updatedDarkmode); // set storage
  }
}
