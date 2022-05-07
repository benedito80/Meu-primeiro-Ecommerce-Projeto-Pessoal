import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-Text-Mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { VendasDescartadasDetalhesComponent } from './vendas-descartadas-detalhes/vendas-descartadas-detalhes.component';
import { VendasDescartadasComponent } from './vendas-descartadas/vendas-descartadas.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { HistoricoVendasComponent } from './historico-vendas/historico-vendas.component';
import { DetalhaVendaHistoricoComponent } from './detalha-venda-historico/detalha-venda-historico.component';

@NgModule({
  declarations: [
    VendasDescartadasComponent,
    VendasDescartadasDetalhesComponent,
    GerenciarUsuariosComponent,
    HistoricoVendasComponent,
    DetalhaVendaHistoricoComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdministradorRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TextMaskModule,
  ],
})
export class AdministradorModule {}
