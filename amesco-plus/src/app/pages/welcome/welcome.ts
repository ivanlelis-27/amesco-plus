import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { Membercheck } from '../membercheck/membercheck';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {
constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToMembercheck() {
    this.router.navigate(['/membercheck']);
  }

}
