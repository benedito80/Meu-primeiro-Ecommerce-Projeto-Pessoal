import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericoGuard } from '../../../shared/guards/generico.guard';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { SingEntrarComponent } from './sing-entrar/sing-entrar.component';
import { SingListUserComponent } from './sing-list-user/sing-list-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: SingEntrarComponent,
  },
  {
    path: 'cadastro-cliente',
    component: CadastroClienteComponent,
  },
  {
    path: 'userprofile',
    component: SingListUserComponent,
    canActivate: [GenericoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
