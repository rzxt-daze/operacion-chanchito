import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso-codigo',
    pathMatch: 'full',
  },
  {
    path: 'ingreso-codigo',
    loadComponent: () => import('./pages/ingreso-codigo/ingreso-codigo.page').then( m => m.IngresoCodigoPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: 'crear-presupuesto',
    loadComponent: () => import('./pages/crear-presupuesto/crear-presupuesto.page').then( m => m.CrearPresupuestoPage)
  },
];