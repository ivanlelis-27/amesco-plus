import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login/login';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
