import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root-main',
  standalone: true,
  imports: [],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.url.subscribe((event) => {
      console.log(event[0]); // It's an array remember [0]
    });
  }
}
