import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('jwtToken');
  const user = localStorage.getItem('authUser');
  if (token && user) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expiry = tokenPayload.exp * 1000;

      if (Date.now() >= expiry) {
          // Token expired, clear storage and redirect to login
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('authUser');
          router.navigateByUrl('/login', { replaceUrl: true });  // Use replaceUrl to clear history
          return false;
      }
      return true; // Token is valid
  }

  // No token or user, redirect to login
  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};