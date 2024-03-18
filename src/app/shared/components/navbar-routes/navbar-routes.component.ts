import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogOut, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar-routes',
  standalone: true,
  imports: [NgIf, LucideAngularModule],
  templateUrl: './navbar-routes.component.html',
  styleUrl: './navbar-routes.component.scss'
})
export class NavbarRoutesComponent {
  private readonly router = inject(Router);
  logOutIcon = LogOut;
  get isTeacherPage(): boolean {
    return this.router.url.startsWith("/teacher");
  }
  get isCoursePage(): boolean {
    return this.router.url.includes("/courses");
  }
  get isSearchPage(): boolean {
    return this.router.url == "/search";
  }
}
