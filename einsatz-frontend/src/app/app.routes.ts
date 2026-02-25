import { Routes } from '@angular/router';
import { Sidenav } from './shared/layout/sidenav/sidenav';
import { authGuard } from './core/guards/auth.guard';
import { organizationGuard } from './core/guards/organization.guard';

export const routes: Routes = [

  //Auth Feature (Public)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  }
  ,
  //Protected layout
  {
    path: '',
    component: Sidenav,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.Dashboard)
      },

     
      // Create page
      {
        path: 'organization/create',
        canActivate: [organizationGuard],
        loadComponent: () =>
          import('./features/organization/pages/create-organization/create-organization')
            .then(m => m.CreateOrganization)
      },
    /*  {
        path: 'organization/details',
        canActivate: [organizationGuard],
        loadComponent: () =>
          import('./features/organization/pages/organization-details/organization-details')
            .then(m => m.OrganizationDetailsComponent)
      },*/


      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      //FALLBACK
      {
        path: '**',
        redirectTo: 'auth/login'
      }
    ]
  }




];
