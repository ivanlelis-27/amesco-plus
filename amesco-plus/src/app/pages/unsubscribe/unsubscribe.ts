import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
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
  constructor(private router: Router, private location: Location, private apiService: ApiService) { }

  onCancel() {
    this.location.back();
  }

  onUnsubscribe() {
    this.apiService.unsubscribe().subscribe({
      next: (res) => {
        console.log('Unsubscribed successfully:', res);
        if (res && res.message === 'Account deleted successfully.') {
          this.router.navigate(['/unsubscribe-success']);
        } else {
          alert('Unexpected response. Please try again.');
        }
      },
      error: (err) => {
        console.error('Error unsubscribing:', err);
        alert('Failed to unsubscribe. Please try again.');
      }
    });
  }
}
