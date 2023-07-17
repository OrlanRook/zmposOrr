import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDrawer, IDrawerAssign, IDrawerOp } from './drawers.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { ISalePayment } from 'src/app/site/sales/sales.interface';


@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IDrawer[]> {
    return this.httpClient.get<IDrawer[]>(this.apiURL + 'drawers/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getDrawer(pk:number): Observable<IDrawer> {
    return this.httpClient.get<IDrawer>(this.apiURL + 'drawers/' + pk + '/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getDrawerWithUsers(pk:number): Observable<IDrawerAssign[]> {
    return this.httpClient.get<IDrawerAssign[]>(this.apiURL + 'drawers/' + pk + '/users/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getUserDrawer(pk:number): Observable<IDrawerAssign[]> {
    return this.httpClient.get<IDrawerAssign[]>(this.apiURL + 'users/'+ pk +'/drawers/')
      .pipe(
        catchError(errorHandler)
      )
  }
  setUserDrawer(pk:number, data: IDrawerAssign): Observable<IDrawerAssign> {
    return this.httpClient.post<IDrawerAssign>(this.apiURL + 'users/' + pk + '/drawers/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }
  removeUserDrawer(data: IDrawerAssign) {
    return this.httpClient.delete(this.apiURL + 'users/' + data.user.id + '/drawers/' + data.id + '/')
      .pipe(
        catchError(errorHandler)
      );
  }

  createDrawerOperation(post: IDrawerOp): Observable<IDrawerOp> {
    return this.httpClient.post<IDrawerOp>(this.apiURL + 'drawers/' + post.drawer + '/ops/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  getDrawerStatus(pk:number): Observable<IDrawerOp> {
    return this.httpClient.get<IDrawerOp>(this.apiURL + 'drawers/' + pk + '/status/')
      .pipe(
        catchError(errorHandler)
      );
  }

  getDrawerTotals(pk:number): Observable<ISalePayment[]> {
    return this.httpClient.get<ISalePayment[]>(this.apiURL + 'drawers/' + pk + '/totals/')
      .pipe(
        catchError(errorHandler)
      );
  }

  getDrawerMoves(pk:number, date: string): Observable<IDrawerOp[]> {
    return this.httpClient.get<IDrawerOp[]>(this.apiURL + 'drawers/' + pk + '/moves/?d=' + date)
      .pipe(
        catchError(errorHandler)
      );
  }
}