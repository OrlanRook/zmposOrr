import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRepairService } from './repairservice.interface';
import { GlobalVariable, errorHandler } from 'src/app/global';


@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IRepairService[]> {
    return this.httpClient.get<IRepairService[]>(this.apiURL + 'repairservices/')
      .pipe(
        catchError(errorHandler)
      )
  }
}