import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { IRegister } from './register.interface';
import { IFile } from 'src/app/common.interface';

type modelDataType = IRegister;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiURL     = GlobalVariable.BASE_API_URL;
  private mediaURL   = GlobalVariable.MEDIA_URL;

  private apiModule  = 'inventory/register/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<modelDataType[]> {
    return this.httpClient.get<modelDataType[]>(this.apiURL + 'inventory/registers/' )
      .pipe(
        catchError(errorHandler)
      )
  }
  
  createRegister(file: IFile): Observable<modelDataType> {
    let data = {'file': file.id };
    return this.httpClient.post<modelDataType>(this.apiURL + 'inventory/registers/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('original_name', file.name);
    formData.append('path', this.apiModule);
    formData.append('url', file);
    console.log("formadata:",formData)
    const req = new HttpRequest('POST', this.mediaURL + 'files/', formData, {
      reportProgress: false,
      //observe:'event',
      responseType: 'json', 
      
    });
    
    return this.httpClient.request(req);
  }

  downloadFile(data: modelDataType): Observable<any> {
    return this.httpClient.get(this.apiURL + 'inventory/registers/' + data.id+ '/files/', { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }

  getTemplate(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'inventory/registers/template/', { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }
}