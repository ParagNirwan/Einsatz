import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  const userRole = localStorage.getItem('role');
  const allowedRoles = route.data['roles'] as string[];

  if (!userRole) {
    return router.createUrlTree(['/login']);
  }

  if (allowedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};