import { Injectable } from '@angular/core';
import {url} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user";

const loginUrl = url + "/login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http:HttpClient) {}

  loginUser(username:string, password:string):Observable<User>{
    const payload = {username:username, password:password}
    return this.http.post<User>(loginUrl,payload, this.httpOptions)
  }
}
