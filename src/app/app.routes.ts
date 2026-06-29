import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { GestionArticulosComponent } from './components/gestion-articulos/gestion-articulos';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor';
import { ComingSoonComponent } from './components/coming-soon/coming-soon';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Ruta pública (sin layout)
  { path: 'login', component: LoginComponent },

  // Rutas protegidas (con layout sidebar + navbar)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard',       component: DashboardComponent },
      { path: 'articulos',       component: GestionArticulosComponent },
      { path: 'proveedor/nuevo', component: RegistrarProveedorComponent },
      { path: 'compras',         component: ComingSoonComponent },
      { path: 'clientes',        component: ComingSoonComponent },
      { path: 'ventas',          component: ComingSoonComponent },
      { path: 'reportes',        component: ComingSoonComponent },
      { path: '',                redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
