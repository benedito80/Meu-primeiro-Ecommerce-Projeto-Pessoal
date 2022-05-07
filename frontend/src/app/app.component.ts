import { AuthService } from './components/modulos-genericos/user-login/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: AuthService, private router: Router) {}
  login_perfil: string = 'Minha conta';
  mostrarAdmin: boolean = false;
  mostrarCliente: boolean = false;
  mostrarGerente: boolean = false;
  mostrarEmpacotador: boolean = false;

  verifica() {
    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'admin'
    ) {
      this.mostrarAdmin = true;
      this.login_perfil = 'Meu Perfil';
    }

    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'gerente'
    ) {
      this.mostrarGerente = true;
      this.login_perfil = 'Meu Perfil';
    }

    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'cliente'
    ) {
      this.mostrarCliente = true;
      this.login_perfil = 'Meu Perfil';
    }

    if (
      this.userService.isLoggedIn() &&
      this.userService.getFuncao() == 'empacotador'
    ) {
      this.mostrarEmpacotador = true;
      this.login_perfil = 'Meu Perfil';
    }
  }

  ngOnInit() {
    this.verifica();
    this.reflesh();
  }

  reflesh() {
    this.userService.mostrarMenuAdminEmitter.subscribe((res) => {
      this.mostrarAdmin = res;
    });

    this.userService.mostrarMenuGerenteEmitter.subscribe((res) => {
      this.mostrarGerente = res;
    });

    this.userService.mostrarMenuClienteEmitter.subscribe((res) => {
      this.mostrarCliente = res;
    });

    this.userService.mostrarMenuEmpacotadorEmitter.subscribe((res) => {
      this.mostrarEmpacotador = res;
    });

    this.userService.login_perfil.subscribe((res) => {
      this.login_perfil = res;
    });
  }

  onLogout() {
    if (this.userService.getFuncao() == 'cliente') {
      this.userService.deleteToken();
      this.userService.mostrarMenuClienteEmitter.emit(false);
      this.userService.setToken('', '', '', '');
      this.userService.login_perfil.emit('Minha conta');
      this.router.navigateByUrl('/cadastros/novo');
    } else {
      this.userService.mostrarMenuAdminEmitter.emit(false);
      this.userService.mostrarMenuGerenteEmitter.emit(false);
      this.userService.mostrarMenuEmpacotadorEmitter.emit(false);
      this.userService.setToken('', '', '', '');
      this.userService.login_perfil.emit('Minha conta');
      this.router.navigateByUrl('/cadastros/novo');
    }
  }
}
