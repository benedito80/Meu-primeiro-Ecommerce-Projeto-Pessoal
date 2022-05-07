import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry, tap } from 'rxjs/operators';
import { AuthService } from '../user-login/auth.service';
import { environment } from '../../../../environments/environment';
import { Endereco } from './endereco.motel';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(
    private httpClient: HttpClient,
    private userService: AuthService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  produtos: Observable<any>;
  produto: Observable<any>;
  private objetoRota: Endereco;

  getProduct() {
    return this.objetoRota;
  }

  setProduct(historico: Endereco) {
    this.objetoRota = historico;
  }

  getAll(): Observable<Endereco[]> {
    const url = `${environment.API}/endereco`;
    return this.httpClient
      .get<Endereco[]>(url, this.httpOptions)
      .pipe(delay(2000), tap(console.log));
  }

  getByUser(id): Observable<Endereco[]> {
    const url = `${environment.API}/endereco/${id}`;
    return this.httpClient
      .get<Endereco[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  save(obj: Endereco): Observable<Endereco> {
    const user_id = this.userService.getUser();
    const url = `${environment.API}/endereco/${user_id}`;
    return this.httpClient
      .post<Endereco>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(obj: Endereco): Observable<Endereco> {
    const url = `${environment.API}/endereco/${obj._id}`;
    return this.httpClient
      .put<Endereco>(url, obj, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(obj: Endereco) {
    const url = `${environment.API}/endereco/${obj._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
