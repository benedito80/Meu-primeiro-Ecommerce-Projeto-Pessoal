import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-Text-Mask';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { TodaVendaRoutingModule } from './vendas-routing.module';

@NgModule({
  declarations: [
    TemplateVendaComponent,
    CarrinhoComprasComponent,
    ModalPedidoClienteComponent,
    ModalConfirmaProdutoComponent,
    ModalEnvioEcommerce,
    DetalhaVendasConfirmadasComponent,
    EntradaVendasConfirmadasComponent,
    SaiuEntregaComponent,
    HistoricoVendasComponent,
    DetalhaHistoricoVendasComponent,
    ListaCompactaComponent,
    ListaPedidoClienteComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TodaVendaRoutingModule,
    NgxPaginationModule,
    TextMaskModule,
  ],
})
export class VendaModule {}
