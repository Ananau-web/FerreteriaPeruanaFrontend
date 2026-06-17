import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../model/articulo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = `${environment.url}/articulo`;

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  registrarArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }
}