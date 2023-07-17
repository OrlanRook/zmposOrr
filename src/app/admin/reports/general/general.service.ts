import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorHandler, GlobalVariable } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getReport(params: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'reports/?'+ params, { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }
}