import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Almacen } from '../model/almacen';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl = `${environment.url}/almacen`;

  constructor(private http: HttpClient) { }

  getAlmacenes(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(this.apiUrl);
  }

  registrarAlmacen(almacen: Almacen): Observable<Almacen> {
    return this.http.post<Almacen>(this.apiUrl, almacen);
  }
}