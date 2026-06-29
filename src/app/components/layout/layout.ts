import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  activo: boolean;  // true = módulo implementado
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

  sidebarColapsado = false;
  dropdownAbierto = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard',       icon: 'bi-grid-1x2-fill',  route: '/dashboard',       activo: true },
    { label: 'Artículos',       icon: 'bi-box-seam',       route: '/articulos',        activo: true },
    { label: 'Proveedores',     icon: 'bi-building',       route: '/proveedor/nuevo',  activo: true },
    { label: 'Compras',         icon: 'bi-cart3',          route: '/compras',          activo: false },
    { label: 'Clientes',        icon: 'bi-people',         route: '/clientes',         activo: false },
    { label: 'Ventas',          icon: 'bi-cash-stack',     route: '/ventas',           activo: false },
    { label: 'Reportes',        icon: 'bi-graph-up-arrow', route: '/reportes',         activo: false },
  ];

  get nombreUsuario(): string {
    return this.authService.getNombreCompleto();
  }

  get rolUsuario(): string {
    return this.authService.getRol();
  }

  get inicialesUsuario(): string {
    const nombre = this.nombreUsuario;
    const partes = nombre.split(' ');
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  }

  toggleSidebar(): void {
    this.sidebarColapsado = !this.sidebarColapsado;
  }

  toggleDropdown(): void {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  cerrarDropdown(): void {
    this.dropdownAbierto = false;
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}
