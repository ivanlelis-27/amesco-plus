import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { RegisterValidation } from '../../validations/register-validation';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private router: Router, private authService: AuthService) { }

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  mobile: string = '';
  emailPlaceholder: string = 'Enter Text';
  errorMessage: string = '';

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegisterClick() {
    if (!this.email || !this.email.trim()) {
      this.errorMessage = 'Please enter a valid email.';
      return;
    }

    if (!RegisterValidation.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    if (!RegisterValidation.passwordsMatch(this.password, this.confirmPassword)) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const registerData: RegisterRequest = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName,
      mobile: this.mobile
    };

    this.authService.register(registerData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        this.errorMessage = err.error?.message || err.error || 'Registration failed. Please try again.';
      }
    });
  }
}
