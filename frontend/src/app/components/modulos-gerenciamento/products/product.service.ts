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
import { Categoria } from './categoria.model';
import { ProdCategoria } from './prodCategoria.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private userService: AuthService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private objetoRota: Product;

  getProducts(): Observable<Product[]> {
    const url = `${environment.API}/products`;
    return this.httpClient
      .get<Product[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getPor_Categoria(categoria): Observable<Product[]> {
    const url = `${environment.API}/products/categoria/${categoria}`;
    return this.httpClient
      .get<Product[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getPor_prod_categoria(nome): Observable<Product[]> {
    const url = `${environment.API}/products/get/product/${nome}`;
    return this.httpClient
      .get<Product[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getProductsDesativado(): Observable<Product[]> {
    const url = `${environment.API}/products/desativado`;
    return this.httpClient
      .get<Product[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getProdById(id): Observable<Product> {
    const url = `${environment.API}/products/${id}`;
    return this.httpClient
      .get<Product>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveProduct(prod: Product): Observable<Product> {
    const user_id = this.userService.getUser();
    const url = `${environment.API}/products/${user_id}`;
    return this.httpClient
      .post<Product>(url, JSON.stringify(prod), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  savePost(post: File): Observable<File> {
    const url = `${environment.API}/posts}`;
    return this.httpClient
      .post<File>(url, JSON.stringify(post), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProduct(prod: Product): Observable<Product> {
    const url = `${environment.API}/products/${prod._id}`;
    return this.httpClient
      .put<Product>(url, prod, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteProduct(prod: Product) {
    const url = `${environment.API}/products/user/${prod._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProduct() {
    return this.objetoRota;
  }

  setProduct(product: Product) {
    this.objetoRota = product;
  }

  save_Categoria(prod: Categoria): Observable<Categoria> {
    const url = `${environment.API}/categorias`;
    return this.httpClient
      .post<Categoria>(url, JSON.stringify(prod), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCategoria(prod: Categoria): Observable<Categoria> {
    const url = `${environment.API}/categorias/${prod._id}`;
    return this.httpClient
      .put<Categoria>(url, prod, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllCategoria(): Observable<Categoria[]> {
    const url = `${environment.API}/categorias`;
    return this.httpClient
      .get<Categoria[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  getCategoriaName(nome): Observable<Categoria[]> {
    const url = `${environment.API}/categorias/${nome}`;
    return this.httpClient
      .get<Categoria[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCategoria(prod: Categoria) {
    const url = `${environment.API}/categorias/${prod._id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  saveProd_categoria(prod: ProdCategoria): Observable<ProdCategoria> {
    const url = `${environment.API}/prod_categoria`;
    return this.httpClient
      .post<ProdCategoria>(url, JSON.stringify(prod), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProd_categoria(prod: ProdCategoria): Observable<ProdCategoria> {
    const url = `${environment.API}/prod_categoria/${prod._id}`;
    return this.httpClient
      .put<ProdCategoria>(url, prod, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProd_categoria(): Observable<ProdCategoria[]> {
    const url = `${environment.API}/prod_categoria`;
    return this.httpClient
      .get<ProdCategoria[]>(url, this.httpOptions)
      .pipe(delay(2000));
  }

  deleteProd_categoria(prod: ProdCategoria) {
    const url = `${environment.API}/prod_categoria/${prod._id}`;
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
