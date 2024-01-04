import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IChatApiService } from './chat-api.interface.service';
import { ENVIRONMENT } from '../environment.token';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService implements IChatApiService {
  private http = inject(HttpClient);
  private environment = inject(ENVIRONMENT);

  getDefaultMessage(): Observable<string> {
    return this.http.get(`${this.environment.apiUrl}/practice/`,
        {responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }

  getMessage (message: string): Observable<string> {
    return this.http.get(`${this.environment.apiUrl}/practice/new`,
        {params: {message: encodeURIComponent(message)}, responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }
}
