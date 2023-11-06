import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as StorageActions from './storage.actions';
import { StorageState } from 'src/app/states/storage.state.interface';

const initialState: StorageState = { ...localStorage };
export const storageReducer: ActionReducer<StorageState> = createReducer(
  initialState,
  on(StorageActions.setDefault, (state, _) => {
    return { ...state, ... localStorage };
  }),
  on(StorageActions.setItem, (state, action) => {
    localStorage.setItem(action.key, action.value);
    return { ... state, [action.key]: localStorage.getItem(action.key) as string };
  })
)
