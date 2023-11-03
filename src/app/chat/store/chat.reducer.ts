import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ChatState, Message, MessageType } from '../../states/chat.state.interface'
import * as ChatActions from './chat.actions';

export const initialState: ChatState = {messages: [] as Message[]};
export const chatReducer: ActionReducer<ChatState, Action> = createReducer(
    initialState,
    on(ChatActions.sendMessage, (state, action) => ({ messages: [...state.messages,
    {
      text: action.message,
      type: 'sending' as MessageType,
      timestamp: new Date().getTime()
    }] })),
    on(ChatActions.responseMessage, (state, action) => ({ messages: [...state.messages,
      {
        text: action.message,
        type: 'received' as MessageType,
        timestamp: new Date().getTime()
      }] })),
  );
