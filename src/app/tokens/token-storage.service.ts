import { Injectable } from '@angular/core';
import { Roles } from '../global';
import { IProfile } from '../site/profile/profile.interface';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public getToken(): string | null {
    let data = window.localStorage.getItem(TOKEN_KEY);
    if( data == null ) {
      data = window.sessionStorage.getItem(TOKEN_KEY);
    }
    return data;
  }

  public saveToken(persistent: boolean, token: string): void {
    if( persistent ) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
    }
    else {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public saveUser(persistent: boolean, user: any): void {
    if( persistent ) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    else {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    let user = window.localStorage.getItem(USER_KEY);

    if( user == null ) {
      user = window.sessionStorage.getItem(USER_KEY);
    }
    
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public setConfig(attribute:string, value:string): void {
    let data = window.localStorage.getItem(TOKEN_KEY);
    if( data ) {
      window.localStorage.removeItem(attribute);
      window.localStorage.setItem(attribute, value);
    }
    else {
      window.sessionStorage.removeItem(attribute);
      window.sessionStorage.setItem(attribute, value);
    }
  }

  public getConfig(attribute:string): string | null {
    let config = window.localStorage.getItem(attribute);

    if(config == null) {
      config = window.sessionStorage.getItem(attribute);
    }
    return config;
  }

  public isPersistent(): boolean {
    let user = window.localStorage.getItem(USER_KEY);

    if( user ) {
      return true;
    }
    else {
      return false;
    }
  }

  public checkAdminAccess() {
    const user = this.getUser() as IProfile;
    if( ![String(Roles.ADMIN.toLowerCase()), String(Roles.MANGER.toLowerCase())].includes(user.role.name.toLowerCase())) {
      return true;
    }
    else {
      return false;
    }
  }
}
