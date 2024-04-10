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
  // CRUD Course
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

  async getCourseInfo(courseId: string) {
    return await this.supabaseService.client
      .from(COURSE_TABLE)
      .select('*')
      .match({ id: courseId })
      .single();
  }

  async updateCourse(course: Course) {
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

  // CRUD Files
  async getBucketFiles() {
    const { data, error } = await this.supabaseService.client.storage.getBucket('files');
    return { data, error };
  }

  async uploadFile(path: string, file: File) {
    const { data, error } = await this.supabaseService.client.storage
      .from('files')
      .upload(path, file);
    return { data, error };
  }

  async downloadFile(path: string) {
    const { data } = await this.supabaseService.client.storage.from('files').list(path);

    return { data };
  }
}
