import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Wrench } from 'lucide-angular';
@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, NgClass],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  private readonly router = inject(Router);
  
  @Input() icon = Wrench;
  @Input() label = '';
  @Input() href = '';

  routerOptions = { exact: true };

  get isActive(): boolean {
    return this.router.url == this.href
  }
}
