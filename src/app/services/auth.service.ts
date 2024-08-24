import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppConfig } from "../config/config";
import { getCookie } from "../helper/cookie";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate, CanActivateChild {

    private apiUrl = AppConfig.apiUrl + '/auth'

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    canActivate(): boolean {
        const accessToken = getCookie('access_token')
        if (accessToken) {
            return true
        } else {
            this.router.navigate(["sign-in"])
        }
        return false
    }

    canActivateChild(route: ActivatedRouteSnapshot): boolean {
        const userData = localStorage.getItem('user');
        let user;
        if (userData !== null) {
            user = JSON.parse(userData);
        }
        const permission_id = route.data['permission_id'];
        if (user.permissions.includes(permission_id)) {
            return true
        } else {
            this.router.navigate(["sign-in"])
        }
        return false
    }

    login(data: Object): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, data)
    }

    refreshToken(): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/refreshToken`, {})
    }

    logout(): Observable<any> {
        this.router.navigate(["sign-in"])
        return this.http.get<any>(`${this.apiUrl}/logout`)
    }

}