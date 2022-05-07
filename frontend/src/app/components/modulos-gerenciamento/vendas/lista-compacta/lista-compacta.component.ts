import { VendaService } from '../vendas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-compacta',
  templateUrl: './lista-compacta.component.html',
  styleUrls: ['./lista-compacta.component.css'],
})
export class ListaCompactaComponent implements OnInit {
  rota: any;

  constructor(private service: VendaService) {}

  ngOnInit() {
    this.rota = this.service.getVenda();
    console.log(this.rota);
  }
}
