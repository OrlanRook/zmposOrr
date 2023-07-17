import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICartItem, ICartItemFlat } from '../cart/cart.interface';
import { errorHandler, GlobalVariable } from 'src/app/global';
import { ISale } from '../sales/sales.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public orderItem?: ICartItem[];
  public order?: ISale;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ISale[]> {
    return this.httpClient.get<ISale[]>(this.apiURL + 'sales/orders/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getItems(pk: number): Observable<ICartItem[]> {
    return this.httpClient.get<ICartItem[]>(this.apiURL + 'sales/'+ pk + '/items/')
      .pipe(
        catchError(errorHandler)
      )
  }

  deleteOrder(order: ISale) {
    
    let update = {'status':'CA'};

    return this.httpClient.patch<ISale>(this.apiURL + 'sales/' + order.id + '/',  JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(errorHandler)
    );
  }

  sendOrderByWhatsapp(pk: number): Observable<any> {
    return this.httpClient.get(this.apiURL + 'sales/'+ pk + '/quotes/send/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getPdfQuote(pk: number): Observable<any> {
    return this.httpClient.get(this.apiURL + 'sales/'+ pk + '/quotes/download/', { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }

}