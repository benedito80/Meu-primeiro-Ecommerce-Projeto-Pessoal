import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmaResultado: Subject<boolean>;

  constructor(public modalReferencia: BsModalRef) {}

  ngOnInit() {
    this.confirmaResultado = new Subject();
  }

  onConfirm() {
    this.confirmaEfecha(true);
  }

  onClose() {
    this.confirmaEfecha(false);
  }

  private confirmaEfecha(valor: boolean) {
    this.confirmaResultado.next(valor);
    this.modalReferencia.hide();
  }
}
