import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal.service';
import { VendaService } from '../../modulos-gerenciamento/vendas/vendas.service';

@Component({
  selector: 'app-detalha-venda-historico',
  templateUrl: './detalha-venda-historico.component.html',
  styleUrls: ['./detalha-venda-historico.component.css'],
})
export class DetalhaVendaHistoricoComponent implements OnInit {
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
    private fb: FormBuilder,
    private modalService: ModalService,
    private location: Location,
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
    this.service.getEndId(this.idEndereco).subscribe((res) => {
      this.endUser = res;
    });
  }

  listaVenda(id) {
    this.router.navigate(['venda', id], {
      relativeTo: this.route,
    });
  }
}
