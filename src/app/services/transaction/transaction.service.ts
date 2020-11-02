import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Transaction} from '../../models/transaction';
import {TransactionViewModelUpdate} from '../../models/transaction-view-model-update';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
	private headers: HttpHeaders;
	private accessPointUrl: string = 'http://localhost:5000/api/transactions';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
  	    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

   getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.accessPointUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTransactionById(transactionId): Observable<Transaction>
  {
    return this.http.get<Transaction>(this.accessPointUrl + '/' + transactionId).pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteTransaction(transactionId: number): Observable<void> {
      return this.http.delete<void>(this.accessPointUrl + '/' + transactionId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  importCsv(csvFile: File): Observable<void>{
    const formData: FormData = new FormData();
    formData.append('FormFile', csvFile, csvFile.name);
    return this.http.post<void>(this.accessPointUrl + '/import', formData);
  }

  exportExcel(): Observable<any>{
     return this.http.get(this.accessPointUrl + '/export', {responseType: 'blob'});
  }

  updateTransaction(transactionId: number, transactionViewModelUpdate: TransactionViewModelUpdate): Observable<any>
  {
     return this.http.put<any>(this.accessPointUrl + '/' + transactionId, JSON.stringify(transactionViewModelUpdate), this.httpOptions)
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
