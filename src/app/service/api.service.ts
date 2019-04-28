import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateRequest } from '../model/dto/createRequest';
import { Request } from '../model/request';
import { Answer } from '../model/answer';
import { MessageService } from '../message.service';
import {CreateAnswer} from '../model/dto/createAnswer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

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
  private postRequestAnswerUrl = '/answer';

  // http://127.0.0.1:58882/api/request
  getRequests(): Observable<HttpResponse<Request[]>> {
    return this.http.get<Request[]>(this.baseRequestUrl, {observe: 'response'})
      .pipe(
        tap(response => this.log(`getRequests() returns ${response.status}`)),
        catchError(this.handleError<HttpResponse<Request[]>>('getRequests'))
      );
  }
  // http://127.0.0.1:58882/api/request/{requestId}/answers/
  getAnswers(requestId: number): Observable<HttpResponse<Answer[]>> {
    const getUrl = this.baseRequestUrl + requestId.toString() + this.getRequestAnswersUrl;
    this.log(getUrl);
    return this.http.get<Answer[]>(getUrl, {observe: 'response'})
      .pipe(
        tap( response => this.log(`getAnswers(${requestId}) returns: ${response.status}`)),
        catchError(this.handleError<HttpResponse<Answer[]>>('getRequests',  ))
      );
  }

  // addAnswer
  // http://127.0.0.1:58882/api/request/{requestId}/answer/}
  addAnswer(newAnswer: CreateAnswer): Observable<HttpResponse<CreateAnswer>> {
    const postUrl = this.baseRequestUrl + newAnswer.requestId + this.postRequestAnswerUrl;
    this.log(`addAnswer was called: ${postUrl}`);
    return this.http.post<CreateAnswer>(postUrl, newAnswer, { headers: {'Content-Type': 'application/json'}, observe: 'response'})
      .pipe(
        tap(response => this.log(`addAnswer() returns ${response.status}`)),
        catchError(this.handleError<HttpResponse<CreateAnswer>>('addAnswer')));
  }


  // addRequest
  // http://127.0.0.1:58882/api/request/
  addRequest(newRequest: CreateRequest): Observable<HttpResponse<CreateRequest>> {
    this.log('addRequest was called');
    return this.http.post<CreateRequest>(this.baseRequestUrl,
      newRequest,
      { headers: {'Content-Type': 'application/json'}, observe: 'response'})
      .pipe(
        tap(response => this.log(`addRequest() returns ${response.status}`)),
        catchError(this.handleError<HttpResponse<CreateRequest>>('addRequest')));
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
