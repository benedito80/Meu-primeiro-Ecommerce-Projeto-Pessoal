import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenteGuard } from '../../../shared/guards/gerente.guard';
import { CaixaDiarioComponent } from './caixa-diario/caixa-diario.component';
import { CaixaMensalComponent } from './caixa-mensal/caixa-mensal.component';

const routes: Routes = [
  {
    path: 'diario',
    component: CaixaDiarioComponent,
    canActivate: [GerenteGuard],
  },
  {
    path: 'mensal',
    component: CaixaMensalComponent,
    canActivate: [GerenteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoRoutingModule {}
