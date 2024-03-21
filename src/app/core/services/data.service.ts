import { Injectable, inject } from '@angular/core';
import { Course } from '../models/course.interface';
import { SupabaseService } from './supabase.service';

export const COURSE_TABLE = 'course';
export const USER_COURSE_TABLE = 'user_course';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly supabaseService = inject(SupabaseService);

  async startCourse(course: Course) {
    return this.supabaseService.client
      .from(COURSE_TABLE)
      .insert(course)
      .select('id');
  }

  async getCourses() {
    const courses = await this.supabaseService.client
      .from(USER_COURSE_TABLE)
      .select('course:course_id(*)');
    return courses.data || [];
  }

  // CRUD Course
  async getCourseInfo(courseId: string) {
    return await this.supabaseService.client
      .from(COURSE_TABLE)
      .select('*')
      .match({ id: courseId })
      .single();
  }

  async updateCourse(course: any) {
    return await this.supabaseService.client
      .from(COURSE_TABLE)
      .update(course)
      .match({ id: course.id });
  }

  async deleteCourse(course: any) {
    return await this.supabaseService.client
      .from(COURSE_TABLE)
      .delete()
      .match({ id: course.id });
  }
}
