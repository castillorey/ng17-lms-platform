import { Component, Input, inject } from '@angular/core';
import { LucideAngularModule, Pencil } from 'lucide-angular';
import { Course } from '../../../../../core/models/course.interface';
import { DataService } from '../../../../../core/services/data.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { ComboboxComponent } from '../../../../../shared/components/combobox/combobox.component';
import { NgClass } from '@angular/common';
import { CourseDto } from '../../../../../core/models/course-dto.interface';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ComboboxComponent, LucideAngularModule, NgClass],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  private readonly dataService = inject(DataService);
  private readonly toast = inject(ToastService);

  @Input() courseId: string | undefined;

  private _initialData!: Course;
  @Input() 
  set initialData(value: Course) {
    this._initialData = value;
    if (this._initialData) {
      this.categoryForm = {...this._initialData};
    }
  }
  
  get initialData(): Course | undefined {
    return this._initialData;
  }

  private _categories!: Array<{id: number, label: string}>;
  @Input() 
  set categories(value: Array<{id: number, label: string}>){
    this._categories = value
    if(this._categories){
      const selected = this.categories.find(category => +category.id == this.categoryForm?.categoryId);
      this.defaultOption = this.defaultOption || selected;
      this.selectedOption = this.selectedOption || this.defaultOption 
    }
  }
  get categories(): Array<{id: number, label: string}> {
    return this._categories;
  }

  selectedOption! : { id: number; label: string; };
  defaultOption! : { id: number; label: string; };
  pencilIcon = Pencil;
  isEditing = false;
  categoryForm!: {
    id: string;
    categoryId: number;
  };

  ngOnInit(): void {
    console.log(this.categories);
    console.log(this.selectedOption);
  }
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOptionSelected(option: { id: number; label: string; }): void {
    this.selectedOption = option;
    this.categoryForm = {...this.categoryForm, categoryId: option.id}
  }
  
  onSubmit(): void {
    const {id, categoryId: category_id} = this.categoryForm as Course;
    const course : CourseDto = {id, category_id};
    
    this.dataService.updateCourse(course)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.toggleEdit();
        this.toast.success('Course updated');
        this.initialData = this.categoryForm as Course;
      } else {
        throw new Error();
      }
    })
    .catch(() =>  this.toast.error('Something went wrong'));
  }
}
