import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorHandler, GlobalVariable } from 'src/app/global';
import { IConfig } from './config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IConfig[]> {
    return this.httpClient.get<IConfig[]>(this.apiURL + 'users/configs/')
      .pipe(
        catchError(errorHandler)
      )
  }

  updateConfig(config: IConfig): Observable<IConfig> {
    return this.httpClient.put<IConfig>(this.apiURL + 'users/configs/' + config.id + '/', JSON.stringify(config), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  

  
}