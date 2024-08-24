import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AppConfig } from '../config/config';
import { deleteCookie, getCookie, setCookie } from '../helper/cookie';
import { jwtDecode, JwtPayload } from "jwt-decode"
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    })
    const accessToken = getCookie('access_token');
    const baseUrl = AppConfig.apiUrl;
    const nonAuthUrls = [`${baseUrl}/auth/register`, `${baseUrl}/auth/login`]
    const isNonAuthUrl = nonAuthUrls.some(url => req.url === url);
    if (!isNonAuthUrl) {
      if (!accessToken) {
        this.router.navigate(["/sign-in"])
        return handler.handle(req);
      }
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      })
      const decodeToken: JwtPayload = jwtDecode(accessToken);
      if (typeof decodeToken.exp === 'number' && (decodeToken.exp < new Date().getTime() / 1000)) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              setCookie('access_token', res.data, 365)
              const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${res.data}`)
              })
              this.isRefreshing = false;
              return handler.handle(authReq);
            }),
            catchError((error) => {
              deleteCookie('access_token')
              this.router.navigate(["/sign-in"])
              this.isRefreshing = false;
              return throwError(error)
            })
          )
        }
      }
      else {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        })
        return handler.handle(authReq)
      }
    }
    return handler.handle(req);
  }
};
