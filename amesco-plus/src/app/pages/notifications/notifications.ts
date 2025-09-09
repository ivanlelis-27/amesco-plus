import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
