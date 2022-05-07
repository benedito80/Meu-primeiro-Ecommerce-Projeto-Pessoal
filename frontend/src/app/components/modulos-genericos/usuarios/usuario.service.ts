import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = `${environment.API}/users`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserById(id): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  confirmSenhaUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(
        `${this.url}/authenticate`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient
      .put<User>(
        `${this.url}/${user._id}`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteUser(user: User) {
    return this.httpClient
      .delete(`${this.url}/${user._id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
