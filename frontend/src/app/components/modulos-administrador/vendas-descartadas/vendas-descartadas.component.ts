import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal.service';
import { VendaService } from '../../modulos-gerenciamento/vendas/vendas.service';
import { Admin } from '../administrador';
import { AdministradorService } from '../administrador.service';

@Component({
  selector: 'app-vendas-descartadas',
  templateUrl: './vendas-descartadas.component.html',
  styleUrls: ['./vendas-descartadas.component.css'],
})
export class VendasDescartadasComponent implements OnInit {
  deleteModalRef: BsModalRef;
  usuarioSelecionado: any;

  cliente$: any;
  payment$: any;
  contato$: any;
  listaVenda$: Admin[];
  totalCaixa$: any;
  info: any;

  valorTotal: any;
  p: Number = 1;
  count: Number = 25;

  constructor(
    private service: AdministradorService,
    private vendaService: VendaService,
    private router: Router,
    private alertService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.service.getVendasDescartadas().subscribe((res: any) => {
      this.listaVenda$ = res;
      this.info = res;
      this.cliente$ = res.map((r) => r.username.fullName);
      this.payment$ = res.map((r) => r.payment);
      this.contato$ = res.map((r) => r.contato);
    });
  }

  listaVenda(id) {
    this.router.navigate(['detalhes', id], {
      relativeTo: this.route,
    });
  }

  existDados() {
    if (this.info == null || this.info == undefined || this.info <= 0)
      return true;
  }

  deleteUser(usuario: any) {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertService.showConfirm(
      'Caixa de confirmacão',
      'Tem certeza que deseja remover essa venda?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.vendaService.remove(usuario) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.alertService.showAModalSucesso('Venda excluida com sucesso!');
          this.onRefresh();
        },
        (error) => {
          this.alertService.showModalPerigo(
            'Erro ao remover venda. Tente novamente mais tarde.'
          );
        }
      );
  }

  onConfirmDelete() {
    this.vendaService.remove(this.usuarioSelecionado).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.alertService.showModalPerigo(
          'Erro ao remover venda. Tente novamente mais tarde.'
        );
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
