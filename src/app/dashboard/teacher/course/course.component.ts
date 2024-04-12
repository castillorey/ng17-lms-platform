import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Course } from '../../../core/models/course.interface';
import { LayoutDashboard, LucideAngularModule } from 'lucide-angular';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { NgIf } from '@angular/common';
import { DescriptionFormComponent } from './components/description-form/description-form.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { Category } from '../../../core/models/category.interface';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgIf,
    TitleFormComponent,
    DescriptionFormComponent,
    ImageFormComponent,
    CategoryFormComponent,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  course!: Course;
  categories!: Array<{ id: number; label: string }>;
  completionText = '';
  dashboardIcon = LayoutDashboard;
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.dataService
        .getCourseInfo(courseId)
        .then(({ data: course }: any) => {
          if (!course) {
            this.router.navigate(['/']);
            return;
          }
          this.course = {
            ...course,
            imageUrl: course.image_url,
            categoryId: course.category_id,
          };
          const requiredFields = [
            course.title,
            course.description,
            course.imageUrl,
            course.price,
            course.categoryId,
          ];
          const totalFields = requiredFields.length;
          const completedFields = requiredFields.filter(Boolean).length;
          this.completionText = `(${completedFields}/${totalFields})`;
          const isComplete = requiredFields.every(Boolean);
        })
        .finally(() => {
          this.dataService.getAllCategories().then((data: any) => {
            if (data) {
              const _categories = data as Array<Category>;
              this.categories = _categories.map((category) => ({
                id: +category.id,
                label: category.name,
              }));
            }
          });
        });
    }
  }
}
