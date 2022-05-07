import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/modal.service';
import { Caixa } from '../caixa.model';
import { HistoricoService } from '../caixa.service';

@Component({
  selector: 'app-caixa-diario.',
  templateUrl: './caixa-diario..component.html',
  styleUrls: ['./caixa-diario..component.css'],
})
export class CaixaDiarioComponent implements OnInit {
  cx = {} as Caixa;
  cxs: Caixa[];

  p: Number = 1;
  count: Number = 25;
  deletaModalRef: BsModalRef;
  total: number = 0;

  constructor(
    private histService: HistoricoService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.histService.getAll().subscribe((res: Caixa[]) => {
      this.cxs = res;
    });
  }

  tarifaTotal() {
    return (this.total * 2.5) / 100;
  }

  editCaixa(cx: Caixa) {
    this.total = cx.caixa;
    this.cx = { ...cx };
  }

  add(cx) {
    this.total = this.cx.caixa + cx;
  }

  diminui(cx) {
    this.total = this.cx.caixa - cx;
  }

  fLimpa() {
    this.cx.adicional = 0;
    this.cx.desconto = 0;
    this.total = this.cx.caixa;
  }

  saveCaixa(form: NgForm) {
    let msgSuccess = 'Caixa contabilizado com sucesso!';
    let msgError = 'Erro ao fechar caixa, tente novamente!';

    if (this.cx._id !== undefined) {
      msgSuccess = 'Caixa atualizado com sucesso!';
      msgError = 'Erro ao atualizar caixa, tente novamente!';

      this.cx.fechouMes = true;
      this.cx.tarifa = this.tarifaTotal();
      this.cx.caixa = this.total;

      this.histService.update(this.cx).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.total = 0;
          this.getProducts();
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    }
  }

  existDados() {
    let info = false;
    if (this.cxs == null || this.cxs == undefined || this.cxs.length <= 0) {
      return !info;
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.cx = {} as Caixa;
  }

  onDeclineDelete() {
    this.deletaModalRef.hide();
  }
}
