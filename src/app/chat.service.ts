import { DestroyRef, Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message } from './chat.model';
import { ChatApiService } from './api/chat-api.service';
import { environment } from 'src/environments/environment';
import { ChatApiMockService } from './api/mock/chat-api.mock.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  destryoRef = inject(DestroyRef);
  allMessagesSignal: WritableSignal<Message[]> = signal([] as Message[]);
  chatApi = inject(!environment.isMockup ? ChatApiService : ChatApiMockService);

  get allMessages(): Signal<Message[]> {
    return this.allMessagesSignal.asReadonly();
  }

  constructor() {
    // initial message
    this.chatApi.getDefaultMessage()
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe((text: string) => {
        this.allMessagesSignal.mutate((value) => {
          value.push({text, type: 'received', timestamp: new Date().getTime()});
          return value;
        });
      });
  }

  sendMessage(sendingMessage: string): void {
    let index: number;
    // sending user message
    this.allMessagesSignal.mutate((value) => {
      const message: Message = {text: sendingMessage, type: 'sending', timestamp: new Date().getTime()};
      value.push(message);
      index = value.indexOf(message);
      return value;
    });
    // receving bot message and update user message to sent status
    this.chatApi.getMessage(sendingMessage)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe((text: string) => {
        this.allMessagesSignal.mutate((value) => {
          value[index].type = 'sent';
          value.push({text, type: 'received', timestamp: new Date().getTime()});
          return value;
        });
      });
  }
}
