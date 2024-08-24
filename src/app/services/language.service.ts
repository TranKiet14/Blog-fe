import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private apiUrl = AppConfig.apiUrl + '/languages'

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  edit(id: number, data: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/edit/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  create(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

}
