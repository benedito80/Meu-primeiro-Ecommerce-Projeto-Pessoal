import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from '../vendas.model';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-entrada-vendas-confirmadas',
  templateUrl: './entrada-vendas-confirmadas.component.html',
  styleUrls: ['./entrada-vendas-confirmadas.component.css'],
})
export class EntradaVendasConfirmadasComponent implements OnInit {
  cliente$: any;
  payment$: any;
  contato$: any;
  listaVenda$: Venda;
  totalCaixa$: any;
  info: any;

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
    this.service.getVendConfTrue().subscribe((res: any) => {
      this.listaVenda$ = res;
      this.info = res;
      this.cliente$ = res.map((r) => r.username.fullName);
      this.payment$ = res.map((r) => r.payment);
      this.contato$ = res.map((r) => r.contato);
    });
  }

  listaVenda(id) {
    this.router.navigate(['confirma', id], {
      relativeTo: this.route,
    });
  }

  existDados() {
    if (this.info == null || this.info == undefined || this.info <= 0)
      return true;
  }
}
