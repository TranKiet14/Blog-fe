import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = AppConfig.apiUrl + '/roles'

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  permission(data: Object): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/permission`, data)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  edit(id: number, data: Object): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/edit/${id}`, data);
  }

  create(data: Object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }
}
