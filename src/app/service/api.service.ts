import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateRequest } from '../model/dto/createRequest';
import { Request } from '../model/request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient) {
  }

  private baseUrl = 'http://127.0.0.1:58882/api/';
  private createAnswerUrl = 'answers/create';
  private createRequestUrl = 'requests/create';
  private getRequestsUrl = 'requests/getall';

  // getRequests
  getRequests(): Observable<Request[]> {
    const getUrl = this.baseUrl + this.getRequestsUrl;
    return this.http.get<Request[]>(getUrl);
  }

  // addAnswer
  // addRequest
  addRequest(newRequest:CreateRequest): Observable<CreateRequest>{
    const addRequestUrl = this.baseUrl + this.createRequestUrl;
    return this.http.post<CreateRequest>(addRequestUrl, newRequest, httpOptions).pipe(catchError(this.handleError<CreateRequest>('addRequest')));
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
