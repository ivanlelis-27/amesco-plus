import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-faqs',
  standalone: false,
  templateUrl: './faqs.html',
  styleUrl: './faqs.scss',
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
export class Faqs {
  constructor(private router: Router, private location: Location) { }

  goBack() {
    this.location.back();
  }

}
