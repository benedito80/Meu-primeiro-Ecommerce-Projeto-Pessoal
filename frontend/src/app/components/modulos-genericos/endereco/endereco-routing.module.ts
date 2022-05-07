import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericoGuard } from '../../../shared/guards/generico.guard';
import { EnderecoFormComponent } from './endereco-form/endereco-form.component';

const routes: Routes = [
  {
    path: '',
    component: EnderecoFormComponent,
    canActivate: [GenericoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoRoutingModule {}
