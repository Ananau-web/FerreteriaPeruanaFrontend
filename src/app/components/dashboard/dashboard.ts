import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface ModuloCard {
  titulo: string;
  descripcion: string;
  icono: string;
  ruta: string;
  color: string;
  activo: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  get nombreUsuario(): string {
    return this.authService.getNombreCompleto();
  }

  get fechaHoy(): string {
    return new Date().toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  readonly modulos: ModuloCard[] = [
    {
      titulo: 'Gestión de Artículos',
      descripcion: 'Consulta, registra y administra el catálogo de productos de la ferretería.',
      icono: 'bi-box-seam',
      ruta: '/articulos',
      color: '#1565c0',
      activo: true
    },
    {
      titulo: 'Proveedores',
      descripcion: 'Registra nuevos proveedores con validación de RUC peruano (11 dígitos).',
      icono: 'bi-building',
      ruta: '/proveedor/nuevo',
      color: '#2e7d32',
      activo: true
    },
    {
      titulo: 'Compras / Órdenes',
      descripcion: 'Genera órdenes de compra a partir de cronogramas y realiza seguimiento.',
      icono: 'bi-cart3',
      ruta: '/compras',
      color: '#e65100',
      activo: false
    },
    {
      titulo: 'Clientes',
      descripcion: 'Gestiona el registro de clientes y su historial de interacciones.',
      icono: 'bi-people',
      ruta: '/clientes',
      color: '#6a1b9a',
      activo: false
    },
    {
      titulo: 'Ventas',
      descripcion: 'Registra ventas, consulta el historial y genera reportes por periodo.',
      icono: 'bi-cash-stack',
      ruta: '/ventas',
      color: '#c62828',
      activo: false
    },
    {
      titulo: 'Reportes',
      descripcion: 'Dashboards, estadísticas de inventario, órdenes pendientes y más.',
      icono: 'bi-graph-up-arrow',
      ruta: '/reportes',
      color: '#00838f',
      activo: false
    }
  ];

  navegar(modulo: ModuloCard): void {
    this.router.navigate([modulo.ruta]);
  }
}
