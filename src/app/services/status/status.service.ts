import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Status} from '../../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
	private headers: HttpHeaders;
	private accessPointUrl: string = 'http://localhost:5000/api/statuses';

  constructor(private http: HttpClient) {
  	    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

   getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.accessPointUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

   errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

 
}
