import { NgZone, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const ngZone = inject(NgZone);

  return authService.currentUser.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
          return true;
      } else {
        ngZone.run(()=> router.navigate(['/auth']));
        return false;
      }
  }),
  catchError(() => {
      ngZone.run(()=> router.navigate(['/auth']));
      return of(false);
  }));
};
