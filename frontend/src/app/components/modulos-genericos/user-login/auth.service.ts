import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Endereco } from '../endereco/endereco.motel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  token: string;
  user: string;
  funcao: string;
  email: string;

  mostrarMenuAdminEmitter = new EventEmitter<boolean>();
  mostrarMenuGerenteEmitter = new EventEmitter<boolean>();
  mostrarMenuClienteEmitter = new EventEmitter<boolean>();
  mostrarMenuEmpacotadorEmitter = new EventEmitter<boolean>();
  login_perfil = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  login(authCredentials) {
    return this.http.post(
      environment.API + '/users/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  verificaEnd(id): Observable<Endereco[]> {
    const url = `${environment.API}/endereco/${id}`;
    return this.http.get<Endereco[]>(url).pipe(map((obj) => obj));
  }

  getUserProfile() {
    return this.http.get(environment.API + '/users/user/id');
  }

  setToken(token: string, user: string, funcao: string, email: string) {
    this.token = token;
    this.user = user;
    if (funcao == 'cliente') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      localStorage.setItem('funcao', funcao);
    } else {
      this.funcao = funcao;
    }
    this.email = email;
  }

  getToken() {
    if (localStorage.getItem('funcao') == 'cliente') {
      return localStorage.getItem('token');
    } else {
      return this.token;
    }
  }

  getUser() {
    if (localStorage.getItem('funcao') == 'cliente') {
      return localStorage.getItem('user');
    } else {
      return this.user;
    }
  }

  getFuncao() {
    if (localStorage.getItem('funcao') == 'cliente') {
      return localStorage.getItem('funcao');
    } else {
      return this.funcao;
    }
  }

  getEmail() {
    return this.email;
  }

  private getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('funcao');
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else {
      return false;
    }
  }
}
