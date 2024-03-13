import { afterRender, Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';
import { IProfile } from '../models/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase!: SupabaseClient;
  _session: AuthSession | null = null

  constructor() {
    afterRender(() => {
      this.supabase = createClient(
        environment.supabase.url,
        environment.supabase.key
      )}
    );
  }

  public getSession(): Session | null {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  public getProfile(user: User): PromiseLike<any> {
    return this.supabase
      .from('profiles')
      .select('username, website, avatar_url')
      .eq('id', user?.id)
      .single();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): any {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  public signIn(email: string): Promise<any> {
    return this.supabase.auth.signInWithOtp({
      email,
    });
  }

  public signOut(): Promise<any> {
    return this.supabase.auth.signOut();
  }

  public updateProfile(profile: IProfile): any {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }
}
