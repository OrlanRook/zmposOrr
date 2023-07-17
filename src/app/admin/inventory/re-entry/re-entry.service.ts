import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { IReentry } from './re-entry.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';

type modelDataType = IReentry;

@Injectable({
  providedIn: 'root'
})
export class ReentryService {

  private apiURL     = GlobalVariable.BASE_API_URL;
  private mediaURL   = GlobalVariable.MEDIA_URL;

  private apiModule  = 'inventory/reentry/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<modelDataType[]> {
    return this.httpClient.get<modelDataType[]>(this.apiURL + this.apiModule )
      .pipe(
        catchError(errorHandler)
      )
  }
  
  createTransfer(data: modelDataType): Observable<modelDataType> {
    return this.httpClient.post<modelDataType>(this.apiURL + this.apiModule, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }
}