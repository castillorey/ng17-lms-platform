import { NgZone, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const ngZone = inject(NgZone);

  return authService.currentUser.pipe(
    filter((val) => val !== null), // Filter out initial Behaviour subject value
    take(1), // Otherwise the Observable doesn't complete!
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true
      } else {
        ngZone.run(() => router.navigate(['/auth']));
        return false;
      }
    })
  );
  
};
