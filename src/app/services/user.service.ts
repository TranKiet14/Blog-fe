import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = AppConfig.apiUrl + '/users'

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  edit(id: number, data: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/edit/${id}`, data);
  }

  create(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }
}
