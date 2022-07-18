import { Injectable } from '@angular/core';
import { url } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const loginUrl = url + '/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    const payload = { username: username, password: password };
    return this.http.post<any>(loginUrl, payload, { observe: 'response' });
  }
}
