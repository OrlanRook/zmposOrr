import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { INewItem } from '../items/item/item.interface';
import { IClient } from '../records/client/client.interface';
import { ISaleWeekly, ISaleYearly, ISaleYearlySummary } from 'src/app/site/sales/sales.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getNewClients(): Observable<IClient[]> {
    return this.httpClient.get<IClient[]>(this.apiURL + 'dashboard/clients/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getTopProducts(): Observable<INewItem[]> {
    return this.httpClient.get<INewItem[]>(this.apiURL + 'dashboard/products/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getEmptyStock(): Observable<INewItem[]> {
    return this.httpClient.get<INewItem[]>(this.apiURL + 'dashboard/emptystock/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getWeeklySales(): Observable<ISaleWeekly[]> {
    return this.httpClient.get<ISaleWeekly[]>(this.apiURL + 'dashboard/weeklysales/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getWeeklyReturns(): Observable<ISaleWeekly[]> {
    return this.httpClient.get<ISaleWeekly[]>(this.apiURL + 'dashboard/weeklyreturns/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getWeeklyOrders(): Observable<ISaleWeekly[]> {
    return this.httpClient.get<ISaleWeekly[]>(this.apiURL + 'dashboard/weeklyorders/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getWeeklyRepairs(): Observable<ISaleWeekly[]> {
    return this.httpClient.get<ISaleWeekly[]>(this.apiURL + 'dashboard/weeklyrepairs/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getCurrentWeeklySales(): Observable<ISaleWeekly[]> {
    return this.httpClient.get<ISaleWeekly[]>(this.apiURL + 'dashboard/currentweeksales/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getCurrentYearlySales(): Observable<ISaleYearly[]> {
    return this.httpClient.get<ISaleYearly[]>(this.apiURL + 'dashboard/currentyearsales/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getCurrentYearlySummarySales(): Observable<ISaleYearlySummary[]> {
    return this.httpClient.get<ISaleYearlySummary[]>(this.apiURL + 'dashboard/yearsales/')
      .pipe(
        catchError(errorHandler)
      )
  }

}