import { Component, afterRender, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AtSign, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, LucideAngularModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = new FormControl('');
  linkSuccess = false;
  atSignIcom = AtSign
  constructor() {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.router.navigate(['/'])
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
      alert(result.error.message)
    }
  }
}
