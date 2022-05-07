import { User } from '../../../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CrudGenericoService } from 'src/app/shared/crud-generico.service';

@Injectable({
  providedIn: 'root',
})
export class DataApiService extends CrudGenericoService<User> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/usuario`);
  }
}
