import { createAction } from '@ngrx/store';

export const toggle = createAction('toggle into dark/light mode');

export const reset = createAction('set to default mode (light mode)', (isDarkMode: boolean) => ({ mode: isDarkMode ? 'Dark' : 'Light' }));
