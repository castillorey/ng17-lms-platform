import { Component, inject } from '@angular/core';
import { Compass, Layout } from 'lucide-angular';
import { LogoComponent } from '../logo/logo.component';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { ActivatedRoute } from '@angular/router';

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
]

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogoComponent, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  routes = guestRoutes;
}
