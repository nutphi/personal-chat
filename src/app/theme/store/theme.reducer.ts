import { ActionReducer, createReducer, on } from '@ngrx/store';
import { ThemeMode, ThemeState } from 'src/app/states/theme.state.interface';
import * as ThemeActions from './theme.actions';

const initialState: ThemeState = {mode: 'Light'};
export const themeReducer: ActionReducer<ThemeState> = createReducer(
  initialState,
  on(ThemeActions.toggle, (state) => {
    const mode: ThemeMode = state.mode === 'Light' ? 'Dark' : 'Light';
    return { ... state, mode };
  }),
  on(ThemeActions.set, (state, action) => {
    return { ... state, mode: action.mode };
  }),
  on(ThemeActions.reset, (state) => {
    const hour = new Date().getHours();
    const darkmodeCondition = hour >= 18 || hour < 6; // 6pm to 6am dark mode
    const defaultMode = (darkmodeCondition ? 'Dark' : 'Light');
    const storageMode = localStorage.getItem('mode') as ThemeMode;
    return { mode: storageMode ?? defaultMode } as ThemeState;
  }),
)
