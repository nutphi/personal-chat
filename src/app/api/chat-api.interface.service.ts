import { Observable } from "rxjs";

export interface IChatApiService {
  getDefaultMessage(): Observable<string>;
  getMessage(message: string): Observable<string>;
}
