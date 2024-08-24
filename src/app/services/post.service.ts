import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = AppConfig.apiUrl + '/posts'

  constructor(
    private http: HttpClient
  ) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getDetailById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDetail(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${slug}`);
  }

  create(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

  edit(id: number, data: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/edit/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
