import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBrand } from './brand.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IBrand[]> {
    return this.httpClient.get<IBrand[]>(this.apiURL + 'brands/')
      .pipe(
        catchError(errorHandler)
      )
  }

  // create(post): Observable<IProvider> {
  //   return this.httpClient.post<IProvider>(this.apiURL + 'posts/', JSON.stringify(post), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }

  // find(id): Observable<IProvider> {
  //   return this.httpClient.get<IProvider>(this.apiURL + 'posts/' + id)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }

  // update(id, post): Observable<IProvider> {
  //   return this.httpClient.put<IProvider>(this.apiURL + 'posts/' + id, JSON.stringify(post), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }

  // delete(id) {
  //   return this.httpClient.delete<IProvider>(this.apiURL + 'posts/' + id, this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }
}