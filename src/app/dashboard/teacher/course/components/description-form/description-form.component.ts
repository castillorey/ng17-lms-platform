import { Component, Input, inject } from '@angular/core';
import { Course } from '../../../../../core/models/course.interface';
import { LucideAngularModule, Pencil } from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../../../core/services/data.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-description-form',
  standalone: true,
  imports: [LucideAngularModule,ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './description-form.component.html',
  styleUrl: './description-form.component.scss'
})
export class DescriptionFormComponent {
  private readonly dataService = inject(DataService);
  private readonly toast = inject(ToastService);
  
  @Input() courseId = null;
  private _initialData!: Course | null;
  @Input() 
  set initialData(course: Course | null) {
    this._initialData = course;
    
    if (this._initialData) {
      this.descriptionForm.patchValue({...this._initialData});
    }
  }
  
  get initialData(): Course | null {
    return this._initialData;
  }
  
  pencilIcon = Pencil;
  isEditing = false;
  descriptionForm = new FormGroup({
    id: new FormControl(),
    description: new FormControl('', Validators.required)
  });
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  onSubmit()
  {
    this.descriptionForm.disable();
    const course = this.descriptionForm.value as Course;    
    this.dataService.updateCourse(course)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.toggleEdit();
        this.toast.success('Course updated');
        this.initialData = course;
      } else {
        throw new Error();
      }
    })
    .catch(() =>  this.toast.error('Something went wrong'))
    .finally(() => this.descriptionForm.enable());
  }
}
