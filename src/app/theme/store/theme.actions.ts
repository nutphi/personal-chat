import { createAction, props } from '@ngrx/store';
import { ThemeMode } from 'src/app/states/theme.state.interface';

export const toggle = createAction('toggle into dark/light mode');

export const reset = createAction('set to default mode (light mode)');

export const set = createAction('set to mode', props<{mode: ThemeMode}>());
