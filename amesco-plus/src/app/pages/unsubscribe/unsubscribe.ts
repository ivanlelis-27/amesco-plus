import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-unsubscribe',
  standalone: false,
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.scss',
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class Unsubscribe {
  constructor(private router: Router) { }

  onCancel() {
    this.router.navigate(['/member-profile']);
  }
}
