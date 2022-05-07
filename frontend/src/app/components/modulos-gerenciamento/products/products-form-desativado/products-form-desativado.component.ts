import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { Categoria } from '../categoria.model';
import { ProdCategoria } from '../prodCategoria.model';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-form-desativado',
  templateUrl: './products-form-desativado.component.html',
  styleUrls: ['./products-form-desativado.component.css'],
})
export class ProductsFormDesativadoComponent implements OnInit {
  pd = {} as Product;
  pds: Product[];
  p: Number = 1;
  count: Number = 25;
  productSelecionado: Product;
  deletaModalRef: BsModalRef;
  img = '';
  imgDiv = true;
  buttonImg = false;
  protegeEdicao = true;
  id = '';

  prod = {} as ProdCategoria;
  categoria_Produts: ProdCategoria[];
  prod_categoriaSelecionado: any;

  cat = {} as Categoria;
  categorias: Categoria[];
  cat_remover: Categoria;

  constructor(
    private service: ProductService,
    private http: HttpClient,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getProd_categoria();
    this.getCategoria();
  }

  getProducts() {
    this.service.getProductsDesativado().subscribe((res: Product[]) => {
      this.pds = res;
    });
  }

  saveProduct(form: NgForm) {
    let msgSuccess = 'Produto cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar produto, tente novamente!';

    if (this.pd._id !== undefined) {
      msgSuccess = 'Produto atualizado com sucesso!';
      msgError = 'Erro ao atualizar produto, tente novamente!';

      this.buttonImg = false;

      this.service.updateProduct(this.pd).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.imgDiv = true;
          this.router.navigate(['/produtos/desativado']);
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    } else {
      this.pd.post = this.id;
      this.service.saveProduct(this.pd).subscribe(
        (success) => {
          localStorage.removeItem('id');
          localStorage.removeItem('img');
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.img = '';
          this.imgDiv = true;
          this.buttonImg = false;
          this.getProducts();
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    }
  }

  existDados() {
    let info = false;
    if (this.pds == null || this.pds == undefined || this.pds.length <= 0) {
      return !info;
    }
  }

  editProduct(prod: Product) {
    this.protegeEdicao = false;
    this.pd = { ...prod };
  }

  cleanForm(form: NgForm) {
    this.protegeEdicao = true;
    localStorage.removeItem('id');
    localStorage.removeItem('img');
    this.img = '';

    form.resetForm();
    this.getProducts();
    this.pd = {} as Product;
  }

  deleteProduct(product: Product) {
    this.productSelecionado = product;
    const result$ = this.modalService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover esse produto ?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.service.deleteProduct(product) : EMPTY
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
    this.service.deleteProduct(this.productSelecionado).subscribe(
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

  saveProd_categoria(form: NgForm) {
    let msgSuccess = 'Produto cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar produto, tente novamente!';

    if (this.prod._id !== undefined) {
      msgSuccess = 'Produto atualizado com sucesso!';
      msgError = 'Erro ao atualizar produto, tente novamente!';

      this.service.updateProd_categoria(this.prod).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm2(form);
          this.router.navigate(['/produtos']);
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    } else {
      this.service.saveProd_categoria(form.value).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm2(form);
          this.getProd_categoria();
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    }
  }

  getProd_categoria() {
    this.service.getProd_categoria().subscribe((res: ProdCategoria[]) => {
      this.categoria_Produts = res;
    });
  }

  editProd_categoria(prod: ProdCategoria) {
    this.prod = { ...prod };
  }

  deleteProd_categoria(prod: ProdCategoria) {
    if (confirm('Deseja Remover')) {
      this.service.deleteProd_categoria(prod).subscribe(
        (success) => {
          this.modalService.showAModalSucesso('Produto excluida com sucesso.');
          this.getProd_categoria();
        },
        (error) => {
          this.modalService.showModalPerigo(
            'Erro ao remover produto. Tente novamente mais tarde.'
          );
        }
      );
    }
  }

  cleanForm2(form: NgForm) {
    form.resetForm();
    this.getProd_categoria();
    this.prod = {} as any;
  }

  getCategoria() {
    this.service.getAllCategoria().subscribe((res: Categoria[]) => {
      this.categorias = res;
    });
  }

  saveCategoria(form: NgForm) {
    let msgSuccess = 'Produto cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar produto, tente novamente!';

    if (this.cat._id !== undefined) {
      msgSuccess = 'Categoria atualizado com sucesso!';
      msgError = 'Erro ao atualizar categoria, tente novamente!';

      this.service.updateCategoria(this.cat).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm3(form);
          this.router.navigate(['/produtos']);
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    } else {
      this.service.save_Categoria(this.cat).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm3(form);
          this.getCategoria();
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    }
  }

  editCategoria(cat: Categoria) {
    this.cat = { ...cat };
  }

  cleanForm3(form: NgForm) {
    form.resetForm();
    this.getCategoria();
    this.cat = {} as Categoria;
  }

  del_Categoria(prod: Categoria) {
    if (confirm('Deseja Remover')) {
      this.service.deleteCategoria(prod).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(
            'Categoria excluida com sucesso.'
          );
          this.getCategoria();
        },
        (error) => {
          this.modalService.showModalPerigo(
            'Erro ao remover produto. Tente novamente mais tarde.'
          );
        }
      );
    }
  }
}
