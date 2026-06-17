import { LineaProducto } from './linea-producto';

export interface Articulo {
  idArticulo?: number;
  codigo: string;
  codigoBarras?: string;
  nombre: string;
  nivelRotacion: number;
  precioUnitario: number;
  unidadMedida: string;
  lineaProducto: LineaProducto;
}