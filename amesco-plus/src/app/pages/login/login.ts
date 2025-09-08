import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../register/register';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login { 
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}