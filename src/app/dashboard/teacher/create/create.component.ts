import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  createForm = new FormGroup({
    title: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  constructor() {}

  onSubmit() {
    this.createForm.disable();
    this.http.post('/api/courses', this.createForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl(`/teacher/courses/${response}`);
        this.toast.success('Course created');
      },
      error: () => this.toast.error('Something went wrong'),
    });
    this.createForm.enable();
  }
}
