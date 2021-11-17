import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const ROOT_URL = 'http://localhost:3000/api/v1/auth';

interface Credentials {
  usuario: string;
  password: string;
}

interface SigninResponse {
  message: string;
  usuario: any;
}

interface CheckAuthResponse {
  authenticated: boolean;
  usuario: any;
}

interface AuthData {
  isAuthenticated: boolean,
  usuario: any,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  signedin$ = new BehaviorSubject<AuthData>(null);

  constructor(private http: HttpClient) { }

  signin(credentials: Credentials) {
    return this.http.post<SigninResponse>(ROOT_URL + '/signin', credentials)
    .pipe(
      tap(({usuario}) => {
        this.signedin$.next({isAuthenticated: true, usuario: usuario});
      })
    );
  }

  signout() {
    return this.http.get(ROOT_URL + '/logout')
    .pipe(
      tap(() => {
        this.signedin$.next({isAuthenticated: false, usuario: null});
      })
    );
  }

  checkAuth() {
    return this.http.get<CheckAuthResponse>(ROOT_URL + '/check').pipe(
      tap(({authenticated, usuario}) => {
        this.signedin$.next({isAuthenticated: authenticated, usuario: usuario});
      })
    );
  }
}
