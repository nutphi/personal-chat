import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message } from './chat.model';
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
    this.getDefaultMessage()
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe((text: string) => {
        this.allMessagesSignal.mutate((value) => {
          value.push({text, type: 'received'});
          return value;
        });
      });
  }

  sendMessage(sendingMessage: string): void {
    let index: number;
    this.allMessagesSignal.mutate((value) => {
      const message: Message = {text: sendingMessage, type: 'sending'};
      value.push(message);
      index = value.indexOf(message);
      return value;
    });
    this.getMessage(sendingMessage)
      .pipe(takeUntilDestroyed(this.destryoRef))
      .subscribe((text: string) => {
        this.allMessagesSignal.mutate((value) => {
          value[index].type = 'sent';
          value.push({text, type: 'received'});
          return value;
        });
      });
  }

  getDefaultMessage(): Observable<string> {
    return this.http.get("https://us-east1-personal-chat-3eac2.cloudfunctions.net/practice/",
        {responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }

  getMessage (message: string): Observable<string> {
    return this.http.get("https://us-east1-personal-chat-3eac2.cloudfunctions.net/practice/new",
        {params: {message: encodeURIComponent(message)}, responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }
}

