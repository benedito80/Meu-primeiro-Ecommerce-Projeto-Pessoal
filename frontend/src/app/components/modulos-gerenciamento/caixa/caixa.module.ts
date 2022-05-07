import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaixaDiarioComponent } from './caixa-diario/caixa-diario.component';
import { CaixaMensalComponent } from './caixa-mensal/caixa-mensal.component';
import { HistoricoRoutingModule } from './caixa-routing.module';


@NgModule({
  declarations: [CaixaDiarioComponent, CaixaMensalComponent],
  imports: [
    CommonModule,
    HistoricoRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class HistoricoModule {}
