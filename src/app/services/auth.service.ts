import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token')
  }

  isAuth() {
    return !!this.token
  }

  public auth(user: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.authUrl}${environment.webApiKey}`, user);
  }
}