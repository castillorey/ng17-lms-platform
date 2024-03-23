import { Component, NgZone, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AtSign, LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LucideAngularModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);

  email = new FormControl('');
  linkSuccess = false;
  atSignIcom = AtSign
  constructor() {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.ngZone.run(() => this.router.navigate(['/']));
      }
    });
  }

  async signIn() {
    this.email.disable();
    const result = await this.authService.signInWithEmail(this.email.value!);
    this.email.enable();

    if (!result?.error) {
      this.linkSuccess = true
    } else {
      this.toast.error(result.error.message)
    }
  }
}
