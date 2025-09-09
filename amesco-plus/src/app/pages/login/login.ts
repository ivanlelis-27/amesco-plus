import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Membercheck } from '../membercheck/membercheck';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { ValidationService } from '../../validations/login-validation';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private router: Router, private validationService: ValidationService) { }

  goToMemberCheck() {
    this.router.navigate(['/membercheck']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onLoginClick() {
    const validationError = this.validationService.validateLogin(this.email, this.password);
    if (validationError) {
      alert(validationError);
      return;
    }
    this.goToDashboard();
  }
}