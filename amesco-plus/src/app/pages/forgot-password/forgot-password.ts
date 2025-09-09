import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordValidationService } from '../../validations/forgot-password-validation';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  email: string = '';
  errorMsg: string | null = null;

  constructor(private router: Router, private forgotPasswordValidationService: ForgotPasswordValidationService) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.errorMsg = this.forgotPasswordValidationService.validateEmail(this.email);
    if (!this.errorMsg) {
    }
  }

}
