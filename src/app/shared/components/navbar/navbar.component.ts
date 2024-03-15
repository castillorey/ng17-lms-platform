import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, Menu } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuIcon = Menu;
  @Output() menuToggle = new EventEmitter<any>();

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
