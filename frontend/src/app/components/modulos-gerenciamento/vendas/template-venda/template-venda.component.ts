import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal.service';
import { AuthService } from '../../../modulos-genericos/user-login/auth.service';
import { Categoria } from '../../products/categoria.model';
import { ProdCategoria } from '../../products/prodCategoria.model';
import { Product } from '../../products/product.model';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-template-venda',
  templateUrl: './template-venda.component.html',
  styleUrls: ['./template-venda.component.css'],
})
export class TemplateVendaComponent implements OnInit {
  prod$: Product[];
  categoria_promocao$: Product[];
  categoria: any = 'Novidades';
  produto = null;
  linha = 'linha';

  selectProdutos: ProdCategoria[];
  selectCategorias: Categoria[];

  constructor(
    private service: ProductService,
    private alertService: ModalService,
    private userService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onReflesh();
    this.onPromocao();

    this.getCategoria();
    this.getProd_categoria();
    this.logado();
  }

  valLogado = 'FAZER LOGIN';
  logado() {
    if (this.userService.isLoggedIn()) {
      this.valLogado = 'MEU PERFIL';
    }
  }

  getProd_categoria() {
    this.service.getProd_categoria().subscribe((res: ProdCategoria[]) => {
      this.selectProdutos = res;
    });
  }

  getCategoria() {
    this.service.getAllCategoria().subscribe((res: Categoria[]) => {
      this.selectCategorias = res;
    });
  }

  onReflesh() {
    if (this.produto != null) {
      this.onPorProduto();
    } else {
      this.onPor_Categoria();
    }
  }

  private onPor_Categoria() {
    this.linha = 'Linha';
    this.service
      .getPor_Categoria(this.categoria)
      .subscribe((res: Product[]) => {
        this.prod$ = res.filter((p) => p.estoque > 0);
        this.produto = null;
      });
  }

  private onPorProduto() {
    this.linha = 'Resultado por';
    this.service
      .getPor_prod_categoria(this.produto)
      .subscribe((res: Product[]) => {
        this.prod$ = res;
        this.categoria = this.produto;
      });
  }

  onPromocao() {
    this.service.getPor_Categoria('Promoções').subscribe((res: Product[]) => {
      this.categoria_promocao$ = res
        .filter((r) => r.categoria === 'Promoções')
        .filter((p) => p.estoque > 0);
    });
  }

  option_Categoria() {
    this.alertService.showAModalSucesso(
      'Por favor, aguarde enquanto os dados são carregados!'
    );
    this.onPor_Categoria();
  }

  option_Produto() {
    this.alertService.showAModalSucesso(
      'Por favor, aguarde enquanto os dados são carregados!'
    );
    this.onPorProduto();
  }

  productRota(product: Product) {
    this.service.setProduct(product);
  }

  comprar(item) {
    if (this.userService.isLoggedIn() == false) {
      this.alertService.showModalPerigo(
        'Caro cliente, para comprar precisa estar logado ou se cadastrar!'
      );
      this.router.navigate(['auth/cadastro-cliente']);
    } else {
      this.productRota(item);
      this.router.navigate(['/natura/modalFinalizarPedido']);
    }
  }
}
