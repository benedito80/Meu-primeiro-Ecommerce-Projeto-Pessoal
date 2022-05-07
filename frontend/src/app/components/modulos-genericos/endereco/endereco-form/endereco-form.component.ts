import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { AuthService } from '../../user-login/auth.service';
import { Endereco } from '../endereco.motel';
import { EnderecoService } from '../endereco.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css'],
})
export class EnderecoFormComponent implements OnInit {
  end = {} as Endereco;
  ends: Endereco[];
  p: Number = 1;
  count: Number = 25;
  productSelecionado: Endereco;
  deletaModalRef: BsModalRef;
  img = '';
  imgDiv = true;
  buttonImg = false;
  protegeEdicao = true;
  public id = '';
  caixa: number = 0;
  tarifa: number = 0;

  cpfMask = [/[1-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  cepMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private service: EnderecoService,
    private userService: AuthService,
    private http: HttpClient,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const id = this.userService.getUser();
    this.service.getByUser(id).subscribe((res: Endereco[]) => {
      this.ends = res;
    });
  }

  tarifaTotal() {
    return this.tarifa;
  }

  caixaTotal() {
    return this.caixa;
  }
  saveEnd(form: NgForm) {
    let msgSuccess = 'Endereço cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar endereço, tente novamente!';

    if (this.end._id !== undefined) {
      msgSuccess = 'Endereço atualizado com sucesso!';
      msgError = 'Erro ao atualizar endereço, tente novamente!';

      this.service.update(this.end).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.router.navigate(['/endereco']);
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    } else {
      this.service.save(this.end).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.getProducts();
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    }
  }

  existDados() {
    let info = false;
    if (this.ends == null || this.ends == undefined || this.ends.length <= 0) {
      return !info;
    }
  }

  editEnd(end: Endereco) {
    this.protegeEdicao = false;
    this.end = { ...end };
  }

  cleanForm(form: NgForm) {
    this.protegeEdicao = true;
    localStorage.removeItem('id');
    localStorage.removeItem('img');
    this.img = '';

    form.resetForm();
    this.getProducts();
    this.end = {} as Endereco;
  }

  deleteEnd(usuario: Endereco) {
    this.productSelecionado = usuario;
    const result$ = this.modalService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover esse endereço?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.service.delete(usuario) : EMPTY))
      )
      .subscribe(
        (success) => {
          this.getProducts();
        },
        (error) => {
          this.modalService.showModalPerigo(
            'Erro ao remover produto. Tente novamente mais tarde.'
          );
        }
      );
  }

  onConfirmDelete() {
    this.service.delete(this.productSelecionado).subscribe(
      (success) => {
        this.getProducts();
        this.deletaModalRef.hide();
      },
      (error) => {
        this.modalService.showModalPerigo(
          'Erro ao remover produto. Tente novamente mais tarde.'
        );
        this.deletaModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deletaModalRef.hide();
  }
}
