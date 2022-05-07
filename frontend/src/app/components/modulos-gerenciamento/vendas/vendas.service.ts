import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, retry, take, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Endereco } from '../../modulos-genericos/endereco/endereco.motel';
import { AuthService } from '../../modulos-genericos/user-login/auth.service';
import { Categoria } from '../products/categoria.model';
import { ProdCategoria } from '../products/prodCategoria.model';
import { Product } from '../products/product.model';
import { Venda } from './vendas.model';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  compras: Observable<any>;
  compra: Observable<any>;

  public compraSelecionada: Venda = {
    _id: '',
    contato: '',
    listaVenda: null,
    saiu_p_entrega: null,
    payment: '',
    enviado: null,
  };

  private objetoRota: Venda;

  constructor(protected http: HttpClient, private userService: AuthService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getVendasFalse(): Observable<Venda[]> {
    const user_id = this.userService.getUser();

    const url = `${environment.API}/venda-finalizadas/enviado/false/${user_id}`;
    return this.http.get<Venda[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      delay(2000),
      catchError(this.handleError)
    );
  }

  getVendasUser(): Observable<Venda[]> {
    const user_id = this.userService.getUser();

    const url = `${environment.API}/venda-finalizadas/all/vendas/user/finalizadas/${user_id}`;
    return this.http.get<Venda[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      delay(2000),
      catchError(this.handleError)
    );
  }

  getEndId(id): Observable<Endereco> {
    const url = `${environment.API}/endereco/${id}`;
    return this.http.get<Endereco>(url, this.httpOptions).pipe(
      map((obj) => obj),
      catchError(this.handleError)
    );
  }

  getAllVendas(): Observable<Venda[]> {
    const url = `${environment.API}/venda-finalizadas`;
    return this.http.get<Venda[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      delay(2000),
      catchError(this.handleError)
    );
  }

  getVendasAllEntregaTrue(): Observable<Venda[]> {
    const url = `${environment.API}/venda-finalizadas/venda/entrega/true`;
    return this.http.get<Venda[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      delay(2000),
      catchError(this.handleError)
    );
  }

  getVendConfTrue(): Observable<Venda[]> {
    const url = `${environment.API}/venda-finalizadas/enviado/true`;
    return this.http.get<Venda[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      delay(2000),
      catchError(this.handleError)
    );
  }

  getVendaById(id): Observable<Venda[]> {
    const url = `${environment.API}/venda-finalizadas/venda/${id}`;
    return this.http.get<Venda[]>(url, this.httpOptions).pipe(
      map((obj) => obj),
      catchError(this.handleError)
    );
  }

  getProductById(id): Observable<Product> {
    const url = `${environment.API}/products/${id}`;
    return this.http
      .get<Product>(url, this.httpOptions)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  getVenda() {
    return this.objetoRota;
  }

  setVenda(venda: Venda) {
    this.objetoRota = venda;
  }

  saveCompra(cadastro: Venda): Observable<Venda> {
    const user_id = this.userService.getUser();

    const url = `${environment.API}/venda-finalizadas/${user_id}`;
    return this.http.post<Venda>(url, cadastro, this.httpOptions).pipe(
      map((data) => data),
      take(1),
      catchError(this.handleError)
    );
  }

  update(venda: Venda): Observable<Venda> {
    const url = `${environment.API}/venda-finalizadas/${venda._id}`;

    return this.http
      .put<Venda>(url, venda, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  remove(id: Venda) {
    const url = `${environment.API}/venda-finalizadas/${id}`;

    return this.http
      .delete(url, this.httpOptions)
      .pipe(take(1), catchError(this.handleError));
  }

  getProd_categoria(): Observable<ProdCategoria[]> {
    const url = `${environment.API}/prod_categoria`;
    return this.http
      .get<ProdCategoria[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getCategoriaName(nome): Observable<Categoria[]> {
    const url = `${environment.API}/categorias/${nome}`;
    return this.http
      .get<Categoria[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
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
