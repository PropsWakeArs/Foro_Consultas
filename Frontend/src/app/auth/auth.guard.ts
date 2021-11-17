import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      map(({ isAuthenticated, usuario }) => {
        if (isAuthenticated &&
          usuario) {
          return true;
        }
        this.router.navigateByUrl('/');
        return false;
      }),
    );
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.authService.signedin$.pipe(
  //     skipWhile(value => value === null),
  //     take(1),
  //     map(({ isAuthenticated, usuario }) => {
  //       if (!isAuthenticated) {
  //         return true;
  //       }
  //       console.log(usuario.confUser === 0)
  //       if (employee.profile === Profiles.EMPLOYEE) {
  //         this.router.navigateByUrl('/employees');
  //       } else if (employee.profile === Profiles.MANAGER) {
  //         this.router.navigateByUrl('/manager');
  //       } else if (employee.profile === Profiles.FINANCES) {
  //         this.router.navigateByUrl('/finances');
  //       }
  //       return false;
  //     }),
  //   );
  // }
}
