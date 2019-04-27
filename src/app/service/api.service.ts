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

  private baseUrl = 'http://127.0.0.1:58882/api/';
  private getRequestsUrl = 'request/';
  private getRequestAnswersUrl = '/answers/';

  // getRequests
  getRequests(): Observable<Request[]> {
    const getUrl = this.baseUrl + this.getRequestsUrl;
    return this.http.get<Request[]>(getUrl)
      .pipe(
        catchError(this.handleError<Request[]>('getRequests', []))
      );
  }

  // addAnswer
  // addRequest
  addRequest(newRequest: CreateRequest): Observable<CreateRequest>{
    const addRequestUrl = this.baseUrl + this.getRequestsUrl;
    return this.http.post<CreateRequest>(addRequestUrl, newRequest, httpOptions)
      .pipe(catchError(this.handleError<CreateRequest>('addRequest')));
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

  getAnswers(requestId: number): Observable<Answer[]> {
    console.log('ApiService:getAnswers says: ' + requestId);
    const getUrl = this.baseUrl + this.getRequestsUrl + requestId.toString() + this.getRequestAnswersUrl;
    console.log('ApiService:getAnswers says: ' + getUrl);
    return this.http.get<Answer[]>(getUrl);
  }

  private log(message: string) {
    this.messageService.add('ApiService: ${message}');
  }
}
