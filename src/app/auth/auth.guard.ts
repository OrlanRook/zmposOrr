import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree, CanActivateChild, CanLoad } from '@angular/router';
import { Roles } from '../global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    @Inject(AuthService) private authService: AuthService, 
    @Inject(Router) private router: Router) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return await this.checkPermission(allowedUserRoles);
  }

  public async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return await this.checkPermission(allowedUserRoles);
  }

  public canLoad(): Promise<boolean> {
    return this.checkPermission(undefined);
  }

  private getRoutePermissions(route: ActivatedRouteSnapshot): Roles[] | undefined {
    if (route.data && route.data['userRoles']) {
      return route.data['userRoles'] as Roles[];
    }
    return undefined;
  }

  private checkPermission(allowedUserRoles: Roles[] | undefined): Promise<boolean> {
    return this.authService.getSession().then(
      (session: boolean) => {
        if (session) {
          if (!allowedUserRoles) {
            return true;   // if no user roles has been set, all user are allowed to access the route
          } else {
            return this.authService.getUserRoles().then(
              (userRoles: string[]) => {
                if (this.authService.areUserRolesAllowed(userRoles, allowedUserRoles)) {
                  return true;
                } else {
                  this.router.navigateByUrl('error/error-403');
                  return false;
                }
              },
              () => {
                this.router.navigateByUrl('error/error-403');
                return false;
              }
            );
          }
        } else { return false; }
      },
      () => {
        this.router.navigateByUrl('auth/login');
        return false;
      }
    );
  }

}
