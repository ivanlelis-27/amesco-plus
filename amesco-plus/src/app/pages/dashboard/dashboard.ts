import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  carouselItems = ['Slide 1', 'Slide 2', 'Slide 3'];
  currentSlide = 0;
  constructor(private router: Router) { }

  goToGenerateQr() {
    this.router.navigate(['/generate-qr']);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.carouselItems.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.carouselItems.length - 1) ? 0 : this.currentSlide + 1;
  }
}
