import { Injectable } from '@angular/core';
import {url} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../../models/user";

const friendUrl = url + '/friends';


@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  findFriendsById(id:number): Observable<User[]> {
    return this.http
      .get<User[]>(`${friendUrl}?currentUserId=${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addFriendByCurrentUserIdAndFriendId(currentUserId: number, friendId: number): Observable<String> {
    console.log(`${friendUrl}/add?currentUserId=${currentUserId}&friendId=${friendId}`)
    return this.http
      .get<String>(`${friendUrl}/add?currentUserId=${currentUserId}&friendId=${friendId}`,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.log(httpError);
    } else {
      console.error(`Backend returned code ${httpError.status}
      body was: ${httpError.error}`);
    }
    return throwError(() => new Error('something really bad happened'));
  }
}
