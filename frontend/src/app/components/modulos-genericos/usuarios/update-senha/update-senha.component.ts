import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { AuthService } from '../../user-login/auth.service';
import { UsuarioService } from '../usuario.service';
import { User } from '../../../../shared/user.model';

@Component({
  selector: 'app-update-senha',
  templateUrl: './update-senha.component.html',
  styleUrls: ['./update-senha.component.css'],
})
export class UpdateSenhaComponent implements OnInit {
  user = {} as User;
  users: any;
  usuario = {} as any;
  email: string;

  deleteModalRef: BsModalRef;
  usuarioSelecionado: User;

  senhaDiverge = false;
  botDis = false;

  model = {
    email: '',
    password: '',
  };

  obj: any = {
    email: '',
    password: '',
    password2: '',
  };

  constructor(
    private service: UsuarioService,
    private userService: AuthService,
    private alertService: ModalService
  ) {}

  ngOnInit() {
    this.email = this.userService.getEmail();
    this.getUsers();
  }

  onSubmit(form: NgForm) {
    this.service.confirmSenhaUser(form.value).subscribe(
      (r: User) => (this.usuario = r),
      (error) => {
        this.alertService.showModalPerigo('Senha não conferi!');
      }
    ),
      (success) => {
        this.alertService.showAModalSucesso('Senha atualizada com sucesso!');
      };
  }

  getUsers() {
    const id = this.userService.getUser();
    this.service.getUserById(id).subscribe((res: User) => {
      this.obj = res;
    });
  }

  ver() {
    if (this.obj.password != this.obj.password2) {
      this.senhaDiverge = true;
      this.botDis = true;
    } else {
      this.senhaDiverge = false;
      this.botDis = false;
    }
  }

  saveUser(form: NgForm) {
    this.service.updateUser(this.obj).subscribe(
      (success) => {
        this.alertService.showAModalSucesso('Usuário atualizado com sucesso!');
        this.cleanForm(form);
      },
      (error) =>
        this.alertService.showModalPerigo(
          'Erro ao atualizar usuário, tente novamente!'
        )
    );
  }

  editUser(user: User) {
    this.obj = { ...user };
  }

  cleanForm(form: NgForm) {
    this.getUsers();
    form.resetForm();
    this.obj = {} as User;
  }

  deleteUser(obj: User) {
    this.usuarioSelecionado = obj;
    const result$ = this.alertService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover esse usuário?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.service.deleteUser(obj) : EMPTY))
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
