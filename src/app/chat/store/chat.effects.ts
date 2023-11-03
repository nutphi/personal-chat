import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of } from "rxjs";
import { ChatService } from "../chat.service";
import * as ChatActions from './chat.actions';

@Injectable()
export class ChatEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {}

  getDefaultResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.requestDefaultMessage),
      mergeMap(() => {
        return this.chatService.chatApi.getDefaultMessage();
      }),
      mergeMap((message: string) => {
        return of(ChatActions.responseMessage({ message }));
      })
  ));

  getResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.sendMessage),
      mergeMap(({message}) => {
        return this.chatService.chatApi.getMessage(message)
          .pipe(
            map((newMessage: string) => ({sendingMessage: message, message: newMessage}))
          )
      }),
      mergeMap(({sendingMessage, message}) => {
        return of(ChatActions.responseMessage({ sendingMessage, message }));
      })
  ));
}