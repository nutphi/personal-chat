import { Injectable, inject } from '@angular/core';
import { ChatApiService } from '../api/chat-api.service';
import { environment } from '../../environments/environment';
import { ChatApiMockService } from '../api/mock/chat-api.mock.service';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state.interface';
import { getMessages } from './store/chat.selectors';
import * as ChatActions from './store/chat.actions';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatApi = inject(!environment.isMockup ? ChatApiService : ChatApiMockService);
  messages$ = this.store.select(getMessages);

  constructor(private store: Store<AppState>) {
  }

  sendDefaultMessage(): void {
    this.store.dispatch(ChatActions.requestDefaultMessage());
  }

  sendMessage(sendingMessage: string): void {
    this.store.dispatch(ChatActions.sendMessage({message: sendingMessage}));
  }
}
