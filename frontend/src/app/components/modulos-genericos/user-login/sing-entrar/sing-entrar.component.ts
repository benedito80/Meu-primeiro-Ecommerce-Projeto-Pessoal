import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-entrar',
  templateUrl: './sing-entrar.component.html',
  styleUrls: ['./sing-entrar.component.css'],
})
export class SingEntrarComponent implements OnInit {
  serverErrorMessages: string;
  model = {
    email: '',
    password: '',
  };

  constructor(private userService: AuthService, private router: Router) {}

  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/userprofile');
    }
  }

  cadCliente() {
    this.router.navigateByUrl('/auth/cadastro-cliente');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res) => {
        this.userService.setToken(
          res['token'],
          res['user'],
          res['funcao'],
          res['email']
        );
        this.router.navigateByUrl('/auth/userprofile');

        if (this.userService.funcao == 'admin') {
          this.userService.mostrarMenuAdminEmitter.emit(true);
        }

        if (this.userService.funcao == 'gerente') {
          this.userService.mostrarMenuGerenteEmitter.emit(true);
        }

        if (localStorage.getItem('funcao') == 'cliente') {
          this.userService.mostrarMenuClienteEmitter.emit(true);
        }

        if (this.userService.funcao == 'empacotador') {
          this.userService.mostrarMenuEmpacotadorEmitter.emit(true);
        }

        this.userService.login_perfil.emit('Meu Perfil');
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  limpar(form: NgForm) {
    form.reset();
  }
}
