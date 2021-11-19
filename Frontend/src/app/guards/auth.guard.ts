import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Rol } from '../core/models/rol.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile(v => v.isAuthenticated === null),
      take(1),
      map(({isAuthenticated, usuario})=> {
        if (!isAuthenticated) {
          return true;
        }
        if (usuario.confUser === Rol.ADMINISTRADOR) {
            this.router.navigateByUrl('/administrador/anuncios')
        } else if (usuario.confUser === Rol.ESTUDIANTE) {
          this.router.navigateByUrl('/estudiante/anuncios')
        }
        return false;
      }),
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.signedin$.pipe(
        skipWhile(v => v.isAuthenticated === null),
        take(1),
        map(({isAuthenticated, usuario})=> {
          if (isAuthenticated && usuario.confUser === route.data.rol) {
            return true;
          }
          if (usuario.confUser === Rol.ADMINISTRADOR) {
            this.router.navigateByUrl('/administrador/anuncios')
        } else if (usuario.confUser === Rol.ESTUDIANTE) {
          this.router.navigateByUrl('/estudiante/anuncios')
        }
          return false;
        }),
      );
  }
}
