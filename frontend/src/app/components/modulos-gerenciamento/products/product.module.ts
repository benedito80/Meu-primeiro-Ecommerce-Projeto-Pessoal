import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductFormAtivadoComponent } from './product-form-ativado/product-form-ativado.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsFormDesativadoComponent } from './products-form-desativado/products-form-desativado.component';

@NgModule({
  declarations: [ProductFormAtivadoComponent, ProductsFormDesativadoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ProductRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
