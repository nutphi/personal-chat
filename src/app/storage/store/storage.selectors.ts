import { createSelector } from "@ngrx/store";
import { AppState } from "../../states/app.state.interface";

export const getStorage = (state: AppState) => state.storage;

export const getModeStorage = createSelector(getStorage, state => state['mode']);
