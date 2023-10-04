import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, Signal, WritableSignal, inject, isDevMode, signal } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message } from './chat.model';
import { getASampleText$, sampleMessages$ } from './chat-messages.mock';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  allMessagesSignal: WritableSignal<Message[]> = signal([] as Message[]);

  get allMessages(): Signal<Message[]> {
    return this.allMessagesSignal.asReadonly();
  }

  destryoRef = inject(DestroyRef);

  constructor(private http: HttpClient) {
    // initial message
    this.getDefaultMessage()
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
    this.getMessage(sendingMessage)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe((text: string) => {
        this.allMessagesSignal.mutate((value) => {
          value[index].type = 'sent';
          value.push({text, type: 'received', timestamp: new Date().getTime()});
          return value;
        });
      });
  }

  getDefaultMessage(): Observable<string> {
    if (environment.isMockup) {
      return getASampleText$('received');
    }
    return this.http.get(`${environment.apiUrl}/practice/`,
        {responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }

  getMessage (message: string): Observable<string> {
    if (environment.isMockup) {
      return getASampleText$('received');
    }
    return this.http.get(`${environment.apiUrl}/practice/new`,
        {params: {message: encodeURIComponent(message)}, responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }
}
