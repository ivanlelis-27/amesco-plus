import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../register/register';
import { Login } from '../login/login';

@Component({
  selector: 'app-membercheck',
  standalone: false,
  templateUrl: './membercheck.html',
  styleUrl: './membercheck.scss'
})

export class Membercheck {
  constructor(private router: Router) { }
  memberId: string = '';
  showValidation: boolean = false;

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onYesClick(event: Event) {
    const target = event.target as HTMLElement | null;
    const btn = (target && target.closest('button')) as HTMLButtonElement | null;

    if (!this.memberId || !this.memberId.trim()) {
      this.showValidation = true;
    } else {
      this.showValidation = false;
    }

    if (btn) {
      setTimeout(() => {
        try { btn.blur(); } catch (e) { /* ignore */ }
      }, 80);
    }
  }
}
