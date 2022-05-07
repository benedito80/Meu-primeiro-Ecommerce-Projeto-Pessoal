import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-Text-Mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { SingEntrarComponent } from './sing-entrar/sing-entrar.component';
import { SingListUserComponent } from './sing-list-user/sing-list-user.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    SingEntrarComponent,
    SingListUserComponent,
    CadastroClienteComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TextMaskModule,
    UserRoutingModule,
    NgxPaginationModule,
  ],
})
export class UserModule {}
