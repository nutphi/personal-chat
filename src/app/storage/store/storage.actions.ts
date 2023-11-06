import { createAction, props } from "@ngrx/store";

export const setItem = createAction('setLocalStorageItem', props<{ key: string, value: string }>());

export const setDefault = createAction('setDefaultLocalStorageItem');

export const listenLocalStorageEvent = createAction('listenLocalStorageEvent');
