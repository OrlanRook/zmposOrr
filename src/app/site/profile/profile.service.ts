import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProfile, ISettings } from './profile.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getProfile(pk:number): Observable<IProfile> {
    return this.httpClient.get<IProfile>(this.apiURL + 'users/' + pk + '/')
      .pipe(
        catchError(errorHandler)
      )
  }

  updateSettings(user:number, pk:number, data: any): Observable<any> {
    return this.httpClient.patch(this.apiURL + 'users/' + user + '/settings/' + pk + '/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }
}