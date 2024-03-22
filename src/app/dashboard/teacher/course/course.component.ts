import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  private readonly route = inject(ActivatedRoute);

  courseId: string | null = null;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(this.courseId);
    
  }
}
