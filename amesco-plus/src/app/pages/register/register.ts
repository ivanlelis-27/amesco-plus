import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login/login';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private router: Router) { }
  email: string = '';
  emailPlaceholder: string = 'Enter Text';

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegisterClick() {
    if (!this.email || !this.email.trim()) {
      this.emailPlaceholder = 'Wrong Email Format, try again...';
    } else {
      this.emailPlaceholder = 'Enter Text';
    }
  }
}
