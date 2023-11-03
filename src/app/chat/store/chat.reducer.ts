import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ChatState, Message, MessageType } from '../../states/chat.state.interface'
import * as ChatActions from './chat.actions';

export const initialState: ChatState = {messages: [] as Message[]};
export const chatReducer: ActionReducer<ChatState, Action> = createReducer(
    initialState,
    on(ChatActions.sendMessage, (state, {message}) => ({ messages: [...state.messages,
    {
      text: message,
      type: 'sending' as MessageType,
      timestamp: new Date().getTime()
    }] })),
    on(ChatActions.responseMessage, (state, {sendingMessage, message}) => {
      const messages = [
        ...(state.messages.filter((msg) => msg.text !== sendingMessage && msg.type !== 'sending')),
      ];
      if (sendingMessage) {
        messages.push({
          text: sendingMessage,
          type: 'sent' as MessageType,
          timestamp: new Date().getTime()
        });
      }
      messages.push({
        text: message,
        type: 'received' as MessageType,
        timestamp: new Date().getTime()
      });
      return {
        ...state,
        messages
      }
    }),
  );
