import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome implements OnInit {
  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    try {
      if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
        const flag = window.sessionStorage.getItem('session_invalidated');
        if (flag) {
          try { this.toastService.show('You were signed out: a new session was started on another device.'); } catch { }
          window.sessionStorage.removeItem('session_invalidated');
        }
      }
    } catch (e) {
    }
  }

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
