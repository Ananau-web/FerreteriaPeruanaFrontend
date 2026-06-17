import { Routes } from '@angular/router';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor';
import { GestionArticulosComponent } from './components/gestion-articulos/gestion-articulos';

export const routes: Routes = [
  { path: 'articulos',      component: GestionArticulosComponent },
  { path: 'proveedor/nuevo', component: RegistrarProveedorComponent },
  { path: '', redirectTo: '/articulos', pathMatch: 'full' }
];
