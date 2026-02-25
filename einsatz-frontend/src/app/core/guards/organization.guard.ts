import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const organizationGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.loadUser().pipe(
    map(user => {

      auth.setUser(user);

      const hasOrg = !!user.organization;
      const currentPath = route.routeConfig?.path;

      if (!hasOrg && currentPath === 'organization/create') {
        return true;
      }

      if (hasOrg && currentPath === 'organization/details') {
        return true;
      }

      return router.createUrlTree([
        hasOrg ? '/organization/details' : '/organization/create'
      ]);
    }),

    // CRITICAL: Handle 403 or errors
    catchError(() => {
      return of(router.createUrlTree(['/auth/login']));
    })
  );
};