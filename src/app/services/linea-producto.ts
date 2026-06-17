import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineaProducto } from '../model/linea-producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineaProductoService {
  
  private apiUrl = `${environment.url}/lineaproducto`; 

  constructor(private http: HttpClient) { }

  getLineasProducto(): Observable<LineaProducto[]> {
    return this.http.get<LineaProducto[]>(this.apiUrl);
  }

  registrarLineaProducto(linea: LineaProducto): Observable<LineaProducto> {
    return this.http.post<LineaProducto>(this.apiUrl, linea);
  }
}