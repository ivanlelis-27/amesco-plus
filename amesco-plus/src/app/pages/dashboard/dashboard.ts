import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class Dashboard {
  carouselItems = ['Slide 1', 'Slide 2', 'Slide 3'];
  currentSlide = 0;
  showMenu = false;
  closingMenu = false;

  points: number = 0;
  memberId: string = '';
  memberName: string = '';

  constructor(private router: Router, private authService: AuthService) {
    const token = this.authService.getToken();
    if (token) {
      const user: any = jwtDecode(token);
      // Use correct property names from your JWT payload
      this.memberId = user.memberId || '';
      this.memberName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      this.points = user.points || 0; // Only if you add 'points' to the payload
      // For debugging, you can log the user object:
      // console.log(user);
    }
  }

  openMenuModal() {
    this.showMenu = true;
  }

  startCloseMenu() {
    this.closingMenu = true;
  }

  animationDone(event: any) {
    if (event.toState === 'void') {
      this.showMenu = false;
      this.closingMenu = false;
    }
  }

  goToGenerateQr() {
    this.router.navigate(['/generate-qr']);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  goToMemberProfile() {
    this.router.navigate(['/member-profile']);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.carouselItems.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.carouselItems.length - 1) ? 0 : this.currentSlide + 1;
  }
}
