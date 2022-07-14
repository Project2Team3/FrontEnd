import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { url } from '../../../environments/environment';
import { User } from '../../models/user';

// Purpose: make HTTPRequests to our server
// Injectable allows us to use a singleton instance of this class within other components

const userUrl = url + '/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  findAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(userUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  findUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${userUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(
        `${userUrl}/add`,
        {
          username: user.username,
          password: user.password,
          country: user.country,
          points: user.points,
          email: user.email,
        },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .post<User>(
        `${userUrl}/add`,
        {
          id: user.id,
          username: user.username,
          password: user.password,
          country: user.country,
          points: user.points,
          email: user.email,
        },
        this.httpOptions
      )
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
