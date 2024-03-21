import { Injectable, inject } from '@angular/core';
import { AuthChangeEvent, AuthSession, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);
  private _currentUser: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject(null);
  _session: AuthSession | null = null

  constructor() {
    this.supabaseService.client.auth.getSession()
    .then(({data: {session: user}}) => {
      console.log(user);
      if (user) {
        this._currentUser.next(user);
      } else {
        this._currentUser.next(false);
      }
    })
    .catch(error => console.log(error));

    this.supabaseService.client.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session!.user);
      } else {
        this._currentUser.next(false);
      }
    });
  }

  async signInWithEmail(email: string) {
    return await this.supabaseService.client?.auth.signInWithOtp({
      email,
    });
  }

  logout() {
    this.supabaseService.client?.auth.signOut();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabaseService.client?.auth.onAuthStateChange(callback)
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }
}
