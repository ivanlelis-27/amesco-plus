import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss'],
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
export class Notifications implements OnInit, OnDestroy {
  notifications: any[] = [];
  private notifSub?: Subscription;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  ngOnDestroy() {
    if (this.notifSub) {
      this.notifSub.unsubscribe();
    }
  }

  fetchNotifications() {
    this.notifSub = this.apiService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch notifications:', err);
      }
    });
  }

  onRefreshClick() {
    this.fetchNotifications();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}