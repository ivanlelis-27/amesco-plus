import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-used-vouchers',
  standalone: false,
  templateUrl: './used-vouchers.html',
  styleUrl: './used-vouchers.scss'
})
export class UsedVouchers implements OnInit {
  vouchers: any[] = [];
  userId: number | null = null;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userId = Number(user?.sub);
    if (this.userId) {
      this.authService.getUserVouchers(this.userId).subscribe({
        next: (vouchers: any[]) => {
          // Only show vouchers where isUsed is true
          this.vouchers = vouchers.filter(v => v.isUsed === true);
          console.log('Used vouchers to display:', this.vouchers);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch vouchers:', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/unused-vouchers']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
