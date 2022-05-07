import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/user.model';
import { Endereco } from '../../endereco/endereco.motel';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sing-list-user',
  templateUrl: './sing-list-user.component.html',
  styleUrls: ['./sing-list-user.component.css'],
})
export class SingListUserComponent implements OnInit {
  userDetails: User;
  end: any;
  tan: number = 0;

  constructor(private userService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
      },
      (err) => {
        console.log(err);
      }
    );

    this.verificaEndereco();
  }

  verificaEndereco() {
    const id = this.userService.getUser();
    this.userService.verificaEnd(id).subscribe((res: Endereco[]) => {
      this.tan = res.map((r) => r.estado).length;
      this.endExiste();
    });
  }

  endExiste() {
    if (this.tan <= 0) {
      setTimeout(function () {
        alert('Olá, sugerimos que antes registre seu endereço atual!');
      }, 500);
      this.router.navigate(['/endereco']);
    } else this.router.navigate(['/auth/userprofile']);
  }

  pedidoRouter() {
    this.router.navigate(['/natura/meus-pedidos']);
  }

  endeUpdate() {
    this.router.navigate(['/endereco']);
  }

  senhaUpdate() {
    this.router.navigate(['/usuarios/update-senha']);
  }
}
