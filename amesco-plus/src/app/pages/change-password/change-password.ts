import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class ChangePassword {
  constructor(private router: Router) { }
  newPassword: string = '';
  confirmPassword: string = '';

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
