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
  userId: number | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const user = this.apiService.getUserFromToken();
    this.userId = user?.sub || null;
    this.fetchNotifications();
    console.log('userID:', this.userId); // Debug log

  }

  ngOnDestroy() {
    if (this.notifSub) {
      this.notifSub.unsubscribe();
    }
  }

  fetchNotifications() {
    if (!this.userId) return;
    this.notifSub = this.apiService.getNotifications(this.userId).subscribe({
      next: (data) => {
        this.notifications = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch notifications:', err);
      }
    });
  }

  get visibleNotificationsCount(): number {
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDate = now.getDate();

    return this.notifications.filter(n => {
      const notifDate = new Date(n.scheduledAt);
      const notifYear = notifDate.getFullYear();
      const notifMonth = notifDate.getMonth();
      const notifDay = notifDate.getDate();

      return (
        notifYear < todayYear ||
        (notifYear === todayYear && notifMonth < todayMonth) ||
        (notifYear === todayYear && notifMonth === todayMonth && notifDay <= todayDate)
      );
    }).length;
  }

  onRefreshClick() {
    this.fetchNotifications();
  }

  onLikeClick(notificationId: number) {
    if (!this.userId) return;
    const notif = this.notifications.find(n => n.notificationId === notificationId);
    if (!notif) return;

    if (notif.liked) {
      // Instantly update UI to outline heart
      notif.liked = false;
      this.apiService.unlikeNotification(notificationId, this.userId).subscribe({
        next: () => {
          // Optionally handle success
        },
        error: (err) => {
          notif.liked = true; // revert if error
          console.error('Failed to unlike notification:', err);
        }
      });
    } else {
      // Instantly update UI to filled heart
      notif.liked = true;
      this.apiService.likeNotification(notificationId, this.userId).subscribe({
        next: () => {
          // Optionally handle success
        },
        error: (err) => {
          notif.liked = false; // revert if error
          console.error('Failed to like notification:', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}