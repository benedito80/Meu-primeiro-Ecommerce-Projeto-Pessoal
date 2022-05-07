import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-detalha-historico-vendas',
  templateUrl: './detalha-historico-vendas.component.html',
  styleUrls: ['./detalha-historico-vendas.component.css'],
})
export class DetalhaHistoricoVendasComponent implements OnInit {
  formulario: FormGroup;
  venda = {} as any;
  id: any;
  status: string;
  endUser: any;
  idEndereco: any;

  cliente$: any;
  payment$: any;
  contato$: any;
  saiu_p_entrega: any;
  enderecoEntrega: any;
  listaVenda$: any;
  totalCaixa$: any;

  valorTotal: any;
  p: Number = 1;
  count: Number = 25;

  constructor(
    private service: VendaService,
    private router: Router,
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
      this.idEndereco = res.username._id;
      this.status = res.status;
      this.cliente$ = res.username.fullName;
      this.payment$ = res.payment;
      this.contato$ = res.contato;
      this.totalCaixa$ = res.total;
      this.saiu_p_entrega = res.saiu_p_entrega;
      this.enderecoEntrega = res.enderecoEntrega;
    });
  }

  endereco() {
    this.service.getEndId(this.idEndereco).subscribe((res: any) => {
      this.endUser = res;
    });
  }

  listaVenda(id) {
    this.router.navigate(['venda', id], {
      relativeTo: this.route,
    });
  }
}
