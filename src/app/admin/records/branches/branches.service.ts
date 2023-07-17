import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBranch } from './branches.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';

type modelDataType = IBranch;

@Injectable({
  providedIn: 'root'
})
export class BranchesService {


  private apiURL     = GlobalVariable.BASE_API_URL;
  private mediaURL   = GlobalVariable.MEDIA_URL;

  private apiModule  = 'branches/';

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
      responseType: 'json',
    });

    return this.httpClient.request(req);
  }

  getBranch(pk:number): Observable<IBranch> {
    return this.httpClient.get<IBranch>(this.apiURL + 'branches/'+ pk +'/')
      .pipe(
        catchError(errorHandler)
      )
  }

  getUserBranch(pk:number): Observable<IBranch[]> {
    return this.httpClient.get<IBranch[]>(this.apiURL + 'users/'+ pk +'/branches/')
      .pipe(
        catchError(errorHandler)
      )
  }
}