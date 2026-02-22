import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // If token exists → redirect to dashboard
  if (token) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};