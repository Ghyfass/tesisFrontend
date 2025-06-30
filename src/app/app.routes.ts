import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./welcome/welcome.component').then(m => m.WelcomeComponent),
  },
  {
    path: 'configuracion/alcances',
    loadComponent: () =>
      import('./modules/configuracion/alcances/alcances.component').then(m => m.AlcancesComponent),
  },
  {
    path: 'configuracion/causas',
    loadComponent: () =>
      import('./modules/configuracion/causas/causas.component').then(m => m.CausasComponent),
  },
  {
    path: 'configuracion/tipos-de-sitios',
    loadComponent: () =>
      import('./modules/configuracion/tipos-de-sitios/tipos-de-sitios.component').then(m => m.TiposDeSitioComponent),
  },
  {
    path: 'configuracion/reglas-por-dominio',
    loadComponent: () =>
      import('./modules/configuracion/reglas-por-dominio/reglas-por-dominio.component').then(m => m.ReglasPorDominioComponent),
  },
  {
    path: 'configuracion/instituciones',
    loadComponent: () =>
      import('./modules/configuracion/instituciones/instituciones.component').then(m => m.InstitucionesComponent),
  },
  {
    path: 'configuracion/organismos',
    loadComponent: () =>
      import('./modules/configuracion/organismos/organismos.component').then(m => m.OrganismosComponent),
  },
  {
    path: 'configuracion/provincias',
    loadComponent: () =>
      import('./modules/configuracion/provincias/provincias.component').then(m => m.ProvinciasComponent),
  },
  {
    path: 'configuracion/tematicas',
    loadComponent: () =>
      import('./modules/configuracion/tematicas/tematicas.component').then(m => m.TematicasComponent),
  },

  // Ruta comodín para rutas no definidas
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

