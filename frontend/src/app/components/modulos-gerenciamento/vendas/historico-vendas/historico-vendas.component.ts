import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-historico-vendas',
  templateUrl: './historico-vendas.component.html',
  styleUrls: ['./historico-vendas.component.css'],
})
export class HistoricoVendasComponent implements OnInit {
  cliente$: any;
  payment$: any;
  contato$: any;
  status$: any;
  listaVenda$: any;
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
    this.service.getAllVendas().subscribe((res: any[]) => {
      this.listaVenda$ = res;
      this.info = res;
      this.cliente$ = res.map((r) => r.username.fullName);
      this.payment$ = res.map((r) => r.payment);
      this.status$ = res.map((r) => r.status);
      this.contato$ = res.map((r) => r.contato);
    });
  }

  listaVenda(id) {
    this.router.navigate(['venda', id], {
      relativeTo: this.route,
    });
  }

  existDados() {
    if (this.info == null || this.info == undefined || this.info <= 0)
      return true;
  }
}
