import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../tokens/token-storage.service';
import { GlobalVariable, Roles } from '../global';
import { IProfile } from '../site/profile/profile.interface';

const AUTH_API = GlobalVariable.AUTH_API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  redirectUrl: string = '/';
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService ) { }
  
  login(username: string, password: string): Observable<any> {

    return this.http.post(AUTH_API + 'tokens/', {
      username,
      password
    }, httpOptions);
  }

  logout(): void {
    this.redirectUrl = '/';
    this.tokenStorage.signOut();
  }

  public isLoggedIn(): boolean {
    if(this.tokenStorage.getToken())
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public getSession(): Promise<boolean> {
    const session = this.tokenStorage.getToken();
    return new Promise((resolve, reject) => {
      if (session) {
        return resolve(true);
      } else {
        return reject(false);
      }
    });
  }

  public getUserRoles(): Promise<string[]> {

    return new Promise((resolve, reject) => {

      let user = this.tokenStorage.getUser() as IProfile;

      if( user ) {
        resolve([user.role.name]);
      }
      else {
        reject();
      }
    });
  }

  public areUserRolesAllowed(userRoles: string[], allowedUserRoles: Roles[]): boolean {
    for (const role of userRoles) {
      for (const allowedRole of allowedUserRoles) {
        if (role.toLowerCase() === allowedRole.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

}
