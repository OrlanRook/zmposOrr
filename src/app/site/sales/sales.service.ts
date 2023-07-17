import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPrinterDB, ISale, ISaleItem, ISaleItemRaw, ISalePayment, ISaleRaw } from './sales.interface';
import { errorHandler, GlobalVariable } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createSale(post:ISaleRaw): Observable<ISale> {
    return this.httpClient.post<ISale>(this.apiURL + 'sales/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  createSaleItem(pk:number, data:ISaleItemRaw[]): Observable<ISaleItemRaw[]> {
    return this.httpClient.post<ISaleItemRaw[]>(this.apiURL + 'sales/' + pk + '/items/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  createSalePayment(pk:number, data:ISalePayment[]): Observable<ISalePayment[]> {
    return this.httpClient.post<ISalePayment[]>(this.apiURL + 'sales/' + pk + '/payments/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  updateSale(data:ISaleRaw): Observable<ISale> {
    return this.httpClient.put<ISale>(this.apiURL + 'sales/' + data.id + '/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  getAll(): Observable<ISale[]> {
    return this.httpClient.get<ISale[]>(this.apiURL + 'sales/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getItems(pk: number): Observable<ISaleItem[]> {
    return this.httpClient.get<ISaleItem[]>(this.apiURL + 'sales/'+ pk + '/items/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getPayments(pk: number): Observable<ISalePayment[]> {
    return this.httpClient.get<ISalePayment[]>(this.apiURL + 'sales/'+ pk + '/payments/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getPrinter(pk: number): Observable<IPrinterDB> {
    return this.httpClient.get<IPrinterDB>(this.apiURL + 'sales/'+ pk + '/print/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getPdfTicket(pk: number): Observable<any> {
    return this.httpClient.get(this.apiURL + 'sales/'+ pk + '/download/', { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }

  deleteSaleItem(saleId: number, pk:number) {
    return this.httpClient.delete(this.apiURL + 'sales/' + saleId + '/items/' + pk + '/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getDeliveries(): Observable<ISale[]> {
    return this.httpClient.get<ISale[]>(this.apiURL + 'sales/deliveries/')
      .pipe(
        catchError(errorHandler)
      )
  }

  updateDeliveries(data: ISale, delivery: string): Observable<any> {
    let update = {'delivery': delivery };
    return this.httpClient.patch <any>(this.apiURL + 'sales/deliveries/' + data.id + '/', JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }
}