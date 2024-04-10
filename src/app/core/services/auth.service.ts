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
  _session: AuthSession | null = null;

  constructor() {
    this.supabaseService.client.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN' || session?.user) {
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

  logout() : Promise<any>{
    return this.supabaseService.client?.auth.signOut();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabaseService.client?.auth.onAuthStateChange(callback)
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  get immediateUser(): User {
    return this._currentUser.getValue();
  }
}
