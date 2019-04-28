import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateRequest } from '../model/dto/createRequest';
import { Request } from '../model/request';
import { Answer } from '../model/answer';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  private baseRequestUrl = 'http://127.0.0.1:58882/api/request/';
  private getRequestAnswersUrl = '/answers/';

  // http://127.0.0.1:58882/api/request
  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseRequestUrl)
      .pipe(
        tap(_ => this.log('fetched requests')),
        catchError(this.handleError<Request[]>('getRequests', []))
      );
  }
  // http://127.0.0.1:58882/api/request/{requestId}/answers/
  getAnswers(requestId: number): Observable<Answer[]> {
    const getUrl = this.baseRequestUrl + requestId.toString() + this.getRequestAnswersUrl;
    return this.http.get<Answer[]>(getUrl)
      .pipe(
        catchError(this.handleError<Answer[]>('getRequests', []))
      );
  }

  // addAnswer
  // addRequest
  addRequest(newRequest: CreateRequest): Observable<CreateRequest> {
    return this.http.post<CreateRequest>(this.baseRequestUrl, newRequest, httpOptions)
      .pipe(
        tap(_ => this.log('//')),
        catchError(this.handleError<CreateRequest>('addRequest')));
  }

  private log(message: string) {
    this.messageService.add(`ApiService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
