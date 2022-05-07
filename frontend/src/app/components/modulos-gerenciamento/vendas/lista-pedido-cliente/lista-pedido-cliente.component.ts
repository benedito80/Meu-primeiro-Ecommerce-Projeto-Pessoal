import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from '../vendas.model';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-lista-pedido-cliente',
  templateUrl: './lista-pedido-cliente.component.html',
  styleUrls: ['./lista-pedido-cliente.component.css'],
})
export class ListaPedidoClienteComponent implements OnInit {
  cliente$: any;
  payment$: any;
  contato$: any;
  listaVenda$: Venda[];
  info: any;

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
    this.service.getVendasUser().subscribe((res: any[]) => {
      this.listaVenda$ = res;
      this.info = res;
      this.cliente$ = res.map((r) => r.username.fullName);
      this.payment$ = res.map((r) => r.payment);
      this.contato$ = res.map((r) => r.contato);
    });
  }

  listaVenda(id) {
    this.router.navigate(['usuario', id], {
      relativeTo: this.route,
    });
  }

  existDados() {
    if (this.info == null || this.info == undefined || this.info <= 0)
      return true;
  }
}
