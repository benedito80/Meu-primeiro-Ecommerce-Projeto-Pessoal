import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../../../shared/modal.service';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-modal-confirma-produto',
  templateUrl: './modal-confirma-produto.component.html',
  styleUrls: ['./modal-confirma-produto.component.css'],
})
export class ModalConfirmaProdutoComponent implements OnInit {
  formulario: FormGroup;
  rota: any;

  constructor(
    private fb: FormBuilder,
    public service: VendaService,
    private location: Location,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rota = this.service.getVenda();

    this.formulario = this.fb.group({
      listaVenda: this.fb.group({
        products: [this.rota.products],
        quantidade: [this.rota.quantidade],
        total: [(this.rota.quantidade * this.rota.productPrice).toFixed(2)],
      }),
    });
  }

  onSubmit() {
    this.service.saveCompra(this.formulario.value).subscribe(
      (success) => {
        this.modalService.showAModalSucesso(
          'Item adicionado ao carrinho com sucesso!'
        );
        this.router.navigate(['/natura/produtos']);
      },
      (error) => {
        this.modalService.showModalPerigo(
          'Erro ao salvar sua compra, tente mais tarde!'
        ),
          this.location.back();
      }
    );
  }

  onCancel() {
    this.router.navigate(['/natura/produtos']);
  }

  editar() {
    this.location.back();
  }
}
