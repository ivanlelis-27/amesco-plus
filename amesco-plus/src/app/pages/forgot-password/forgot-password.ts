import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordValidationService } from '../../validations/forgot-password-validation';
import { ApiService, ForgotPasswordRequest } from '../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  email: string = '';
  errorMsg: string | null = null;
  loading: boolean = false;

  constructor(private router: Router, private forgotPasswordValidationService: ForgotPasswordValidationService, private apiService: ApiService) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToEmailSent() {
    this.router.navigate(['/email-sent'], { queryParams: { email: this.email } });
  }

  onSubmit() {
    this.errorMsg = this.forgotPasswordValidationService.validateEmail(this.email);
    if (!this.errorMsg) {
      this.loading = true;
      const request: ForgotPasswordRequest = { email: this.email };
      this.apiService.forgotPassword(request).subscribe({
        next: () => {
          this.loading = false;
          this.goToEmailSent();
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err.error?.message || 'Failed to send reset email.';
        }
      });
    }
  }

}
