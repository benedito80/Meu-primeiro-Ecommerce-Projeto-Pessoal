import { User } from './user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';

export class CrudGenericoService<T> {
  constructor(protected http: HttpClient, private API_URL) {}

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  list() {
    return this.http.get<T[]>(this.API_URL).pipe(delay(2000), tap(console.log));
  }

  loadByID(id) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T) {
    return this.http
      .post(this.API_URL, record, this.noAuthHeader)
      .pipe(take(1));
  }

  private update(record: T) {
    return this.http
      .put(`${this.API_URL}/${record['id']}`, record, this.noAuthHeader)
      .pipe(take(1));
  }

  save(record: T) {
    if (record['id']) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
