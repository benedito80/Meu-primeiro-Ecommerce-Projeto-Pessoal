import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenteGuard } from '../../../shared/guards/gerente.guard';
import { ProductFormAtivadoComponent } from './product-form-ativado/product-form-ativado.component';
import { ProductsFormDesativadoComponent } from './products-form-desativado/products-form-desativado.component';

const routes: Routes = [
  {
    path: '',
    component: ProductFormAtivadoComponent,
    canActivate: [GerenteGuard],
  },
  {
    path: 'desativado',
    component: ProductsFormDesativadoComponent,
    canActivate: [GerenteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
