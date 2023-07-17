import { throwError } from "rxjs";

export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://127.0.0.1:8000/v1/',
    AUTH_API_URL: 'http://127.0.0.1:8000/auth/',
    MEDIA_URL:    'http://127.0.0.1:8000/media/'
    // BASE_API_URL: 'https://www.zm.raxor.app/v1/',
    // AUTH_API_URL: 'https://www.zm.raxor.app/auth/',
    // MEDIA_URL:    'https://www.zm.raxor.app/media/'
});

export function errorHandler(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = error.status + '&nbsp;' + error.error;
    // for( let key in error.error ) {
    //   errorMessage += '</br>';
    //   errorMessage += '<b>' + key + '</b>&nbsp;&nbsp;';
    //   errorMessage += error.error[key];
    // }
  }
  console.error(error);
  return throwError(() => { return errorMessage; });
}

export enum Roles {
  ADMIN       = 'ADMIN',
  MANGER      = 'GERENTE',
  TECHNICIAN  = 'TÉCNICO',
  CASHIER     = 'CAJERO'
}