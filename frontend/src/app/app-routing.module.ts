import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'natura',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/vendas/vendas.module').then(
        (m) => m.VendaModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/modulos-administrador/administrador.module').then(
        (m) => m.AdministradorModule
      ),
  },
  {
    path: 'admin/vendas-descartadas',
    loadChildren: () =>
      import('./components/modulos-administrador/administrador.module').then(
        (m) => m.AdministradorModule
      ),
  },
  {
    path: 'admin/historicos',
    loadChildren: () =>
      import('./components/modulos-administrador/administrador.module').then(
        (m) => m.AdministradorModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/modulos-genericos/user-login/user.module').then(
        (m) => m.UserModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./components/modulos-genericos/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule
      ),
  },
  {
    path: 'endereco',
    loadChildren: () =>
      import('./components/modulos-genericos/endereco/endereco.module').then(
        (m) => m.EnderecoModule
      ),
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/products/product.module').then(
        (m) => m.ProductModule
      ),
  },
  {
    path: 'caixa',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/caixa/caixa.module').then(
        (m) => m.HistoricoModule
      ),
  },

  {
    path: 'natura/historicos',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/vendas/vendas.module').then(
        (m) => m.VendaModule
      ),
  },
  {
    path: 'natura/caixa-entrada',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/vendas/vendas.module').then(
        (m) => m.VendaModule
      ),
  },
  {
    path: 'natura/saiu-entrega',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/vendas/vendas.module').then(
        (m) => m.VendaModule
      ),
  },
  {
    path: 'natura/meus-pedidos',
    loadChildren: () =>
      import('./components/modulos-gerenciamento/vendas/vendas.module').then(
        (m) => m.VendaModule
      ),
  },
  {
    path: '',
    redirectTo: 'natura/produtos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'natura/produtos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
