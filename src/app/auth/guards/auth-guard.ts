import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Check the current user state directly without waiting for an observable
  const isLoggedIn = !!auth.getCurrentUser();

  if (isLoggedIn) {
    return true; // Allow access
  } else {
    // If not logged in, redirect to the login page
    console.log('Access denied - user not logged in. Redirecting to /login.');
    router.navigate(['/login']);
    return false; // Block access
  }
};
