import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-membercheck',
  standalone: false,
  templateUrl: './membercheck.html',
  styleUrl: './membercheck.scss'
})

export class Membercheck {
  constructor(private router: Router, private authService: AuthService) { }
  memberId: string = '';
  showValidation: boolean = false;

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onYesClick(event: Event) {
    if (!this.memberId || !this.memberId.trim()) {
      this.showValidation = true;
      return;
    }
    this.showValidation = false;

    this.authService.getExistingMemberById(this.memberId.trim()).subscribe({
      next: (member: any) => {
        // Use mobileNumber from response
        if (member && member.firstName && member.lastName && member.mobileNumber) {
          this.router.navigate(['/register'], {
            state: {
              memberId: this.memberId,
              firstName: member.firstName,
              lastName: member.lastName,
              mobile: member.mobileNumber,
            }
          });
        } else {
          this.showValidation = true;
        }
      },
      error: () => {
        this.showValidation = true;
      }
    });
  }
}
