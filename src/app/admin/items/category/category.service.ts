import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory, ILine } from './category.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(this.apiURL + 'lines/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getLine(): Observable<ILine[]> {
    return this.httpClient.get<ILine[]>(this.apiURL + 'lines/')
      .pipe(
        catchError(errorHandler)
      )
  }
  getSubLine1(): Observable<ILine[]> {
    return this.httpClient.get<ILine[]>(this.apiURL + 'subline1/')
      .pipe(
        catchError(errorHandler)
      )
  }
  getSubLine2(): Observable<ILine[]> {
    return this.httpClient.get<ILine[]>(this.apiURL + 'subline2/')
      .pipe(
        catchError(errorHandler)
      )
  }
  getCode(base:string): Observable<string> {
    return this.httpClient.post<string>(this.apiURL + 'products/code/', JSON.stringify(base), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }
}