import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sampleMessages } from './chat-messages.mock';
import { IChatApiService } from '../chat-api.interface.service';

@Injectable({
  providedIn: 'root'
})
export class ChatApiMockService implements IChatApiService {

  constructor() { }

  getDefaultMessage(): Observable<string> {
    return of(sampleMessages[0].text);
  }
  getMessage(message: string): Observable<string> {
    return of(sampleMessages[2].text);
  }
}
