import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICondition } from './condition.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ICondition[]> {
    return this.httpClient.get<ICondition[]>(this.apiURL + 'conditions/')
      .pipe(
        catchError(errorHandler)
      )
  }
}