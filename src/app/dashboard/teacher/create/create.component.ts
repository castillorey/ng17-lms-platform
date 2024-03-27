import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { DataService } from '../../../core/services/data.service';
import { Course } from '../../../core/models/course.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly dataService = inject(DataService);

  createForm = new FormGroup({
    title: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  constructor() {}

  async onSubmit() {
    this.createForm.disable();
    const course = this.createForm.value as Course;
    this.dataService.startCourse(course)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        const {data: [{id}]} = response;        
        this.toast.success('Course created');
        this.router.navigate([`/teacher/courses/${id}`]);
      } else {
        throw new Error();
      }
    })
    .catch(() => this.toast.error('Something went wrong'))
    .finally(() => this.createForm.enable());
  }
}