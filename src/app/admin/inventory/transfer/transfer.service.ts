import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { ITransfer } from './transfer.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { IFile } from 'src/app/common.interface';

type modelDataType = ITransfer;

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private apiURL     = GlobalVariable.BASE_API_URL;
  private mediaURL   = GlobalVariable.MEDIA_URL;

  private apiModule  = 'inventory/transfer/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<modelDataType[]> {
    return this.httpClient.get<modelDataType[]>(this.apiURL + 'inventory/transfer/' )
      .pipe(
        catchError(errorHandler)
      )
  }
  
  createTransfer(data: modelDataType): Observable<modelDataType> {
    return this.httpClient.post<modelDataType>(this.apiURL + 'inventory/transfer/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }
}