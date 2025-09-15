import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss'],
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ChangePassword {
  newPassword: string = '';
  confirmPassword: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }


  goBack() {
    this.router.navigate(['/dashboard']);
  }

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      alert("You are not authenticated.");
      return;
    }

    this.http.post('https://localhost:5006/api/users/change-password', {
      newPassword: this.newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert("Password updated successfully!");
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update password.");
      }
    });
  }
}
