import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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

  constructor(private router: Router) { }

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
