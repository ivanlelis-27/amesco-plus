import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, RegisterRequest } from '../../services/api.service';
import { RegisterValidation } from '../../validations/register-validation';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state && state.memberId) {
      this.memberId = state.memberId; // full value for backend
      this.displayMemberId = (state.memberId.split('-')[0] || '').substring(0, 10); // for UI
      this.firstName = state.firstName || '';
      this.lastName = state.lastName || '';
      this.mobile = state.mobile || '';
    } else {
      this.apiService.getGeneratedMemberId().subscribe({
        next: (res) => {
          this.memberId = res.memberId; // full value for backend
          this.displayMemberId = (res.memberId.split('-')[0] || '').substring(0, 10); // for UI
          this.cdr.detectChanges();
        },
        error: () => {
          this.memberId = '';
          this.displayMemberId = '';
          this.cdr.detectChanges();
        }
      });
    }
  }


  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  mobile: string = '';
  emailPlaceholder: string = 'Enter Text';
  errorMessage: string = '';
  memberId: string = '';
  displayMemberId: string = '';

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
      memberId: this.memberId,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName,
      mobile: this.mobile
    };

    this.apiService.register(registerData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        this.errorMessage = err.error?.message || err.error || 'Registration failed. Please try again.';
      }
    });
  }
}
