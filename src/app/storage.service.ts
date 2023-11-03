import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {
  // storage$ = fromEvent(window, 'storage');

  constructor() { }

  getStorageEvent(key: string): T | null {
    // const event = this.storageSignal() as StorageEvent;
    // if (event?.key === key && event.newValue) {
    //   return isSupportedJsonParse(event.newValue) ? JSON.parse(event.newValue) : event.newValue;
    // } else {
      return null;
    // }
  }

  setLocalStorage(key: string, value: T): void {
    const strValue = typeof(value) !== "string" ? JSON.stringify(value) : value;
    window.localStorage.setItem(key, strValue);
  }

  getLocalStorage(key: string, defaultValue: T): T {
    const strValue = window.localStorage.getItem(key);
    if (strValue) {
      return isSupportedJsonParse(strValue) ? JSON.parse(strValue) : strValue;
    } else {
      return defaultValue;
    }
  }
}

function isSupportedJsonParse(newValue: string) {
  try {
    JSON.parse(newValue);
  } catch (e) {
      return false;
  }
  return true;
}
