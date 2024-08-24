import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = AppConfig.apiUrl + '/categories'

  constructor(
    private http: HttpClient
  ) { }

  getList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getDetailBySlug(slug: string):  Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detailSlug/${slug}`);
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
