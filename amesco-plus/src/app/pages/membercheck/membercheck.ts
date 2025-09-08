import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../register/register';

@Component({
  selector: 'app-membercheck',
  standalone: false,
  templateUrl: './membercheck.html',
  styleUrl: './membercheck.scss'
})

export class Membercheck {
  constructor(private router: Router) {}
  memberId: string = '';
  showValidation: boolean = false;

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onYesClick(event: Event) {
    // get the nearest button element (works if user tapped text inside)
    const target = event.target as HTMLElement | null;
    const btn = (target && target.closest('button')) as HTMLButtonElement | null;

    if (!this.memberId || !this.memberId.trim()) {
      this.showValidation = true;
    } else {
      this.showValidation = false;
    }

    // allow the native :active press style to show briefly, then remove focus
    // 60-120ms is enough to make the flash visible but still feel instant
    if (btn) {
      setTimeout(() => {
        try { btn.blur(); } catch (e) { /* ignore */ }
      }, 80);
    }
  }
}
