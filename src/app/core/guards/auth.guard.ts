import { NgZone, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const ngZone = inject(NgZone);

  return authService.currentUser.pipe(isAuthenticated => {
    if(!isAuthenticated)
      ngZone.run(() => router.navigate(['/auth']));
    return isAuthenticated;
  });
  
};
