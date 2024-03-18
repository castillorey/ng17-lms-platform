import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { NavbarRoutesComponent } from '../navbar-routes/navbar-routes.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, NavbarRoutesComponent],
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
