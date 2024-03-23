import { Component, inject } from '@angular/core';
import { BarChart, Compass, Layout, List } from 'lucide-angular';
import { LogoComponent } from '../logo/logo.component';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { Router } from '@angular/router';

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/'
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search'
  }
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogoComponent, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  private readonly router = inject(Router);
  
  get routes() : any {
    return this.isTeacher ? teacherRoutes : guestRoutes;
  }
  get isTeacher(): boolean {
    return this.router.url.includes("/teacher");
  }
}
