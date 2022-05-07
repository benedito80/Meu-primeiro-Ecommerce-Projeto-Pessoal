import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../shared/guards/admin.guard';
import { DetalhaVendaHistoricoComponent } from './detalha-venda-historico/detalha-venda-historico.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';
import { HistoricoVendasComponent } from './historico-vendas/historico-vendas.component';
import { VendasDescartadasDetalhesComponent } from './vendas-descartadas-detalhes/vendas-descartadas-detalhes.component';
import { VendasDescartadasComponent } from './vendas-descartadas/vendas-descartadas.component';

const routes: Routes = [
  {
    path: 'vendas-descartadas',
    component: VendasDescartadasComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'detalhes/:id',
    component: VendasDescartadasDetalhesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'novo',
    component: GerenciarUsuariosComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'historicos',
    component: HistoricoVendasComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'venda/:id',
    component: DetalhaVendaHistoricoComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
