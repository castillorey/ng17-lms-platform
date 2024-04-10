import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Image, LucideAngularModule, Pencil, PlusCircle } from 'lucide-angular';

import { Course } from '../../../../../core/models/course.interface';
import { DataService } from '../../../../../core/services/data.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { NgClass } from '@angular/common';
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, NgClass, FileUploadComponent],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss'
})
export class ImageFormComponent {
  private readonly dataService = inject(DataService);
  private readonly toast = inject(ToastService);
  
  @Input() courseId = null;
  private _initialData!: Course | null;
  @Input() 
  set initialData(course: Course | null) {
    this._initialData = course;
    
    if (this._initialData) {
      this.imageForm.patchValue({...this._initialData});
    }
  }
  
  get initialData(): Course | null {
    return this._initialData;
  }
  
  plusIcon = PlusCircle;
  pencilIcon = Pencil;
  imageIcon = Image;
  isEditing = false;
  imageForm = new FormGroup({
    id: new FormControl(),
    image_url: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onImageUpload(fileUrl: string) {
    this.imageForm.patchValue({...this.imageForm.value, image_url: fileUrl});
    this.onSubmit();
  }
  
  onSubmit()
  {
    this.imageForm.disable();
    const course = this.imageForm.value as Course;
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
    .finally(() => this.imageForm.enable());
  }
}
