import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../shared/modal.service';
import { AuthService } from '../../../modulos-genericos/user-login/auth.service';
import { Venda } from '../vendas.model';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-listar-vendas-confirmadas',
  templateUrl: './detalha-vendas-confirmadas.component.html',
  styleUrls: ['./detalha-vendas-confirmadas.component.css'],
})
export class DetalhaVendasConfirmadasComponent implements OnInit {
  venda = {} as any;
  id: any;
  status: string;
  imprimiLista: any;

  cliente$: any;
  payment$: any;
  contato$: any;
  saiu_p_entrega: any;
  listaVenda$: any;
  enderecoEntrega: any;
  totalCaixa$: any;
  idEndereco: any;
  endUser: any;
  historico: any;

  valorTotal: any;
  p: Number = 1;
  count: Number = 25;

  constructor(
    private service: VendaService,
    private router: Router,
    private location: Location,
    private userService: AuthService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  productRota(venda: Venda) {
    this.service.setVenda(venda);
  }

  executar() {
    this.productRota(this.imprimiLista);
    this.router.navigate(['/natura/lista-compacta']);
  }

  onRefresh() {
    const id = this.route.snapshot.params['id'];
    this.service.getVendaById(id).subscribe((res: any) => {
      this.imprimiLista = res;
      this.id = res._id;
      this.listaVenda$ = res.listaVenda;
      this.status = res.status;
      this.cliente$ = res.username.fullName;
      this.idEndereco = res.username._id;
      this.payment$ = res.payment;
      this.contato$ = res.contato;
      this.totalCaixa$ = res.total;
      this.enderecoEntrega = res.enderecoEntrega;
      this.saiu_p_entrega = res.saiu_p_entrega;
      this.historico = res.historico;
    });
  }

  endereco() {
    this.service.getEndId(this.idEndereco).subscribe((res: any) => {
      this.endUser = res;
    });
  }

  funcionario() {
    const funcao = this.userService.getFuncao();

    if (
      (funcao == 'admin' || funcao == 'gerente' || funcao == 'empacotador') &&
      this.historico == false
    )
      return true;
    return false;
  }

  cliente() {
    const funcao = this.userService.getFuncao();
    if (funcao == 'cliente') return true;
    return false;
  }

  descartarVenda() {
    if (confirm('Deseja Descartar a venda?')) {
      this.venda = {
        _id: this.id,
        status: 'Pedido Descartado...',
        vendaBoa: false,
      };

      this.service.update(this.venda).subscribe((success) => {
        this.modalService.showAModalSucesso('Venda descartada com sucesso!');
        this.location.back();
      });
    }
  }

  entregaVenda() {
    if (confirm('Deseja executar')) {
      this.venda = {
        _id: this.id,
        status: 'Saiu para entregar',
        saiu_p_entrega: true,
      };

      this.service.update(this.venda).subscribe((success) => {
        this.modalService.showAModalSucesso('Dados atualizado com sucesso!');
        this.router.navigate(['natura/caixa-entrada']);
      });
    }
  }

  listaVenda(id) {
    this.router.navigate(['confirma', id], {
      relativeTo: this.route,
    });
  }
}
