import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private readonly supabase = inject(SupabaseService);
  private readonly formBuilder = inject(FormBuilder);

  signInForm = this.formBuilder.group({
    email: '',
  })

  async onSubmit(): Promise<void> {
    try {
      const email = this.signInForm.value.email as string
      const { error } = await this.supabase.signIn(email)
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
    }
  }
}
