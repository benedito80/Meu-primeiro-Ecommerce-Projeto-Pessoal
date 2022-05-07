import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../modulos-genericos/user-login/auth.service';
import { Caixa } from './caixa.model';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  constructor(
    private httpClient: HttpClient,
    private userService: AuthService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  produtos: Observable<any>;
  produto: Observable<any>;
  private objetoRota: Caixa;

  getProduct() {
    return this.objetoRota;
  }

  setProduct(historico: Caixa) {
    this.objetoRota = historico;
  }

  getAll(): Observable<Caixa[]> {
    const url = `${environment.API}/historicos`;
    return this.httpClient.get<Caixa[]>(url, this.httpOptions).pipe(
      delay(2000)
    );
  }

  getEcommerce(): Observable<Caixa[]> {
    const url = `${environment.API}/historicos/true`;
    return this.httpClient
      .get<Caixa[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getById(id): Observable<Caixa> {
    const url = `${environment.API}/historicos/${id}`;
    return this.httpClient
      .get<Caixa>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  save(obj: Caixa): Observable<Caixa> {
    const user_id = this.userService.getUser();
    const url = `${environment.API}/historicos/${user_id}`;
    return this.httpClient
      .post<Caixa>(url, JSON.stringify(obj), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(obj: Caixa): Observable<Caixa> {
    const url = `${environment.API}/historicos/${obj._id}`;
    return this.httpClient
      .put<Caixa>(url, obj, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(obj: Caixa) {
    const url = `${environment.API}/historicos/${obj._id}`;
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
