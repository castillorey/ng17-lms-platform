import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Course } from '../../../core/models/course.interface';
import { LayoutDashboard, LucideAngularModule } from 'lucide-angular';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [LucideAngularModule, TitleFormComponent, NgIf],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  course : any | null = null;
  completionText = "";
  dashboardIcon = LayoutDashboard;
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if(courseId)
      this.dataService.getCourseInfo(courseId)
      .then(({data : course}: any) => {
        if(!course) {
          this.router.navigate(['/']);
          return;
        }
        this.course = {...course};
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
      });    
  }
}
