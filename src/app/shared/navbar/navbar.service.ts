import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INavNotification, IPrinterCalc } from './navbar.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavNotificationService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient,
              private storageService: TokenStorageService) { }

  getNotification(pk:number): Observable<INavNotification[]> {
    return this.httpClient.get<INavNotification[]>(this.apiURL + 'users/' + pk + '/notifications/')
      .pipe(
        catchError(errorHandler)
      )
  }

  updateNotification(user_pk:number, pk:number, post: any): Observable<INavNotification> {
    return this.httpClient.patch<INavNotification>(this.apiURL + 'users/' + user_pk + '/notifications/' + pk +'/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  localPrint(data:IPrinterCalc): Observable<any> {
    let printerServer = this.storageService.getConfig('printer');

    if( !printerServer ) {
      printerServer = 'http://localhost:7000/';
    }

    data.type = 'calc';
    return this.httpClient.post<any>(printerServer, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }
}