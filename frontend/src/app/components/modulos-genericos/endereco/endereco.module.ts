import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-Text-Mask';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoFormComponent } from './endereco-form/endereco-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [EnderecoFormComponent],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class EnderecoModule {}
