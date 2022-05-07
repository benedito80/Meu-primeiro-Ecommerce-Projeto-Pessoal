import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { delay, switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { Venda } from '../vendas.model';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-carrinho-compras.',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css'],
})
export class CarrinhoComprasComponent implements OnInit {
  deleteModalRef: BsModalRef;

  cadastro$: Venda[];
  car = {} as Venda;

  p: Number = 1;
  count: Number = 25;

  cursoSelecionado: Venda;
  produto: any;
  quantidade: any;
  estoqueDb: any;
  total: any;
  idCarrinho: any;
  dia: any;
  info: any;
  preco: any;
  tam: any;
  milissegundos: number = 0;
  mostrar = false;

  constructor(
    private service: VendaService,
    private alertService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.service.getVendasFalse().subscribe((res: any[]) => {
      this.cadastro$ = res;
      this.idCarrinho = res.map((r) => r._id);

      this.info = res.map((r) =>
        r.listaVenda.map((r) => r).reduce((acc, valor) => acc + valor)
      );

      this.produto = this.info.map((r) => r.products._id);
      this.quantidade = this.info.map((r) => r.quantidade);
      this.estoqueDb = res.map((r) =>
        r.listaVenda
          .map((r) => r)
          .map((r) => r.products.estoque)
          .reduce((acc, valor) => acc + valor)
      );
      this.total = this.info.map((r) => r.total);

      this.preco = this.info.map((r) => r.products.productPrice);
      this.tam = this.idCarrinho.length;
      this.dia = res.map((r) => r.data);
      this.milissegundos = Date.now() - Date.parse(this.dia[0]);

      this.deletaCarrinho();
    });
  }

  deletaCarrinho() {
    if (this.milissegundos > 43200000) {
      for (let i = 0; i < this.tam; i++) {
        this.service.remove(this.idCarrinho[i]).subscribe((success) => {
          this.onRefresh();
        });
      }
    }
  }

  editCar(car: Venda) {
    this.car = { ...car };
  }

  saveCar(form: NgForm) {
    this.service.update(this.car).subscribe(
      (success) => {
        this.alertService.showAModalSucesso('Produto editado com sucesso!');
        delay(3000);
        this.onRefresh();
      },
      (error) => {
        this.alertService.showModalPerigo('Erro na edição do produto!');
        this.onRefresh();
      }
    );
  }

  teste() {
    let verdade = true;
    for (let i = 0; i < this.tam; i++) {
      if (this.estoqueDb[i] < this.quantidade[i]) {
        verdade = false;
        break;
      }
    }
    return verdade;
  }

  finalizarPedido() {
    if (this.info === null || this.info == undefined || this.info == '') {
      this.alertService.showModalPerigo('O carrinho deve conter itens...');
      this.router.navigate(['/natura/meu-carrinho']);
    } else {
      if (this.teste()) {
        this.vendaRota(this.inserir());
        this.router.navigate(['/natura/envio-ecommerce']);
      } else {
        this.alertService.showModalPerigo(
          'Ficamos sem estoque para alguns produtos, confira a lista!'
        );
        this.mostrar = true;
        this.router.navigate(['/natura/meu-carrinho']);
      }
    }
  }

  caixaTotal() {
    let soma = 0;
    for (let i = 0; i < this.tam; i++) {
      soma += this.quantidade[i] * this.preco[i];
    }
    return soma;
  }

  verCarrinho() {
    if (this.info === null || this.info == undefined || this.info == '') {
      return true;
    }
  }

  inserir() {
    let listaVenda = [];
    for (let i = 0; i < this.info.length; i++) {
      listaVenda.push({
        products: this.produto[i],
        precoVenda: this.preco[i],
        quantidade: this.quantidade[i],
        estoque: this.estoqueDb[i] - this.quantidade[i],
        total: this.total[i],
        caixa: this.caixaTotal(),
        idCarrinho: this.idCarrinho[i],
      });
    }
    return listaVenda;
  }

  vendaRota(venda: any) {
    this.service.setVenda(venda);
  }

  calc(x: number, y: number) {
    return x * y;
  }

  onDelete(cadastro) {
    this.cursoSelecionado = cadastro._id;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse ciclista?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.service.remove(cadastro._id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => {
          this.alertService.showModalPerigo(
            'Erro ao remover ciclista. Tente novamente mais tarde.'
          );
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showModalPerigo(
          'Erro ao remover ciclista. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
