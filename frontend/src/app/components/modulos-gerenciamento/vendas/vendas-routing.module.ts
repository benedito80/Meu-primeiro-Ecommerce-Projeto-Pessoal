import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpacotadorGuard } from 'src/app/shared/guards/empacotador.guard';
import { GenericoGuard } from 'src/app/shared/guards/generico.guard';
import { GerenteGuard } from '../../../shared/guards/gerente.guard';
import { CarrinhoComprasComponent } from './carrinho-compras/carrinho-compras.component';
import { DetalhaHistoricoVendasComponent } from './detalha-historico-vendas/detalha-historico-vendas.component';
import { DetalhaVendasConfirmadasComponent } from './detalha-vendas-confirmadas/detalha-vendas-confirmadas.component';
import { EntradaVendasConfirmadasComponent } from './entrada-vendas-confirmadas/entrada-vendas-confirmadas.component';
import { HistoricoVendasComponent } from './historico-vendas/historico-vendas.component';
import { ListaCompactaComponent } from './lista-compacta/lista-compacta.component';
import { ListaPedidoClienteComponent } from './lista-pedido-cliente/lista-pedido-cliente.component';
import { ModalConfirmaProdutoComponent } from './modal-confirma-produto/modal-confirma-produto.component';
import { ModalEnvioEcommerce } from './modal-envio-ecommerce/modal-envio-ecommerce.component';
import { ModalPedidoClienteComponent } from './modal-pedido-cliente/modal-pedido-cliente.component';
import { SaiuEntregaComponent } from './saiu-entrega/saiu-entrega.component';
import { TemplateVendaComponent } from './template-venda/template-venda.component';

const routes: Routes = [
  {
    path: 'meu-carrinho',
    component: CarrinhoComprasComponent,
    canActivate: [GenericoGuard],
  },
  {
    path: 'produtos',
    component: TemplateVendaComponent,
  },
  {
    path: 'historicos',
    component: HistoricoVendasComponent,
    canActivate: [GerenteGuard],
  },
  {
    path: 'modalFinalizarPedido',
    component: ModalPedidoClienteComponent,
    canActivate: [GenericoGuard],
  },
  {
    path: 'caixa-entrada',
    component: EntradaVendasConfirmadasComponent,
    canActivate: [EmpacotadorGuard],
  },
  {
    path: 'meus-pedidos',
    component: ListaPedidoClienteComponent,
    canActivate: [GenericoGuard],
  },
  {
    path: 'envio-ecommerce',
    component: ModalEnvioEcommerce,
    canActivate: [GenericoGuard],
  },
  {
    path: 'lista-compacta',
    component: ListaCompactaComponent,
    canActivate: [EmpacotadorGuard],
  },
  {
    path: 'saiu-entrega',
    component: SaiuEntregaComponent,
    canActivate: [GerenteGuard],
  },
  {
    path: 'confirma-produto/cliente',
    component: ModalConfirmaProdutoComponent,
    canActivate: [GenericoGuard],
  },
  {
    path: 'usuario/:id',
    component: DetalhaVendasConfirmadasComponent,
    canActivate: [GenericoGuard],
  },
  {
    path: 'confirma/:id',
    component: DetalhaVendasConfirmadasComponent,
    canActivate: [EmpacotadorGuard],
  },
  {
    path: 'venda/:id',
    component: DetalhaHistoricoVendasComponent,
    canActivate: [GerenteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaVendaRoutingModule {}
