import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, effect, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('close => open', [
        animate('300ms ease-in-out')
      ]),
      transition('open => close', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent {
 public readonly toast = inject(ToastService);
 
}
