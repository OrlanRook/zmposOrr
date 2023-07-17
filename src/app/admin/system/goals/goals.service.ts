import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable, errorHandler } from 'src/app/global';
import { IGoalMonth, IGoalWeek } from './goals.interface';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private apiURL = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createGoals(data: IGoalMonth[]): Observable<IGoalMonth[]> {
    return this.httpClient.post<IGoalMonth[]>(this.apiURL + 'goals/month/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  createWeekGoals(data: IGoalWeek[]): Observable<IGoalWeek[]> {
    return this.httpClient.post<IGoalWeek[]>(this.apiURL + 'goals/week/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

  getGoals(): Observable<IGoalMonth[]> {
    return this.httpClient.get<IGoalMonth[]>(this.apiURL + 'goals/month/')
      .pipe(
        catchError(errorHandler)
      );
  }

  getGoalsYearly(year: number): Observable<IGoalMonth[]> {
    return this.httpClient.get<IGoalMonth[]>(this.apiURL + 'goals/month/?y=' + year)
      .pipe(
        catchError(errorHandler)
      );
  }

  getWeekGoalsYearly(year: number): Observable<IGoalWeek[]> {
    return this.httpClient.get<IGoalWeek[]>(this.apiURL + 'goals/week/?y=' + year)
      .pipe(
        catchError(errorHandler)
      );
  }

  updateGoal(data: IGoalMonth, amount: number): Observable<IGoalMonth> {
    let update = {'total': amount.toFixed(2) };

    return this.httpClient.patch<IGoalMonth>(this.apiURL + 'goals/month/' + data.id + '/', JSON.stringify(update), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }

}