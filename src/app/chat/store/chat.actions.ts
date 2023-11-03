import { createAction, props } from '@ngrx/store';

export const sendMessage = createAction('send a message to server', props<{message: string}>());

export const responseMessage = createAction('request response message from server', props<{sendingMessage?: string, message: string}>());

export const requestDefaultMessage = createAction('request default message from server');
