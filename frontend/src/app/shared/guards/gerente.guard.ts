import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../components/modulos-genericos/user-login/auth.service';
import { ModalService } from '../modal.service';

@Injectable({
  providedIn: 'root',
})
export class GerenteGuard implements CanActivate {
  constructor(
    private userService: AuthService,
    private router: Router,
    private alertService: ModalService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      !(
        this.userService.isLoggedIn() &&
        (this.userService.getFuncao() == 'admin' ||
          this.userService.getFuncao() == 'gerente')
      )
    ) {
      this.userService.mostrarMenuAdminEmitter.emit(false);
      this.userService.mostrarMenuGerenteEmitter.emit(false);
      this.userService.mostrarMenuEmpacotadorEmitter.emit(false);
      this.userService.mostrarMenuClienteEmitter.emit(false);
      this.userService.setToken('', '', '', '');
      this.alertService.showModalPerigo('Sua Sessão Expirou!');
      this.router.navigateByUrl('/cadastros/novo');
      return false;
    }

    return true;
  }
}
