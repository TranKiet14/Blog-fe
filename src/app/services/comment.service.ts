import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = AppConfig.apiUrl + '/comments'

  constructor(
    private http: HttpClient
  ) {}

  create(data: Object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }
}
