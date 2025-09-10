import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-terms',
  standalone: false,
  templateUrl: './terms.html',
  styleUrls: ['./terms.scss'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('350ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('350ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class Terms {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/member-profile']);
  }

}
