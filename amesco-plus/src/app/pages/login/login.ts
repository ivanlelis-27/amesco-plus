import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../register/register';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { ValidationService } from '../../validations/login-validation';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private validationService: ValidationService) { }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onLoginClick() {
    const validationError = this.validationService.validateLogin(this.email, this.password);
    if (validationError) {
      alert(validationError);
      return;
    }   
}
}