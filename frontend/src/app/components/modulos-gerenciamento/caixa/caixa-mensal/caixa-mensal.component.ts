import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { Caixa } from '../caixa.model';
import { HistoricoService } from '../caixa.service';

@Component({
  selector: 'app-caixa-mensal',
  templateUrl: './caixa-mensal.component.html',
  styleUrls: ['./caixa-mensal.component.css'],
})
export class CaixaMensalComponent implements OnInit {
  cx = {} as Caixa;
  cxs: Caixa[];
  p: Number = 1;
  count: Number = 15;
  productSelecionado: Caixa;
  deletaModalRef: BsModalRef;
  img = '';
  protegeEdicao = true;
  caixa: number = 0;
  tarifa: number = 0;

  constructor(
    private service: HistoricoService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.service.getEcommerce().subscribe((res: Caixa[]) => {
      this.cxs = res;
      this.caixa = res
        .map((r) => r.caixa)
        .reduce((acc, valor) => acc + valor, 0);
      this.tarifa = res
        .map((r) => r.tarifa)
        .reduce((acc, valor) => acc + valor, 0);
    });
  }

  tarifaTotal() {
    return this.tarifa;
  }

  caixaTotal() {
    return this.caixa;
  }

  existDados() {
    let info = false;
    if (this.cxs == null || this.cxs == undefined || this.cxs.length <= 0) {
      return !info;
    }
  }

  editCaixa(cx: Caixa) {
    this.protegeEdicao = false;
    this.cx = { ...cx };
  }

  cleanForm(form: NgForm) {
    this.protegeEdicao = true;
    localStorage.removeItem('id');
    localStorage.removeItem('img');
    this.img = '';

    form.resetForm();
    this.getProducts();
    this.cx = {} as Caixa;
  }

  deleteCaixa(cx: Caixa) {
    this.productSelecionado = cx;
    const result$ = this.modalService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover esse produto ?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.service.delete(cx) : EMPTY
        )
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
