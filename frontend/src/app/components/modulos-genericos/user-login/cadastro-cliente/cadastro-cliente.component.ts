import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/modal.service';
import { User } from '../../../../shared/user.model';
import { UsuarioService } from '../../usuarios/usuario.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent implements OnInit {
  user = {} as User;
  deleteModalRef: BsModalRef;
  tipo = 'password';
  cpfMask = [/[0-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,];
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private userService: AuthService,
    private alertService: ModalService
  ) {}

  ngOnInit() {
    this.isLogado();
  }

  isLogado() {
    if (this.userService.isLoggedIn() == true) {
      this.router.navigate(['/auth/userprofile']);
    } else {
      this.router.navigate(['/auth/cadastro-cliente']);
    }
  }

  saveUser(form: NgForm) {
    let msgSuccess = 'Usuário cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar usuário, tente novamente!';

    this.service.saveUser(this.user).subscribe(
      (success) => {
        this.alertService.showAModalSucesso(msgSuccess);
        this.router.navigate(['auth/login']);
        this.cleanForm(form);
      },
      (error) => this.alertService.showModalPerigo(msgError)
    );
  }

  meuCadastro() {
    this.router.navigate(['auth/login']);
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
  }

  muda() {
    if (this.tipo == 'password') {
      this.tipo = 'text';
    } else {
      this.tipo = 'password';
    }
  }
}
