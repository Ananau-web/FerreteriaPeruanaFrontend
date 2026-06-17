import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../model/articulo';
import { LineaProducto } from '../model/linea-producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl     = `${environment.url}/articulo`;
  private apiLinea   = `${environment.url}/lineaproducto`;

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  registrarArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }

  eliminarArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLineasProducto(): Observable<LineaProducto[]> {
    return this.http.get<LineaProducto[]>(this.apiLinea);
  }
}