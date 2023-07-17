import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProfile, IRole } from 'src/app/site/profile/profile.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';

type modelDataType = IProfile;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private apiURL     = GlobalVariable.BASE_API_URL;
  private mediaURL   = GlobalVariable.MEDIA_URL;

  private apiModule  = 'users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<modelDataType[]> {
    return this.httpClient.get<modelDataType[]>(this.apiURL + this.apiModule)
      .pipe(
        catchError(errorHandler)
      )
  }

  create(data: modelDataType): Observable<modelDataType> {
    return this.httpClient.post<modelDataType>(this.apiURL + this.apiModule, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  update(data: modelDataType): Observable<modelDataType> {
    return this.httpClient.put<modelDataType>(this.apiURL + this.apiModule + data.id + '/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  delete(data: modelDataType) {
    return this.httpClient.delete(this.apiURL + this.apiModule + data.id + '/', this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  uploadImage(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('original_name', file.name);
    formData.append('path', this.apiModule);
    formData.append('url', file);

    const req = new HttpRequest('POST', this.mediaURL + 'images/', formData, {
      reportProgress: false,
      responseType: 'json'
      });

    return this.httpClient.request(req);
  }

  getRoles(): Observable<IRole[]> {
    return this.httpClient.get<IRole[]>(this.apiURL + 'roles/')
      .pipe(
        catchError(errorHandler)
      )
  }

  updatePassword(data: modelDataType, password: string): Observable<any> {
    let update = {'password': password };

    return this.httpClient.patch<any>(this.apiURL + 'users/' + data.id + '/password/' + data.id + '/', JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  resetPassword(phone: string): Observable<any> {
    let update = {'phone': phone };

    return this.httpClient.post<any>(this.apiURL + 'users/resetpwd/', JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }
}