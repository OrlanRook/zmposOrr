import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDevice } from './device.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IDevice[]> {
    return this.httpClient.get<IDevice[]>(this.apiURL + 'devices/')
      .pipe(
        catchError(errorHandler)
      )
  }

}