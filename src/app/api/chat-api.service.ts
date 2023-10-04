import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IChatApiService } from './chat-api.interface.service';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService implements IChatApiService {

  constructor(private http: HttpClient) { }

  getDefaultMessage(): Observable<string> {
    return this.http.get(`${environment.apiUrl}/practice/`,
        {responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }

  getMessage (message: string): Observable<string> {
    return this.http.get(`${environment.apiUrl}/practice/new`,
        {params: {message: encodeURIComponent(message)}, responseType: 'text'}
      )
      .pipe(catchError(() => of("Unfortunately, I can't answer this question.")));
  }
}
