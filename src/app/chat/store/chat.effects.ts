import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of } from "rxjs";
import { ChatService } from "../chat.service";
import * as ChatActions from './chat.actions';

@Injectable()
export class ChatEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {}

  getDefault$ = createEffect(() =>
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
      mergeMap((action: any) => {
        return this.chatService.chatApi.getMessage(action.message);
      }),
      mergeMap((message: string) => {
        return of(ChatActions.responseMessage({ message }));
      })
));
}