import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { INotification } from './notify.interface';

@Injectable({
  providedIn: 'root'
})
export class UserNotifyService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createNotification(data: INotification[]): Observable<INotification[]> {
    return this.httpClient.post<INotification[]>(this.apiURL + 'notifications/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  getNotification(): Observable<INotification[]> {
    return this.httpClient.get<INotification[]>(this.apiURL + 'notifications/')
      .pipe(
        catchError(errorHandler)
      )
  }

  deleteNotification(notify: INotification){
    return this.httpClient.delete(this.apiURL + 'notifications/' + notify.id + '/')
      .pipe(
        catchError(errorHandler)
    );
  }
}