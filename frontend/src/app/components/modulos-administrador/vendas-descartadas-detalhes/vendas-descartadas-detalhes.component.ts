import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../shared/modal.service';
import { VendaService } from '../../modulos-gerenciamento/vendas/vendas.service';
import { AdministradorService } from '../administrador.service';

@Component({
  selector: 'app-vendas-descartadas-detalhes',
  templateUrl: './vendas-descartadas-detalhes.component.html',
  styleUrls: ['./vendas-descartadas-detalhes.component.css'],
})
export class VendasDescartadasDetalhesComponent implements OnInit {
  venda = {} as any;
  id: any;

  cliente$: any;
  payment$: any;
  contato$: any;
  enderecoEntrega: any;
  saiu_p_entrega: any;
  listaVenda$: any;
  totalCaixa$: any;
  idEndereco: any;
  endUser: any;

  valorTotal: any;
  p: Number = 1;
  count: Number = 25;

  constructor(
    private service: AdministradorService,
    private vendaService: VendaService,
    private router: Router,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    const id = this.route.snapshot.params['id'];
    this.service.getVendaById(id).subscribe((res: any) => {
      this.id = res._id;
      this.listaVenda$ = res.listaVenda;
      this.cliente$ = res.username.fullName;
      this.payment$ = res.payment;
      this.contato$ = res.contato;
      this.idEndereco = res.username._id;
      this.enderecoEntrega = res.enderecoEntrega;
      this.totalCaixa$ = res.total;
      this.saiu_p_entrega = res.saiu_p_entrega;
    });
  }

  endereco() {
    this.service.getEndId(this.idEndereco).subscribe((res: any) => {
      this.endUser = res;
    });
  }

  validarVenda() {
    if (confirm('Deseja realmente validar essa venda?')) {
      this.venda = {
        _id: this.id,
        status: 'Avaliado e entregue...',
        vendaBoa: true,
      };

      this.vendaService.update(this.venda).subscribe((success) => {
        this.modalService.showAModalSucesso('Dados atualizado com sucesso!');
        this.router.navigate(['admin/vendas-descartadas']);
      });
    }
  }

  listaVenda(id) {
    this.router.navigate(['detalhes', id], {
      relativeTo: this.route,
    });
  }
}
