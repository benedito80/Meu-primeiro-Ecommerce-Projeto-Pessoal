import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ModalService } from '../../../../shared/modal.service';
import { VendaService } from '../vendas.service';
import { ProductService } from '../../products/product.service';
import { AuthService } from 'src/app/components/modulos-genericos/user-login/auth.service';

@Component({
  selector: 'app-envio-ecommerce',
  templateUrl: './modal-envio-ecommerce.component.html',
  styleUrls: ['./modal-envio-ecommerce.component.css'],
})
export class ModalEnvioEcommerce implements OnInit {
  formulario: FormGroup;
  vendaRota: any;
  products: any;
  quantidade: any;
  estoqueDb: any;
  precoVenda: any;
  total: any;
  caixa: number = 0;
  idCarrinho: any;
  id: string;
  contatoMask = ['(',/[1-9]/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];

  constructor(
    private service: VendaService,
    private serviceProduct: ProductService,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.vendaRota = this.service.getVenda();
    this.products = this.vendaRota.map((r) => r.products);
    this.precoVenda = this.vendaRota.map((r) => r.precoVenda);
    this.estoqueDb = this.vendaRota.map((r) => r.estoque);
    this.quantidade = this.vendaRota.map((r) => r.quantidade);
    this.id = this.vendaRota.map((r) => r.products);
    this.idCarrinho = this.vendaRota.map((r) => r.idCarrinho);
    this.total = this.vendaRota.map((r) => r.total);
    this.caixa = this.vendaRota.map((r) => r.caixa).reduce((valor) => valor);

    this.inserir();

    this.formulario = this.fb.group({
      contato: [null, Validators.required],
      status: 'preparando para envio',
      listaVenda: [this.inserir()],
      enderecoEntrega: [null, Validators.required],
      caixa: [this.caixa],
      payment: [null, Validators.required],
      enviado: [true],
    });
  }

  inserir() {
    let listaVenda = [];
    for (let i = 0; i < this.vendaRota.length; i++) {
      listaVenda.push({
        products: this.products[i],
        precoVenda: this.precoVenda[i],
        quantidade: this.quantidade[i],
        total: this.precoVenda[i] * this.quantidade[i],
      });
    }
    return listaVenda;
  }

  updateEstoque() {
    let produto: any;

    for (let i = 0; i < this.estoqueDb.length; i++) {
      produto = {
        _id: this.id[i],
        estoque: this.estoqueDb[i],
      };

      this.serviceProduct.updateProduct(produto).subscribe();
    }
  }

  deleteCarrinho() {
    for (let i = 0; i < this.idCarrinho.length; i++) {
      this.service.remove(this.idCarrinho[i]).subscribe();
    }
  }

  onSubmit() {
    this.service.saveCompra(this.formulario.value).subscribe(
      (success) => {
        this.updateEstoque();
        this.deleteCarrinho();
        this.modalService.showAModalSucesso('Compra efetuada com sucesso!');
        delay(6000);
        this.router.navigate(['/natura/meus-pedidos']);
      },
      (error) => {
        this.modalService.showModalPerigo(
          'Erro ao efetuar compra, tente mais tarde!'
        ),
          this.location.back();
      }
    );
  }

  hasError(field: string) {
    return this.formulario.get(field).errors;
  }

  onCancel() {
    this.router.navigate(['/natura/produtos']);
  }
}
