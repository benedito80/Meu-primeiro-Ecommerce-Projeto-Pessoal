import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../products/product.model';
import { ProductService } from '../../products/product.service';
import { Venda } from '../vendas.model';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-modal-finalizar-pedido',
  templateUrl: './modal-pedido-cliente.component.html',
  styleUrls: ['./modal-pedido-cliente.component.css'],
})
export class ModalPedidoClienteComponent implements OnInit {
  formulario: FormGroup;
  valorEstoque: number;
  objRota: Product;

  constructor(
    private fb: FormBuilder,
    public service: VendaService,
    public servProduct: ProductService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.objRota = this.servProduct.getProduct();
    this.estoque();

    this.formulario = this.fb.group({
      contato: [null],
      products: [this.objRota._id],
      productname: [this.objRota.productname],
      description: [this.objRota.productDescription],
      productPrice: [this.objRota.productPrice],
      post: [this.objRota.post],
      quantidade: [null],
    });
  }

  estoque() {
    this.servProduct
      .getProdById(this.objRota._id)
      .subscribe((r) => (this.valorEstoque = r.estoque));
  }

  onSubmit() {
    if (
      this.formulario.get('quantidade').value <= this.valorEstoque &&
      this.formulario.get('quantidade').value > 0
    ) {
      this.productRota(this.formulario.value);
      this.router.navigate(['/natura/confirma-produto/cliente']);
    } else {
      alert('Quantidade entre: 1 - ' + this.valorEstoque);
      return;
    }
  }

  productRota(venda: Venda) {
    this.service.setVenda(venda);
  }

  onCancel() {
    this.location.back();
  }
}
