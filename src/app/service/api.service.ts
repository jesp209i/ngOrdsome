import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { CreateRequest } from '../model/dto/createRequest';
import { Request } from '../model/request';
import { Answer } from '../model/answer';
import { MessageService } from '../message.service';
import {CreateAnswer} from '../model/dto/createAnswer';

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
  private patchRequestClose = '/close';
  private patchAnswerPreffered = '/correct';

  // public methods for retrieving data from api
  // http://127.0.0.1:58882/api/request
  getRequests(): Observable<HttpResponse<Request[]>> {
    return this.fetch<Request[]>(this.baseRequestUrl, 'getRequests');
  }
  getRequest(requestId: number): Observable<HttpResponse<Request>> {
    const getRequestUrl = `${this.baseRequestUrl}${requestId}`;
    return this.fetch<Request>(getRequestUrl, `getRequest(${requestId})`);
  }
  // http://127.0.0.1:58882/api/request/{requestId}/answers/
  getAnswers(requestId: number): Observable<HttpResponse<Answer[]>> {
    const getUrl = `${this.baseRequestUrl}${requestId}${this.getRequestAnswersUrl}`;
    return this.fetch<Answer[]>(getUrl, 'getAnswers');
  }

  // public methods for sending data to api
  // http://127.0.0.1:58882/api/request/{requestId}/answer/}
  addAnswer(newAnswer: CreateAnswer): Observable<HttpResponse<CreateAnswer>> {
    const postUrl = this.baseRequestUrl + newAnswer.requestId + this.postRequestAnswerUrl;
    return this.add<CreateAnswer>(newAnswer, postUrl, 'addAnswer');
  }
  // http://127.0.0.1:58882/api/request/
  addRequest(newRequest: CreateRequest): Observable<HttpResponse<CreateRequest>> {
    const postUrl = this.baseRequestUrl;
    return this.add<CreateRequest>(newRequest, postUrl, 'addRequest');
  }

  changeRequestStatus(request: Request): Observable<HttpResponse<Request>> {
    const patchUrl = `${this.baseRequestUrl}${request.requestId}${this.patchRequestClose}`;
    return this.patch(patchUrl, {isClosed: request.isClosed}, 'changeRequestStatus');
  }

  preferedAnswer(answer: Answer): Observable<{}> {
    const patchUrl = `${this.baseRequestUrl}${answer.requestId}${this.getRequestAnswersUrl}${answer.answerId}`;
    return this.patch(patchUrl, {isPreferred: answer.isPreferred}, 'preferredAnswer');
  }

  //
  // private methods add<T> and fetch<T> provides httpGet and httpPost requests
  // by the use of generics
  //
  private add<T>(newRequest: T, postUrl: string, sender: string): Observable<HttpResponse<T>> {
    return this.http.post<T>(postUrl, newRequest,
      { headers: {'Content-Type': 'application/json'}, observe: 'response'})
      .pipe(
        tap(response => this.log(`${sender} was called: ${postUrl} returns ${response.status}`)),
        catchError(this.handleError<HttpResponse<T>>(sender)));
  }

  private fetch<T>(getUrl: string, sender: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(getUrl, {observe: 'response'})
      .pipe(
        tap(response => this.log(`${sender} was called: ${getUrl} returns: ${response.status}`)),
        catchError(this.handleError<HttpResponse<T>>(`${sender}`)));
  }

  private patch<T>(getUrl: string, jsonPatch, sender: string): Observable<HttpResponse<T>> {
    return this.http.patch<T>(getUrl, jsonPatch,
      { headers: {'Content-Type': 'application/json'}, observe: 'response'})
      .pipe(
        tap(response => this.log(`${sender} was called: ${getUrl} returns: ${response.status}`)),
        catchError(this.handleError<HttpResponse<T>>(`${sender}`)));
  }

  // methods used for error handling
  private log(message: string) {
    this.messageService.add(`ApiService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`); // log to messageService
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
