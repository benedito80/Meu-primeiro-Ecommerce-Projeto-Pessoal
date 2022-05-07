import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, retry, take, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Endereco } from '../modulos-genericos/endereco/endereco.motel';
import { AuthService } from '../modulos-genericos/user-login/auth.service';
import { Admin } from './administrador';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  compras: Observable<any>;
  compra: Observable<any>;
  public compraSelecionada: Admin = {
    _id: '',
    contato: '',
    listaVenda: null,
    saiu_p_entrega: null,
    payment: '',
    enviado: null,
  };

  private objetoRota: Admin;

  constructor(protected http: HttpClient, private userService: AuthService) {}

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  getVendasDescartadas(): Observable<Admin[]> {
    const url = `${environment.API}/venda-finalizadas/vendas/enviadas/entregues/invalidas`;
    return this.http.get<Admin[]>(url).pipe(
      map((obj) => obj),
      delay(2000)
    );
  }

  getVendaById(id): Observable<Admin[]> {
    const url = `${environment.API}/venda-finalizadas/venda/${id}`;
    return this.http.get<Admin[]>(url).pipe(map((obj) => obj));
  }

  getVenda() {
    return this.objetoRota;
  }

  setVenda(venda: Admin) {
    this.objetoRota = venda;
  }

  saveCompra(cadastro: Admin): Observable<Admin> {
    const user_id = this.userService.getUser();

    const url = `${environment.API}/venda-finalizadas/${user_id}`;
    return this.http.post<Admin>(url, cadastro, this.noAuthHeader).pipe(
      map((data) => data),
      take(1),
      catchError(this.handleError)
    );
  }

  update(venda: any): Observable<any> {
    const url = `${environment.API}/venda-finalizadas/${venda._id}`;

    return this.http
      .put<any>(url, venda, this.noAuthHeader)
      .pipe(retry(1), catchError(this.handleError));
  }

  getEndId(id): Observable<Endereco> {
    const url = `${environment.API}/endereco/${id}`;
    return this.http.get<Endereco>(url).pipe(map((obj) => obj));
  }

  remove(id: any) {
    const url = `${environment.API}/venda-finalizadas/${id}`;

    return this.http
      .delete(url, this.noAuthHeader)
      .pipe(take(1), catchError(this.handleError));
  }

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
