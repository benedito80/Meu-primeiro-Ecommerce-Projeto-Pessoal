import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { UsuarioService } from '../../modulos-genericos/usuarios/usuario.service';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css'],
})
export class GerenciarUsuariosComponent implements OnInit {
  user = {} as User;
  users: User[];
  deleteModalRef: BsModalRef;
  usuarioSelecionado: User;

  p: Number = 1;
  count: Number = 25;

  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  cpfMask = [/[0-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/, /\d/ ];

  constructor(
    private service: UsuarioService,
    private alertService: ModalService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  saveUser(form: NgForm) {
    let msgSuccess = 'Usuário cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar usuário, tente novamente!';

    if (this.user._id !== undefined) {
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuário, tente novamente!';

      this.service.updateUser(this.user).subscribe(
        (success) => {
          this.alertService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
        },
        (error) => this.alertService.showModalPerigo(msgError)
      );
    } else {
      this.service.saveUser(this.user).subscribe(
        (success) => {
          this.alertService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
        },
        (error) => this.alertService.showModalPerigo(msgError)
      );
    }
  }

  editUser(user: User) {
    this.user = { ...user };
  }

  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
    this.user = {} as User;
  }

  deleteUser(usuario: User) {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover esse usuário?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.service.deleteUser(usuario) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.getUsers();
        },
        (error) => {
          this.alertService.showModalPerigo(
            'Erro ao remover curso. Tente novamente mais tarde.'
          );
        }
      );
  }

  onConfirmDelete() {
    this.service.deleteUser(this.usuarioSelecionado).subscribe(
      (success) => {
        this.getUsers();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showModalPerigo(
          'Erro ao remover curso. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
