import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IInventory, IItem, INewItem } from './item.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'blob' as 'json'
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IItem[]> {
    return this.httpClient.get<IItem[]>(this.apiURL + 'products/')
      .pipe(
        catchError(errorHandler)
      );
  }

  create(item: INewItem): Observable<INewItem> {
    return this.httpClient.post<INewItem>(this.apiURL + 'products/', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  createInventory(item: IInventory): Observable<IInventory> {
    return this.httpClient.post<IInventory>(this.apiURL + 'inventories/', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  createLabel(items: IItem[], offset: number, copies: number): Observable<any> {
    let data = { 
      'offset': offset,
      'copies': copies,
      'items' : items
    };

    return this.httpClient.post(this.apiURL + 'products/labels/', JSON.stringify(data), this.httpOptions2 )
      .pipe(
        catchError(errorHandler)
      );
  }

}