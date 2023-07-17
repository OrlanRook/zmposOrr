import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { IInput } from './input.interface';
import { IFile } from 'src/app/common.interface';

type modelDataType = IInput;

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private apiURL     = GlobalVariable.BASE_API_URL;
  private mediaURL   = GlobalVariable.MEDIA_URL;

  private apiModule  = 'inventory/input/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<modelDataType[]> {
    return this.httpClient.get<modelDataType[]>(this.apiURL + 'inventory/input/' )
      .pipe(
        catchError(errorHandler)
      )
  }

  createInput(file: IFile): Observable<modelDataType> {
    let data = {'file': file.id };
    return this.httpClient.post<modelDataType>(this.apiURL + 'inventory/input/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      )
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('original_name', file.name);
    formData.append('path', this.apiModule);
    formData.append('url', file);

    const req = new HttpRequest('POST', this.mediaURL + 'files/', formData, {
      reportProgress: false,
      responseType: 'json',
    });

    return this.httpClient.request(req);
  }

  downloadFile(data: modelDataType): Observable<any> {
    return this.httpClient.get(this.apiURL + 'inventory/input/' + data.id+ '/files/', { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }

  getTemplate(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'inventory/input/template/', { responseType: 'blob' })
      .pipe(
        catchError(errorHandler)
      );
  }
}