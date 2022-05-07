import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal.service';
import { HistoricoService } from '../../caixa/caixa.service';
import { Venda } from '../vendas.model';
import { VendaService } from '../vendas.service';

@Component({
  selector: 'app-saiu-entrega',
  templateUrl: './saiu-entrega.component.html',
  styleUrls: ['./saiu-entrega.component.css'],
})
export class SaiuEntregaComponent implements OnInit {
  cliente$: any;
  payment$: any;
  contato$: any;
  listaVenda$: any;
  quantidade$: any;
  totalCaixa$: any;
  caixaT: any;
  ecommerce: number = 0;
  qtdProduto: number = 0;
  info: any;
  tam: any;
  historico: any;
  id: any;

  valorTotal: any;
  p: Number = 1;
  count: Number = 25;

  constructor(
    private service: VendaService,
    private serviceHistorico: HistoricoService,
    private router: Router,
    private modalService: ModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  tarifa(valor) {
    return (valor * 2.5) / 100;
  }

  somaCaixa(): number {
    let tt = 0;
    for (let i = 0; i < this.tam; i++) {
      tt += (this.caixaT[i] * 2.5) / 100;
    }
    return tt;
  }

  CaixaFinal(): number {
    let tt = 0;
    for (let i = 0; i < this.tam; i++) {
      tt += this.caixaT[i];
    }
    return tt;
  }

  onRefresh() {
    this.service.getVendasAllEntregaTrue().subscribe((res: any) => {
      this.listaVenda$ = res;
      this.info = res;

      this.cliente$ = res.map((r) => r.username.fullName);
      this.payment$ = res.map((r) => r.payment);
      this.contato$ = res.map((r) => r.contato);
      this.quantidade$ = res.map((r) => r.quantidade);
      this.caixaT = res.map((r) => r.caixa);
      this.ecommerce = this.caixaT.reduce((acc, valor) => acc + valor, 0);
      this.qtdProduto = this.listaVenda$
        .map((r) => r.listaVenda.length)
        .reduce((acc, valor) => acc + valor, 0);
      this.tam = this.caixaT.length;
      this.historico = res.map((r) => r.historico);
      this.id = res.map((r) => r._id);
    });
  }

  fecharMes() {
    if (
      this.listaVenda$ === null ||
      this.listaVenda$ == undefined ||
      this.listaVenda$ == [] ||
      this.listaVenda$ == ''
    ) {
      this.modalService.showModalPerigo(
        'Aguarde o carragamento da pagina, ou caixa não contém valor!'
      );
      this.router.navigate(['/natura/saiu-entrega']);
    } else {
      let venda: any = {
        data: new Date(),
        quantidade: this.qtdProduto,
        tarifa: (this.ecommerce * 2.5) / 100,
        caixa: this.ecommerce,
      };

      if (confirm('Deseja executar?')) {
        this.serviceHistorico.save(venda).subscribe(
          (success) => {
            this.update();
          },
          (error) =>
            this.modalService.showModalPerigo('Erro ao finalizar venda')
        );
      } else {
        this.router.navigate(['/natura/saiu-entrega']);
      }
    }
  }

  update() {
    for (let i = 0; i < this.id.length; i++) {
      let venda: any = {
        _id: this.id[i],
        historico: true,
        status: 'Venda Finalizada com sucesso!...',
      };
      this.service.update(venda).subscribe(
        (success) => {
          this.router.navigate(['/caixa/diario']);
        },
        (error) => this.modalService.showModalPerigo('Erro ao finalizar venda')
      );
    }
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
