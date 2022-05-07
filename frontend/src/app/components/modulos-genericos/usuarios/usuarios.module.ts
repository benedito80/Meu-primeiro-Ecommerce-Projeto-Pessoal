import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateSenhaComponent } from './update-senha/update-senha.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  declarations: [UpdateSenhaComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsuariosRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class UsuariosModule {}
