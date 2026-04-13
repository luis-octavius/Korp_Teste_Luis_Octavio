import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./features/produtos/produtos.routes').then((m) => m.PRODUTOS_ROUTES),
  },
  {
    path: 'notas',
    loadChildren: () => import('./features/notas/notas.routes').then((m) => m.NOTAS_ROUTES),
  },
];
