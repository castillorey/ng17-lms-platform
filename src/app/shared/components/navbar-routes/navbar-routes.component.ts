import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DoorOpen, LogOut, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-routes',
  standalone: true,
  imports: [NgIf, LucideAngularModule, RouterLink, AsyncPipe],
  templateUrl: './navbar-routes.component.html',
  styleUrl: './navbar-routes.component.scss'
})
export class NavbarRoutesComponent {
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  logOutIcon = LogOut;
  doorOpenIcon = DoorOpen;

  get isTeacherPage(): boolean {
    return this.router.url.startsWith("/teacher");
  }
  get isCoursePage(): boolean {
    return this.router.url.includes("/courses");
  }
  get isSearchPage(): boolean {
    return this.router.url == "/search";
  }

  logOut(): void {
    this.authService.logout()
    .finally(() => this.router.navigate(['/auth']));
  }
}
