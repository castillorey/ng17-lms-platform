import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Image, LucideAngularModule, Pencil, PlusCircle } from 'lucide-angular';

import { Course } from '../../../../../core/models/course.interface';
import { DataService } from '../../../../../core/services/data.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { NgClass } from '@angular/common';
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component';
import { CourseDto } from '../../../../../core/models/course-dto.interface';

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
  
  @Input() courseId: string | undefined;
  private _initialData!: Course | undefined;
  @Input() 
  set initialData(course: Course | undefined) {
    this._initialData = course;
    
    if (this._initialData) {
      this.imageForm.patchValue({...this._initialData});
    }
  }
  
  get initialData(): Course | undefined {
    return this._initialData;
  }
  
  plusIcon = PlusCircle;
  pencilIcon = Pencil;
  imageIcon = Image;
  isEditing = false;
  imageForm = new FormGroup({
    id: new FormControl(),
    imageUrl: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onImageUpload(fileUrl: string) {
    this.imageForm.patchValue({...this.imageForm.value, imageUrl: fileUrl});
    this.onSubmit();
  }
  
  onSubmit()
  {
    this.imageForm.disable();
    const {id, imageUrl: image_url} = this.imageForm.value as Course;
    const course : CourseDto = {id, image_url};
    this.dataService.updateCourse(course)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.toggleEdit();
        this.toast.success('Course updated');
        this.initialData = this.imageForm.value as Course;
      } else {
        throw new Error();
      }
    })
    .catch(() =>  this.toast.error('Something went wrong'))
    .finally(() => this.imageForm.enable());
  }
}
