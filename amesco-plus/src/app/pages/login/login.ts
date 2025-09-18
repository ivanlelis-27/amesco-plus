import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from '../../validations/login-validation';
import { AuthService, LoginRequest } from '../../services/auth.service';

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

  constructor(private router: Router, private validationService: ValidationService, private authService: AuthService) { }

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

    const loginData: LoginRequest = { email: this.email, password: this.password };
    this.authService.login(loginData).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('jwtToken', response.token); 
          this.goToDashboard();
        } else {
          alert('Login failed: No token received.');
        }
      },
      error: (err) => {
        alert('Login failed: ' + (err.error?.message || 'Invalid Email or Password'));
      }
    });
  }
}