import { ActionReducer, Action, createAction, createReducer, on } from '@ngrx/store';
import { ThemeMode, ThemeState } from 'src/app/states/theme.state.interface';
import * as ThemeActions from './theme.actions';

const initialState: ThemeState = {mode: 'Light'};
export const themeReducer: ActionReducer<ThemeState> = createReducer(
  initialState,
  on(ThemeActions.toggle, (state) => {
    const mode: ThemeMode = state.mode === 'Light' ? 'Dark' : 'Light';
    return { mode };
  }),
  on(ThemeActions.reset, (state, action) => {
    return {mode: action.mode} as ThemeState;
  })
)
