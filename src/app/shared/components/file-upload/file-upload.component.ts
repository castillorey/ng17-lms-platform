import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CloudUpload, LucideAngularModule } from 'lucide-angular';
import { v4 as uuid } from 'uuid';

import { DataService } from '../../../core/services/data.service';
import { AuthService } from '../../../core/services/auth.service';
import { DndDirective } from '../../directives/dnd.directive';
import { SpinComponent } from '../spin/spin.component';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/services/toast.service';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [LucideAngularModule, DndDirective, SpinComponent, NgIf],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  private readonly dataService = inject(DataService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  
  @Input() courseId = null;
  @Output() fileUpload = new EventEmitter<any>();

  userId = null;
  uploadIcon = CloudUpload;
  file: File | null = null;
  loading = false;
  uploading = false;


  onFileDropped(files: FileList) : void {
    this.loading = true;
    setTimeout(() => {
      this.file = files[0];
      this.loading = false;
    }, 1200);
  }

  onChooseFile(event: Event): void {
    this.loading = true;
    const input = event.target as HTMLInputElement;
    if (!input?.files || input.files.length == 0) {
      this.loading = false;
      return;
    }
    setTimeout(() => {
      if(input?.files)
        this.file = input?.files[0];
      this.loading = false;
    }, 1200);
  }

  uploadFile() {
    if(!this.file) return;

    this.uploading = true;
    const id: string = uuid();
    this.dataService
      .uploadFile(this.authService.immediateUser.id + '/' + id, this.file)
      .then((response: any) => {
        if (response.error) {
          console.log(response.error.message);
          this.toast.error('Something went wrong')
        } else {
          this.fileUpload.emit(environment.supabase.storagePath + response.data.path)
        }
        this.file = null;
        this.uploading = false;
      });
  }
}
