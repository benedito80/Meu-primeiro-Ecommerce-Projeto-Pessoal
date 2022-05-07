import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { environment } from 'src/environments/environment';
import { Categoria } from '../categoria.model';
import { ProdCategoria } from '../prodCategoria.model';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form-ativado',
  templateUrl: './product-form-ativado.component.html',
  styleUrls: ['./product-form-ativado.component.css'],
})
export class ProductFormAtivadoComponent implements OnInit {
  obj = {} as Product;
  objs: Product[];
  productSelecionado: Product;
  produto = null;

  prod = {} as ProdCategoria;
  categoria_Produts: ProdCategoria[];
  prod_categoriaSelecionado: any;

  cat = {} as Categoria;
  categorias: Categoria[];
  cat_remover: Categoria;

  p: Number = 1;
  count: Number = 25;

  deletaModalRef: BsModalRef;
  img = '';
  imgDiv = true;
  buttonImg = false;
  protegeEdicao = true;
  id = '';
  id_prod_Categoria = '';
  idPostRemover: any;

  constructor(
    private service: ProductService,
    private http: HttpClient,
    private serviceProduct: ProductService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.verifica();
    this.getProd_categoria();
    this.getCategoria();
  }

  getProducts() {
    this.service.getProducts().subscribe((res: Product[]) => {
      this.objs = res;
    });
  }


  limpar() {
    this.produto = null;
    this.verifica();
    this.obj = {} as Product;
  }

  verifica() {
    if (this.produto == null) {
      this.getProducts();
    } else {
      this.onPorProduto();
    }
  }

  onPorProduto() {
    this.serviceProduct
      .getPor_prod_categoria(this.produto)
      .subscribe((res: Product[]) => {
        this.objs = res;
        this.obj = {} as Product;
      });
  }

  getProd_categoria() {
    this.service.getProd_categoria().subscribe((res: ProdCategoria[]) => {
      this.categoria_Produts = res;
    });
  }

  saveProduct(form: NgForm) {
    let msgSuccess = 'Produto cadastrado com sucesso!';
    let msgError = 'Erro ao cadastrar produto, tente novamente!';

    if (this.obj._id !== undefined) {
      msgSuccess = 'Produto atualizado com sucesso!';
      msgError = 'Erro ao atualizar produto, tente novamente!';

      this.buttonImg = false;

      this.service.updateProduct(this.obj).subscribe(
        (success) => {
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.imgDiv = true;
          this.produto = null;
          this.router.navigate(['/produtos']);
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    } else {
      this.obj.post = this.id;
      this.service.saveProduct(this.obj).subscribe(
        (success) => {
          localStorage.removeItem('id');
          localStorage.removeItem('img');
          this.modalService.showAModalSucesso(msgSuccess);
          this.cleanForm(form);
          this.img = '';
          this.imgDiv = true;
          this.buttonImg = false;
          this.produto = null;
          this.getProducts();
        },
        (error) => this.modalService.showModalPerigo(msgError)
      );
    }
  }

  editProduct(prod: Product) {
    this.protegeEdicao = false;
    this.obj = { ...prod };
  }

  cleanForm(form: NgForm) {
    this.protegeEdicao = true;
    localStorage.removeItem('id');
    localStorage.removeItem('img');
    this.img = '';

    form.resetForm();
    this.obj = {} as Product;
    this.produto = null;
    this.getProducts();
  }

  postRemove() {
    this.http
      .delete(`${environment.API}/posts/${this.id}`)
      .subscribe((success) => {
        localStorage.removeItem('id');
        localStorage.removeItem('img');
        this.img = '';
        this.buttonImg = false;
        this.imgDiv = true;
        this.getProducts();
      });
  }

  postImagem(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.http

        .post(`${environment.API}/posts`, formData)
        .subscribe((r: any) => {
          this.imgDiv = false;
          this.buttonImg = true;
          localStorage.setItem('img', JSON.stringify(r.post.url));
          localStorage.setItem('id', JSON.stringify(r.post._id));
          this.img = JSON.parse(localStorage.getItem('img'));
          this.id = JSON.parse(localStorage.getItem('id'));
        });
    }
  }

  deleteProduct(produto: Product) {
    this.productSelecionado = produto;

    const result$ = this.modalService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover esse produto ?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.service.deleteProduct(produto) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.idPostRemover = this.productSelecionado;
          const a = this.idPostRemover.post._id;

          this.http.delete(`${environment.API}/posts/${a}`).subscribe();
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
