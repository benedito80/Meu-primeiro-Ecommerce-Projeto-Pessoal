import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericoGuard } from '../../../shared/guards/generico.guard';
import { UpdateSenhaComponent } from './update-senha/update-senha.component';

const routes: Routes = [
  {
    path: 'update-senha',
    component: UpdateSenhaComponent,
    canActivate: [GenericoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
