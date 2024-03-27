import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Pencil } from 'lucide-angular';

import { DataService } from '../../../../../core/services/data.service';
import { Course } from '../../../../../core/models/course.interface';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-title-form',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './title-form.component.html',
  styleUrl: './title-form.component.scss'
})
export class TitleFormComponent {
private readonly dataService = inject(DataService);
private readonly toast = inject(ToastService);

@Input() courseId = null;
private _initialData!: Course | null;
@Input() 
set initialData(course: Course | null) {
  this._initialData = course;
  
  if (this._initialData) {
    this.titleForm.patchValue({...this._initialData});
  }
}

get initialData(): Course | null {
  return this._initialData;
}

pencilIcon = Pencil;
isEditing = false;
titleForm = new FormGroup({
  id: new FormControl(),
  title: new FormControl('', Validators.required)
});

toggleEdit() {
  this.isEditing = !this.isEditing;
}

onSubmit()
{
  this.titleForm.disable();
  const course = this.titleForm.value as Course;
  console.log(course);
  
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
  .finally(() => this.titleForm.enable());
}

}
